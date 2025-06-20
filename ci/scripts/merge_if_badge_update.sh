#!/usr/bin/env bash
# ===============================================================================
# merge_if_badge_update.sh - Safely squash-merge a badge update PR
#
# DESCRIPTION:
#   Validates a PR to ensure only README.md was changed.
#   Expects a previously uploaded summary artifact (e.g., summary.txt),
#   extracts the version change details, and squash-merges the PR using a clean
#   commit message.
#
#   This script is intended to be run in a *separate GitHub Actions workflow*
#   after the summary artifact has been downloaded (via actions/download-artifact).
#
# USAGE:
#   merge_if_badge_update.sh --pr <number> --summary <path>
#    (Also supports short options -p and -s)
#
# REQUIREMENTS:
#   - gh (GitHub CLI) authenticated
#   - perl
#   - logging.lib.sh
#
# EXAMPLE:
#   ./merge_if_badge_update.sh --pr 1234 --summary summary.txt
# ===============================================================================
set -Eeuo pipefail
shopt -s shift_verbose

readonly SCRIPT_DIR="$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
readonly LOGGING_PATH="${SCRIPT_DIR}/../lib/logging/logging.lib.sh"

if [[ -r ${LOGGING_PATH} ]]; then
  # shellcheck source=../lib/logging/logging.lib.sh
  source "${LOGGING_PATH}"
  logging::init "$0"
else
  printf "Could not find logging library: %s\n" "${LOGGING_PATH}" >&2
  exit 1
fi

usage() {
  cat << SQUASHMACHINE_9000
Usage: $(basename -- "${BASH_SOURCE[0]}") [-p|--pr <PR_NUMBER>] [-s|--summary <SUMMARY_FILE>]
    -p|--pr        PR number to validate and merge
    -s|--summary   Path to summary artifact with the PR body to extract from
    -h|--help      Display this help
SQUASHMACHINE_9000
  exit 1
}

# parse_args parses the command-line arguments for a pull request number and a summary.
#
# Variables set:
#   <name of first arg>: assigned the value passed to --pr or -p
#   <name of second arg>: assigned the value passed to --summary or -s
#
# Usage:
#   parse_args pr_var summary_var [--pr|-p PR_NUMBER] [--summary|-s SUMMARY]
#
# Arguments:
#   $1  Name of the variable to store the PR number (by reference)
#   $2  Name of the variable to store the summary path (by reference)
#   $@  Remaining flags: --pr|-p <number>, --summary|-s <path>, or -h|--help for usage
parse_args() {
  local -n _pr_ref="${1}"
  local -n _summary_ref="${2}"
  shift 2

  while (($#)); do
    case "${1}" in
      -p | --pr)
        _pr_ref="${2}"
        shift 2
        ;;
      -s | --summary)
        _summary_ref="${2}"
        shift 2
        ;;
      -h | --help)
        usage
        ;;
      *)
        logging::log_fatal "Unknown argument: $1"
        ;;
    esac
  done

  if [[ -z ${_pr_ref:-} || -z ${_summary_ref:-} ]]; then
    usage
  fi

  if [[ ! ${_pr_ref} =~ ^[0-9]+$ ]]; then
    logging::log_fatal "PR number must be numeric: ${_pr_ref}"
  fi
}

validate_pr_files() {
  local pr="${1}"
  local -a changed_files=()

  mapfile -t changed_files < <(gh pr diff "${pr}" --name-only)

  if ((${#changed_files[@]} == 0)); then
    logging::log_error "No files changed in PR #${pr}"
    return 1
  fi

  if ((${#changed_files[@]} != 1)) || [[ ${changed_files[0]} != "README.md" ]]; then
    logging::log_error "Unexpected files changed in PR #${pr}: ${changed_files[*]}"
    return 1
  fi

  return 0
}

body_builder() {
  local summary_file="${1}"
  local extracted_body

  extracted_body="$(perl -lne '
        next unless /^### Changes/ .. /^## /;       # only inside the Changes .. next-section block
        next if /^### Changes|^## /;                # skip the header lines themselves
        s/^(-\s*)Updated\s*/$1/;                    # remove "Updated" while preserving bullet format
        print if /\S/;                              # print only if the line is not just whitespace
    ' "${summary_file}")"

  if [[ -z ${extracted_body:-} ]]; then
    logging::log_fatal "No changes section found in summary file, or something else went wrong parsing ${summary_file}"
  fi

  printf 'Updated badges:\n%s\n' "${extracted_body}"
}
merge_pr() {
  local pr="${1}"
  local summary_file="${2}"

  local subject="ci(readme): update badge versions (#$pr)"

  logging::log_info "Squash merging PR #${pr} with subject: ${subject}"
  gh pr merge "${pr}" \
    --squash \
    --auto \
    --delete-branch \
    --subject "${subject}" \
    --body-file <(body_builder "${summary_file}")
}
main() {
  local pr_number summary_file

  parse_args pr_number summary_file "$@"

  [[ -r ${summary_file} ]] || logging::log_fatal "Summary file not found: ${summary_file}"

  if validate_pr_files "${pr_number}"; then
    merge_pr "${pr_number}" "${summary_file}"
    logging::log_info "Merge completed for PR #${pr_number}"
  else
    logging::log_warn "Skipping merge for PR #${pr_number} due to unexpected file changes"
  fi
}

if ! (return 0 2> /dev/null); then
  main "$@"
fi
