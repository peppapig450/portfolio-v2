#!/usr/bin/env bash
# ===============================================================================
# update_readme_badges - README badge updater
# 
# DESCRIPTION:
#   Parses dependencies from pnpm-lock.yaml and uses them to update Shields.io
#   version badges in README.md. Extracts version information from both regular
#   dependencies and devDependencies, then updates corresponding badges for
#   configured packages (Next.js, TypeScript, MUI, Framer Motion). Preserves
#   existing badge color codes and validates URLs. Optionally writes a summary
#   of all badge updates to a specified file.
#
# USAGE:
#   update_readme_badges [OPTIONS]
#   
#   OPTIONS:
#     -l, --lockfile  FILE    Path to pnpm-lock.yaml (default: pnpm-lock.yaml)
#     -r, --readme    FILE    Path to README.md (default: README.md)
#     -s, --summary   FILE    Path to write summary of updates (optional)
#     -h, --help             Show help and exit
#
# EXAMPLES:
#   update_readme_badges
#   update_readme_badges -l ./frontend/pnpm-lock.yaml -r ./docs/README.md
#   update_readme_badges --summary /tmp/badge-updates.txt
#
# REQUIREMENTS:
#   - Bash 4.3+ (for associative arrays and namerefs)
#   - yq (https://github.com/mikefarah/yq) - YAML processor
#   - Perl - for regex-based badge URL replacement
#   - GNU grep with PCRE support (-P flag)
#   - logging.lib.sh (vendored from https://github.com/peppapig450/bashing-logs)
#
# NOTES:
#   - Badge mappings are hardcoded in the script for specific packages
#   - Validates that lockfile is readable and README is writable before processing
#   - Creates summary file directory if it doesn't exist
#   - Preserves existing badge color codes during updates
# ===============================================================================
set -Eeuo pipefail

# Enable shift_verbose for better debugging in case something goes wrong parsing 
# cli args.
shopt -s shift_verbose

# Resolve canonical path to this script
readonly SCRIPT_DIR="$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"

# Path to the logging library
readonly LOGGING_PATH="${SCRIPT_DIR}/../lib/logging/logging.lib.sh"

# Make sure the logging lib exists and is readable before sourcing
if [[ -r ${LOGGING_PATH} ]]; then
  # shellcheck source=../lib/logging/logging.lib.sh
  source "${LOGGING_PATH}"
  logging::init "$0"
else
  printf "Something went wrong sourcing the logging lib: %s\n" "${LOGGING_PATH}" >&2
  exit 1
fi

# check_dependencies
#   Ensure required commands are available before proceeding.
check_dependencies() {
  local -a miss=()

  for cmd in yq perl grep; do
    if ! command -v "${cmd}" &> /dev/null; then
      miss+=("${cmd}")
    fi
  done

  # Ensure system's grep supports PCRE regex
  if ! grep -P '\d+' <<< "test123" &> /dev/null; then
    logging::log_fatal "System's grep does not support PCRE regex. Make sure GNU grep is installed."
  fi

  if ((${#miss[@]} > 0)); then
    logging::log_fatal "Missing required tools: ${miss[@]}. Please install them and retry."
  fi
}

# usage
#   Prints help/usage information and exits
usage() {
  cat <<- _DONT_READ_THIS_
Usage: $(basename "${BASH_SOURCE[0]}") [OPTIONS]
    -l, --lockfile  FILE    Path to pnpm-lock.yaml
    -r, --readme    FILE    Path to README.md
    -s, --summary   FILE    Path to write summary of updates 
    -h, --help             Show help
_DONT_READ_THIS_
  exit 0
}

# parse_args <lockfile_var> <readme_var> <summary_file_var>
#   Processes command-line options into local name-referenced variables.
#
# Arguments:
#   $1: lockfile_var      - Name of the variable for pnpm-lock.yaml path.
#   $2: readme_var        - Name of the variable for README.md path.
#   $3: summary_file_var  - Name of the variable for the summary output path.
parse_args() {
  local -n _lockfile="$1"
  local -n _readme="$2"
  local -n _summary="$3"
  shift 3
  local -A opts=()

  while (($#)); do
    case "$1" in
      -h | --help) usage ;;
      -l | --lockfile)
        [[ -n ${2:-} && ${2} != -* ]] || logging::log_fatal "Option $1 requires an argument."
        opts[lockfile]="$2"
        shift 2
        ;;
      --lockfile=*)
        opts[lockfile]="${1#*=}"
        shift
        ;;
      -r | --readme)
        [[ -n ${2:-} && ${2} != -* ]] || logging::log_fatal "Option $1 requires an argument."
        opts[readme]="$2"
        shift 2
        ;;
      --readme=*)
        opts[readme]="${1#*=}"
        shift
        ;;
      -s | --summary)
        [[ -n ${2:-} && ${2} != -* ]] || logging::log_fatal "Option $1 requires an argument."
        opts[summary]="${2}"
        shift 2
        ;;
      --summary=*)
        opts[summary]="${1#*=}"
        shift
        ;;
      --)
        shift
        break
        ;;
      -*)
        logging::log_fatal "Unknown option: $1"
        ;;
      *) logging::log_fatal "Unexpected positional argument: $1" ;;
    esac
  done

  # Apply defaults
  _lockfile="${opts[lockfile]:-pnpm-lock.yaml}"
  _readme="${opts[readme]:-README.md}"
  _summary="${opts[summary]:-}"

  # Validate
  [[ -r ${_lockfile} ]] || logging::log_fatal "Lockfile not readable: $_lockfile"
  [[ -w ${_readme} ]] || logging::log_fatal "README not writable: $_readme"

  # Ensure the summary directory exists
  local summary_dir="$(dirname -- "${_summary}")"
  mkdir -p -- "${summary_dir}" || \
    logging::log_fatal "Directory for summary file could not be created: ${summary_dir}"
}

