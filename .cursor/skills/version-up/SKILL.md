---
name: version-up
description: >-
  Perform a project release: bump the semver `version` in package.json, summarize
  changes since the last release, and hand off to the health-checkup. Use when
  cutting a release, bumping the project version, or asked to "version up" / リリース.
---

# Version up

The release ritual for **syakoo-lab itself**: bump this project's own `version` in `package.json`
and run the design checkup that must accompany it.

This is the project's own release, not a dependency update. (Dependency-update PRs are a separate,
Renovate-automated concern and are out of scope here.)

## When to use

- Cutting a new release of syakoo-lab (changing this repo's `package.json` `version`).
- Whenever enough merged work has accumulated to warrant a release.

Not for dependency bumps or feature work.

## Procedure

Run as a **dedicated PR, separate from feature work** (consistent with `continuous-improvement`).

1. **Find the last release.** Read the current `version` in `package.json` and locate the previous
   bump (`git log --oneline -- package.json` or the latest release tag).
2. **Decide the semver bump.** Choose major / minor / patch from the change set:
   - major: breaking change to public behavior or APIs
   - minor: backward-compatible feature
   - patch: backward-compatible fix or docs/internal only
3. **Apply the bump.** Update `version` in `package.json` only.
4. **Write a change summary** since the last release, derived from merged PRs / `git log`. Group by
   the kind of change (features, fixes, internal) so it doubles as release notes.
5. **Hand off to `health-checkup`.** Run that skill over everything changed since the last release
   (design-drift audit + `deepen-modules` pass). The version bump is its trigger.
6. **Open the release PR** per `create-pull-request`, including the change summary.

## Caveats

- Keep release intervals small: the smaller the window, the cheaper the `health-checkup`
  (design debt compounds).
- Do not mix a release bump with feature changes in the same PR.
- The canonical checkup procedure lives in `health-checkup`; this skill only triggers it.
