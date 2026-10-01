#!/usr/bin/env bash
# Post a PR comment summarising advisory VRT mismatches (append-only history).
# Expects: GH_TOKEN, GH_REPO, PR_NUMBER, RUN_URL, HAS_DIFFS
set -euo pipefail

MARKER="<!-- vrt-advisory -->"
REPORT_DIR="__snapshots__/vrt/__report__"

if [ "${HAS_DIFFS}" != "true" ]; then
  echo "No VRT mismatches; leaving any previous advisory comments in place."
  exit 0
fi

rows=""
while IFS= read -r -d '' file; do
  story_id="$(jq -r '.storyId' "${file}")"
  diff_percent="$(jq -r '.diffPercent // empty' "${file}")"
  diff_pixels="$(jq -r '.diffPixels // empty' "${file}")"
  message="$(jq -r '.message' "${file}")"

  if [ -n "${diff_percent}" ]; then
    detail="${diff_percent}%"
    if [ -n "${diff_pixels}" ]; then
      detail="${detail} (${diff_pixels} px)"
    fi
  else
    detail="$(printf '%s' "${message}" | tr '|' '/' | head -c 120)"
  fi

  rows="${rows}| \`${story_id}\` | ${detail} |"$'
'
done < <(find "${REPORT_DIR}" -name '*.json' -print0 | sort -z)

body=$(
  cat <<EOF
${MARKER}
### VRT diffs (advisory)

Snapshot mismatches do **not** fail CI. Accessibility checks still do.

Review the artifact if a diff looks unexpected; update baselines for intentional UI changes.

| Story | Diff |
| --- | --- |
${rows}
📦 [Workflow run / artifacts](${RUN_URL})
EOF
)

jq -n --arg body "${body}" '{body: $body}' \
  | gh api --method POST "repos/${GH_REPO}/issues/${PR_NUMBER}/comments" --input - >/dev/null

echo "Posted VRT advisory comment on PR #${PR_NUMBER}."
