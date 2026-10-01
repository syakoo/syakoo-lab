#!/usr/bin/env bash
# Post or refresh a sticky PR comment summarising advisory VRT mismatches.
# Expects: GH_TOKEN, GH_REPO, PR_NUMBER, RUN_URL, HAS_DIFFS
set -euo pipefail

MARKER="<!-- vrt-advisory -->"
REPORT_DIR="__snapshots__/vrt/__report__"

# All sticky comment ids (oldest first). Duplicates are cleaned during upsert/delete.
existing_comment_ids() {
  gh api "repos/${GH_REPO}/issues/${PR_NUMBER}/comments" --paginate \
    --jq ".[] | select(.body | contains(\"${MARKER}\")) | .id"
}

delete_comment_ids() {
  local comment_id
  for comment_id in "$@"; do
    [ -n "${comment_id}" ] || continue
    gh api --method DELETE "repos/${GH_REPO}/issues/comments/${comment_id}" >/dev/null
  done
}

upsert_comment() {
  local body="$1"
  local ids=()
  local keep_id
  local extras=()

  while IFS= read -r comment_id; do
    [ -n "${comment_id}" ] || continue
    ids+=("${comment_id}")
  done < <(existing_comment_ids || true)

  if [ "${#ids[@]}" -eq 0 ]; then
    jq -n --arg body "${body}" '{body: $body}' \
      | gh api --method POST "repos/${GH_REPO}/issues/${PR_NUMBER}/comments" --input - >/dev/null
    return
  fi

  keep_id="${ids[0]}"
  extras=("${ids[@]:1}")
  jq -n --arg body "${body}" '{body: $body}' \
    | gh api --method PATCH "repos/${GH_REPO}/issues/comments/${keep_id}" --input - >/dev/null
  if [ "${#extras[@]}" -gt 0 ]; then
    echo "Removing ${#extras[@]} duplicate VRT advisory comment(s)."
    delete_comment_ids "${extras[@]}"
  fi
}

delete_comment_if_present() {
  local ids=()
  while IFS= read -r comment_id; do
    [ -n "${comment_id}" ] || continue
    ids+=("${comment_id}")
  done < <(existing_comment_ids || true)
  if [ "${#ids[@]}" -gt 0 ]; then
    delete_comment_ids "${ids[@]}"
  fi
}

if [ "${HAS_DIFFS}" != "true" ]; then
  delete_comment_if_present
  echo "No VRT mismatches; sticky comment cleared if present."
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

upsert_comment "${body}"
echo "Posted VRT advisory comment on PR #${PR_NUMBER}."
