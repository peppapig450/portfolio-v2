#!/usr/bin/env bash
# ===============================================================================
# merge_if_badge_update.sh - Safely squash-merge a badge update PR in CI
#
# DESCRIPTION:
#   Validates a PR to ensure only README.md was changed.
#   Extracts the version change details from a summary file and performs a
#   squash-merge with a clean commit message.
#
#   Meant to be invoked from a GitHub Actions workflow (e.g. “Merge badge PRs”)
#   that:
#     • Triggers on pull_request.labeled (label: auto-badges) OR workflow_dispatch
#     • Checks out the repo
#     • Writes the PR body to a summary file
#     • Calls this script with --pr and --summary
#
# USAGE IN WORKFLOW:
#   - name: Extract summary from PR body
#     run: |
#       mkdir -p commit-body
#       echo "${{ github.event.pull_request.body }}" > commit-body/summary.txt
#
#   - name: Merge badge PR
#     env:
#       GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
#     run: |
#       bash ci/scripts/merge_if_badge_update.sh \
#         --pr "${{ github.event.pull_request.number }}" \
#         --summary "commit-body/summary.txt"
#
# REQUIREMENTS:
#   - gh (GitHub CLI) authenticated via GITHUB_TOKEN
#   - perl
#   - logging.lib.sh (sourced from ../lib/logging/logging.lib.sh)
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

# usage prints the help/usage message and exits.
#
# Globals:
#   None
#
# Arguments:
#   None
#
# Side effects:
#   Prints usage information to stdout and exits with code 1.
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

# validate_pr_files ensures the PR only modifies README.md.
#
# Arguments:
#   $1  PR number to inspect
#
# Returns:
#   0 if exactly one file changed and it is README.md
#   Exits fatally otherwise
#
# Side effects:
#   Fetches `gh pr diff` and may call logging::log_fatal on failure.
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

# body_builder extracts the “Changes” section from the summary artifact and
# formats it for the PR merge body.
#
# Arguments:
#   $1  Path to the summary file
#
# Outputs:
#   Writes to stdout the cleaned-up list of badge updates, prefixed by "Updated badges:"
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

# merge_pr performs the squash-merge of the given PR, using a clean commit
# message and the body generated by body_builder().
#
# Arguments:
#   $1  PR number to merge
#   $2  Path to the summary file for body extraction
#
# Side effects:
#   Invokes `gh pr merge` with --squash, --auto, and --delete-branch.
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

# main is the entrypoint: parses args, validates files, and merges if valid.
#
# Arguments:
#   All command-line flags passed to the script
#
# Side effects:
#   Calls parse_args, validate_pr_files, merge_pr, and logs status.
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
