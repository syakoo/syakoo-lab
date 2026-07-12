---
name: version-up
description: >-
  Explain or override the automated release path. Versions normally bump on each
  merge to main from the PR's semver:* label. Use when asked to "version up", to
  recover a failed auto-release, or for an exceptional manual bump.
---

# Version up

**Normal path (no skill run):** every PR to `main` carries exactly one of
`semver:major` / `semver:minor` / `semver:patch`. CI enforces the label.
On merge, `.github/workflows/version-bump-on-merge.yml` bumps `package.json` via
the signed Contents API and publishes GitHub Release `vX.Y.Z` with generated notes.
`renovate[bot]` PRs may omit the label and default to **patch**.

This skill is for **exceptions**, not the routine release.

## When to use

- Auto-bump / release failed and needs a manual retry
- An exceptional bump with no mergeable PR (rare)
- Explaining the release model to a human or agent

Not for ordinary feature/fix/chore PRs — put a `semver:*` label on those instead.

## Label guide (for PR authors)

| Label | Use when |
|-------|----------|
| `semver:major` | Breaking change to public behavior or APIs |
| `semver:minor` | Backward-compatible feature |
| `semver:patch` | Fix, docs, chore, or internal-only |

## Manual recovery

1. Confirm the intended next version from `package.json` and `gh release list`.
2. Bump only `version` in `package.json` (or `scripts/bump-semver.sh <level>`).
3. Land it with a signed commit on `main` (Contents API if local signing is unavailable).
4. `gh release create vX.Y.Z --target main --generate-notes --notes-start-tag v<prev>`.

## Caveats

- Design health is **not** this skill's job. Pre-PR `health-checkup` (see `create-pull-request` /
  `ai-workflow`) owns drift audits.
- Do not open a dedicated "release PR" for routine bumps — the merge workflow is the release.
- Multiple `semver:*` labels: the workflow prefers major > minor > patch; CI requires exactly one.
