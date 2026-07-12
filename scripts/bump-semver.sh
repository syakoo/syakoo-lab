#!/usr/bin/env bash
# Bump package.json "version" in-place. Usage: bump-semver.sh major|minor|patch
set -euo pipefail

level="${1:?usage: bump-semver.sh major|minor|patch}"
file="${2:-package.json}"

node --input-type=module -e "
import { readFileSync, writeFileSync } from 'node:fs';
const file = process.argv[1];
const level = process.argv[2];
const pkg = JSON.parse(readFileSync(file, 'utf8'));
const parts = String(pkg.version).split('.').map((n) => Number(n));
if (parts.length !== 3 || parts.some((n) => !Number.isInteger(n) || n < 0)) {
  throw new Error(\`invalid version: \${pkg.version}\`);
}
let [major, minor, patch] = parts;
if (level === 'major') { major += 1; minor = 0; patch = 0; }
else if (level === 'minor') { minor += 1; patch = 0; }
else if (level === 'patch') { patch += 1; }
else { throw new Error(\`invalid level: \${level}\`); }
pkg.version = \`\${major}.\${minor}.\${patch}\`;
writeFileSync(file, \`\${JSON.stringify(pkg, null, 2)}\\n\`);
console.log(pkg.version);
" "$file" "$level"
