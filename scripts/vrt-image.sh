#!/usr/bin/env bash
# Prints the Playwright Docker image Storybook VRT renders in.
# Used by update-vrt-baselines.sh and by the CI guard that keeps the
# storybook-test container in step with the installed Playwright version.
set -euo pipefail

cd "$(dirname "$0")/.."
echo "mcr.microsoft.com/playwright:v$(node -p "require('playwright/package.json').version")-jammy"
