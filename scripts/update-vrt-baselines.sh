#!/usr/bin/env bash
# Update Storybook VRT baselines with Linux/Chromium in the same Playwright
# image the CI storybook-test job runs in (see scripts/vrt-image.sh).
# For macOS hosts: builds/serves Storybook locally; screenshots run inside the
# Playwright Docker image so macOS text rendering never lands in __snapshots__/vrt/.
# On Cloud / CI agents (already Linux), use
# `pnpm storybook:test:vrt:update:ci` instead — no Docker-in-Docker.
#
# Expect first runs to take several minutes: Storybook build on the host, then
# a full `pnpm install --frozen-lockfile` inside the container (anonymous
# node_modules volume is discarded when the container exits).
#
# The container is pinned to linux/amd64 like CI, so Apple Silicon runs it under
# emulation (slower, hence the longer --testTimeout, but meant to match CI).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
PORT=6006

if ! command -v docker >/dev/null 2>&1; then
  echo "error: docker is required (Docker Desktop or a running Docker Engine)." >&2
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "error: Docker daemon is not running. Start Docker and retry." >&2
  exit 1
fi

if lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "error: port ${PORT} is already in use. Stop the other process (e.g. storybook) and retry." >&2
  exit 1
fi

PNPM_VERSION="$(pnpm exec node -p "require('./package.json').packageManager.replace(/^pnpm@/, '')")"
IMAGE="$(bash scripts/vrt-image.sh)"
PLATFORM=linux/amd64

echo "==> Playwright image: ${IMAGE}"
if ! docker image inspect --platform "${PLATFORM}" "${IMAGE}" >/dev/null 2>&1; then
  echo "==> Image not found locally; pulling"
  docker pull --platform "${PLATFORM}" "${IMAGE}"
else
  echo "==> Using local image (skip pull). Re-pull manually after upgrading Playwright."
fi

echo "==> Building Storybook on host"
pnpm storybook:build

# Bind 0.0.0.0 so Linux containers can reach the host server.
echo "==> Serving Storybook on :${PORT}"
pnpm exec http-server storybook-static -a 0.0.0.0 -p "${PORT}" -s &
SERVER_PID=$!
cleanup() {
  kill "${SERVER_PID}" 2>/dev/null || true
}
trap cleanup EXIT

pnpm exec wait-on "http://127.0.0.1:${PORT}"

echo "==> Updating baselines in Linux/Chromium"
# Anonymous volume for /work/node_modules keeps the host install untouched.
# engine-strict override: mounted .npmrc sets engine-strict=true; Playwright
# images may lag package.json engines Node — do not rely on NPM_CONFIG alone.
docker run --rm \
  --platform "${PLATFORM}" \
  --add-host=host.docker.internal:host-gateway \
  -v "${ROOT}:/work" \
  -v /work/node_modules \
  -w /work \
  -e CI=true \
  -e PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
  "${IMAGE}" \
  bash -lc "
    set -euo pipefail
    corepack enable
    corepack prepare pnpm@${PNPM_VERSION} --activate
    pnpm config set engine-strict false
    pnpm install --frozen-lockfile
    pnpm exec test-storybook \
      --url http://host.docker.internal:${PORT} \
      --excludeTags skip-vrt \
      --testTimeout 60000 \
      --updateSnapshot
  "

echo "==> Done. Review and commit changes under __snapshots__/vrt/"
