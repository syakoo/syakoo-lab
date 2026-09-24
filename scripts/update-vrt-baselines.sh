#!/usr/bin/env bash
# Update Storybook VRT baselines with Linux/Chromium (matches CI).
# For macOS hosts: builds/serves Storybook locally; screenshots run inside the
# Playwright Docker image so macOS text rendering never lands in __snapshots__/vrt/.
# On Cursor Automation / Cloud Agents (already Linux), use
# `pnpm storybook:test:vrt:update:host` instead — no Docker-in-Docker.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v docker >/dev/null 2>&1; then
  echo "error: docker is required (Docker Desktop is free for personal use)." >&2
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "error: Docker daemon is not running. Start Docker Desktop and retry." >&2
  exit 1
fi

PW_VERSION="$(pnpm exec node -p "require('playwright/package.json').version")"
PNPM_VERSION="$(pnpm exec node -p "require('./package.json').packageManager.replace(/^pnpm@/, '')")"
IMAGE="mcr.microsoft.com/playwright:v${PW_VERSION}-jammy"

echo "==> Playwright image: ${IMAGE}"
docker pull "${IMAGE}"

echo "==> Building Storybook on host"
pnpm storybook:build

# Bind 0.0.0.0 so Linux containers can reach the host server.
echo "==> Serving Storybook on :6006"
pnpm exec http-server storybook-static -a 0.0.0.0 -p 6006 -s &
SERVER_PID=$!
cleanup() {
  kill "${SERVER_PID}" 2>/dev/null || true
}
trap cleanup EXIT

pnpm exec wait-on "http://127.0.0.1:6006"

echo "==> Updating baselines in Linux/Chromium"
# Anonymous volume for /work/node_modules keeps the host install untouched.
docker run --rm \
  --add-host=host.docker.internal:host-gateway \
  -v "${ROOT}:/work" \
  -v /work/node_modules \
  -w /work \
  -e CI=true \
  -e PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
  -e NPM_CONFIG_ENGINE_STRICT=false \
  "${IMAGE}" \
  bash -lc "
    set -euo pipefail
    corepack enable
    corepack prepare pnpm@${PNPM_VERSION} --activate
    pnpm install --frozen-lockfile
    pnpm exec test-storybook \
      --url http://host.docker.internal:6006 \
      --excludeTags skip-vrt \
      --updateSnapshot
  "

echo "==> Done. Review and commit changes under __snapshots__/vrt/"
