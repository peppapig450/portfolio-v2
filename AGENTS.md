# Repository instructions

## Setup and verification

- This is one Next.js app at the repo root, not a multi-package workspace.
  Use the pnpm version pinned in `package.json`; PR CI uses Node 20 and runs
  `pnpm install --frozen-lockfile`, `pnpm exec prettier --check .`, then
  `pnpm run lint`.
- `.gitattributes` selects a custom `pnpm` merge driver for `pnpm-lock.yaml`.
  Check `git config --get merge.pnpm.driver` before relying on it in a fresh
  clone; the attribute does not configure the driver. Verify the result of
  any lockfile merge with `pnpm install --frozen-lockfile`.
- For focused checks, use `pnpm exec eslint <file>` and
  `pnpm exec prettier --check <file>`. `pnpm run format` rewrites the whole
  repo and organizes imports; use `pnpm exec prettier --write <file>` to
  limit the edit. ESLint requires type-only imports.
- On Windows with `core.autocrlf=true`, use
  `pnpm exec prettier --check --end-of-line auto .` to distinguish formatting
  issues from CRLF conversion without rewriting the checkout.
- There is no test script or dedicated typecheck script. Use
  `pnpm exec tsc --noEmit` for a quick typecheck or `pnpm run build` to verify
  production compilation. Both `pnpm run dev` and the build may need network
  access for `next/font/google` in `src/styles/theme.ts`.
- Use `package.json` and `pnpm-lock.yaml` for dependency versions; README
  version badges can lag and are updated by a separate workflow.

## App wiring and external services

- `src/app/layout.tsx` wires the MUI cache and theme, not the navbar.
  Navigation is composed by pages or `src/app/components/Layout.tsx`.
  Keep route metadata in the server `page.tsx` files and interactive UI in
  their client components. Public routes are listed manually in
  `src/app/sitemap.ts`.
- Project cards and details use `src/data/projects.json`. The client
  `ProjectsContext` parses it on mount and throws for unsupported `type` or
  `mediaType` values, so smoke-test `/projects` after changing either.
- Project media filenames resolve against `NEXT_PUBLIC_BLOB_STORAGE_URL`;
  without it they fall back to `/images/`, which has no tracked assets.
  New remote hosts for `next/image` must be allowed in `next.config.ts`.
  `MediaRenderer` derives an MP4 fallback by replacing the `.webm` suffix.
- `/contact` posts directly to Formspree even from localhost. Stub the
  request when testing successful submission to avoid sending real messages.

## Agent skills

### Issue tracker

Issues and specs are tracked in GitHub Issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Triage uses the five default role names as labels. See `docs/agents/triage-labels.md`.

### Domain docs

This repo uses a single-context layout. See `docs/agents/domain.md`.
