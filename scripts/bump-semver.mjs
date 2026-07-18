#!/usr/bin/env node
/**
 * Bump package.json "version" in-place.
 * Usage: node scripts/bump-semver.mjs major|minor|patch [path/to/package.json]
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * @param {string} version
 * @param {"major" | "minor" | "patch"} level
 * @returns {string}
 */
export function bumpSemver(version, level) {
  const parts = String(version)
    .split(".")
    .map((n) => Number(n));
  if (parts.length !== 3 || parts.some((n) => !Number.isInteger(n) || n < 0)) {
    throw new Error(`invalid version: ${version}`);
  }
  let [major, minor, patch] = parts;
  if (level === "major") {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (level === "minor") {
    minor += 1;
    patch = 0;
  } else if (level === "patch") {
    patch += 1;
  } else {
    throw new Error(`invalid level: ${level}`);
  }
  return `${major}.${minor}.${patch}`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const level = process.argv[2];
  const file = process.argv[3] ?? "package.json";
  if (!level) {
    console.error("usage: bump-semver.mjs major|minor|patch [package.json]");
    process.exit(1);
  }
  const pkg = JSON.parse(readFileSync(file, "utf8"));
  pkg.version = bumpSemver(
    pkg.version,
    /** @type {"major"|"minor"|"patch"} */ (level),
  );
  writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
  console.log(pkg.version);
}
