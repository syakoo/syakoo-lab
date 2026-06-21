---
name: version-up
description: >-
  Cut a syakoo-lab release end-to-end in one session: decide the semver bump, run
  the health-checkup (filing issues for actionable findings), commit the version
  bump straight to `main` via the signed Contents API, and publish the GitHub
  Release with notes. No review PR by default. Use when cutting a release, bumping
  the project version, or asked to "version up".
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

Run **end-to-end in a single session**. The release is mechanical and needs no human review, so by
default there is no review PR: the version bump lands directly on `main` and the GitHub Release is
published in the same run (step 4 has the fallback for when `main` protection requires a PR). The
design audit's output lives in issues + release notes instead of a PR body.

1. **Find the last release.** Read the current `version` in `package.json` and the latest release tag
   (`gh release list` / `git tag --sort=-creatordate`).
2. **Decide the semver bump** from the change set since the last tag:
   - major: breaking change to public behavior or APIs
   - minor: backward-compatible feature
   - patch: backward-compatible fix or docs/internal only
3. **Run `health-checkup`** over everything changed since the last release (design-drift audit +
   `deepen-modules` pass). For each **actionable** finding, file a GitHub issue (`create-github-issue`)
   and record its number. Give declined / intentional findings a one-line rationale (a single tracking
   issue is fine for grouping structural candidates). If nothing is actionable, file no issues — the
   release notes' Health-checkup section then simply states "No actionable findings."
4. **Bump the version on `main`.** Change only the `version` field in `package.json`. `main` requires
   **signed commits**, so commit through the GitHub Contents API (GitHub signs API commits
   automatically) rather than a local `git push`:
   ```bash
   # 1. edit the version field in package.json locally (do NOT git-commit it)
   # 2. commit the edited file straight to main via the API.
   #    The Contents API needs single-line base64 (avoid macOS's 76-col wrapping):
   CONTENT=$(base64 -w0 package.json 2>/dev/null || base64 < package.json | tr -d '\n')
   SHA=$(gh api repos/<owner>/<repo>/contents/package.json --jq .sha)
   gh api -X PUT repos/<owner>/<repo>/contents/package.json \
     -f message="chore: bump version to X.Y.Z" \
     -f sha="$SHA" \
     -f content="$CONTENT"
   ```
   Skipping the PR is only valid while `main` requires neither review nor status checks — verify
   first with `gh api repos/<owner>/<repo>/branches/main/protection` and fall back to an auto-merge
   PR if rules have tightened.
5. **Compose release notes** = auto PR list + health-checkup summary. Generate the PR list first:
   ```bash
   gh api repos/<owner>/<repo>/releases/generate-notes \
     -f tag_name=vX.Y.Z -f previous_tag_name=v<prev> --jq .body
   ```
   Then append a `## Health-checkup` section linking the issues filed in step 3 and noting declined items.
6. **Publish the release.** Tag + publish in one step (the tag is created on `main` at publish time):
   ```bash
   gh release create vX.Y.Z --target main --title "vX.Y.Z" --notes "<composed notes>"
   ```

## Caveats

- Keep release intervals small: the smaller the window, the cheaper the `health-checkup`
  (design debt compounds).
- Do not fold feature or fix changes into the bump commit — `version` only.
- `main` requires **signed commits**; the Contents API path satisfies this. A local `git push` would
  need GPG/SSH signing configured.
- The token needs **Issues: write** (file/close issues) and **Contents + Releases: write** (bump +
  publish).
- The canonical checkup procedure lives in `health-checkup`; this skill only triggers it.
