# Issue tracker: GitHub

Issues and specs live in `peppapig450/portfolio-v2`. Use the `gh` CLI.
Pass `--repo peppapig450/portfolio-v2` to issue commands to target this repo
explicitly, including from a fork or worktree.

## Conventions

- **Publish to the issue tracker**: `gh issue create --title "..." --body "..."`.
  Use a heredoc for multiline bodies.
- **Fetch a ticket**: `gh issue view <number> --json number,title,body,labels,comments`.
- **List issues**: `gh issue list --json number,title,body,labels,comments` with
  the appropriate `--state` and `--label` filters.
- **Link a sub-issue**: `gh issue create --parent <parent> ...` or
  `gh issue edit <parent> --add-sub-issue <child>`. If sub-issues are unavailable,
  put `Part of #<parent>` at the top of the child body.
- **Record blockers**: use native issue dependencies with
  `gh issue create --blocked-by <n>,<n> ...` or
  `gh issue edit <child> --add-blocked-by <blocker>`. If unavailable, put
  `Blocked by: #<n>, #<n>` at the top of the child body. A ticket is unblocked
  when every blocker is closed.
- **Count open blockers**: `gh api repos/peppapig450/portfolio-v2/issues/<n> --jq .issue_dependencies_summary.blocked_by`.
- **Comment**: `gh issue comment <number> --body "..."`.
- **Apply or remove labels**: `gh issue edit <number> --add-label "..."`
  or `--remove-label "..."`.
- **Close**: post the explanation as a comment, then run `gh issue close <number>`.

## Pull requests as a triage surface

**PRs as a request surface: no.**

## Wayfinding operations

- **Map**: create one issue with the label `wayfinder:map` and the Notes,
  Decisions-so-far, and Fog sections.
- **Child ticket**: create a sub-issue with a `wayfinder:<type>` label
  (`research`, `prototype`, `grilling`, or `task`). If sub-issues are unavailable,
  use a task list in the map and put `Part of #<map>` in the child body.
- **Frontier**: select the first open, unblocked, unassigned child in map order.
- **Claim**: run `gh issue edit <n> --add-assignee @me` before working.
- **Resolve**: comment with the answer, close the child, then summarize and link
  the answer in the map's Decisions-so-far section.
