#!/usr/bin/env bash
# Bump package.json "version" in-place. Usage: bump-semver.sh major|minor|patch [package.json]
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
exec node "$root/scripts/bump-semver.mjs" "$@"