# load_pnpm_lock <lockfile_path> <map_assoc_ref> <keys_array_ref>
#   Loads dependencies+devDependencies from a pnpm-lock.yaml into an associative
#   map (pkg->version) and an ordered keys array via a mapfile callback.
#
# Arguments:
#   $1: lockfile_path     - Path to pnpm-lock.yaml.
#   $2: map_assoc_ref     - Name of associative array variable to populate (pkg->ver).
#   $3: keys_array_ref    - Name of array variable to populate with ordered keys.
load_pnpm_lock() {
  local file="${1}"
  # Use double underscore naming vars to avoid circular namerefs
  local -n __map="${2}"
  local -n __keys="${3}"

  # Remove the callback function when the parent function returns
  trap 'unset -f _parse_cb' RETURN

  __map=()
  __keys=()

  _parse_cb() {
    local idx="${1}" record="${2}"
    local pkg ver

    # Split on the first tab
    IFS=$'\t' read -r pkg ver <<< "$record"
    # Strip out the parenthetical peer dependency versions
    ver="${ver%%(*}"
    __keys[idx]="${pkg}"
    __map["${pkg}"]="${ver}"
  }

  # yq: merge deps+devDeps under the "." importer, emit TSV "key<TAB>value.version"
  mapfile -tc1 -C _parse_cb < <(
    yq eval '
        ( .importers["."].dependencies   // {} ) +
        ( .importers["."].devDependencies // {} )
        | to_entries[]
        | [ .key, .value.version ]
        | @tsv
      ' "${file}"
  )
}

# update_readme_badges <readme_file> <summary_file> <badge_map_ref> <ver_map_ref>
#   Updates Shields.io version badges in the specified README file using the
#   badge-to-package mapping and version map while validating new badge URLs.
#   Writes updated badges to summary file.
#
# Arguments:
#   $1: readme_file       - Path to README.md to update.
#   $2: summary_file      - Path of summary file to write to.
#   $3: badge_map_ref     - Name of associative array mapping badge label->package.
#   $3: ver_map_ref       - Name of associative array variable (pkg->ver).
update_readme_badges() {
  local readme="${1}"
  local summary="${2}"
  local -n __badge_map="${3}"
  local -n __ver_map="${4}"
  local tmp

  tmp="$(mktemp -t readme-staging.XXXXXX)"

  _cleanup() {
    local name="${1}"
    rm -f -- "${name}"
  }

  trap "_cleanup $(printf '%q' "$tmp")" EXIT
  cp -- "${readme}" "${tmp}"

  # Create safe fd for writing
  exec {fd}>>"${summary}"

  for label in "${!__badge_map[@]}"; do
    local pkg ver
    pkg="${__badge_map[${label}]}"
    ver="${__ver_map[${pkg}]:-}"
    if [[ -z ${ver} ]]; then
      logging::log_warn "No version for '${pkg}'; skipping badge '${label}'"
      continue
    fi

    # Escape label for regex replacement
    local esc_label
    esc_label="${label//./\\.}"

    # Extract just the version part (before any color codes or other parameters)
    # This regex captures version-like patterns: numbers, dots, and common pre-release identifiers
    current_ver=$(grep -oP "https?://img\.shields\.io/badge/${esc_label}-\K[0-9]+(?:\.[0-9]+)*(?:-[a-zA-Z][a-zA-Z0-9]*)*(?=[-?]|$)" "$tmp" || echo "")

    if [[ ${current_ver} == "${ver}" ]]; then
      logging::log_info "Badge '${label}' already current: ${ver}"
    elif [[ -n ${current_ver} ]]; then
      logging::log_info "Updating badge: '${label}' ${current_ver} -> ${ver}"
      # Capture: (1) URL prefix, (2) version, (3) optional color code, preserve color in replacement
      perl -pi -e 's{(https?://img\.shields\.io/badge/'"$esc_label"'-)([^-?]+)((?:-[a-fA-F0-9]+)?)}{${1}'"$ver"'${3}}g' "$tmp"

      # Update for summary
      printf "Updated %s: %s -> %s\n" "${label}" "${current_ver}" "${ver}" >&"${fd}"
    else
      logging::log_warn "Could not find badge for '${label}' in README"
    fi
  done

  # Clean up our mess
  exec {fd}>&-

  mv -f -- "${tmp}" "${readme}"
  logging::log_info "Badges updated in ${readme}"
}

main() {
  local lock_file="pnpm-lock.yaml"
  local readme_file="README.md"
  local summary_file=""

  local -A badge_pkg_map=(
    ["Next.js"]="next"
    ["TypeScript"]="typescript"
    ["MUI"]="@mui/material"
    ["Framer_Motion"]="framer-motion"
  )

  local -A kv_map
  local -a kv_keys=()

  check_dependencies
  parse_args lock_file readme_file summary_file "$@"
  load_pnpm_lock "${lock_file}" kv_map kv_keys
  update_readme_badges "${readme_file}" "${summary_file}" badge_pkg_map kv_map
}

if ! (return 0 2> /dev/null); then
  main "$@"
fi
