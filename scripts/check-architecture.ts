import { readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { globSync } from "glob";

const ROOT = resolve(import.meta.dirname, "..");
const SRC = resolve(ROOT, "src");

type Layer =
  | "app"
  | "widgets"
  | "features"
  | "entities"
  | "contents"
  | "shared";

/** Lower rank = higher FSD layer (may depend on layers with higher rank). */
const LAYER_RANK: Record<Layer, number> = {
  app: 0,
  widgets: 1,
  features: 2,
  entities: 3,
  contents: 4,
  shared: 5,
};

const IMPORT_RE =
  /(?:import|export)\s+(?:type\s+)?(?:[\w*{}\s,]+\s+from\s+)?["']([^"']+)["']/g;

type Violation = {
  file: string;
  importPath: string;
  message: string;
};

const violations: Violation[] = [];

const getLayerFromRel = (relPath: string): Layer | null => {
  const [layer] = relPath.split("/");
  if (layer in LAYER_RANK) {
    return layer as Layer;
  }
  return null;
};

const getLayer = (filePath: string): Layer | null => {
  const rel = relative(SRC, filePath).replaceAll("\\", "/");
  return getLayerFromRel(rel);
};

const resolveImportPath = (
  importerFile: string,
  importPath: string,
): string | null => {
  if (!importPath.startsWith(".")) {
    return null;
  }
  const resolved = resolve(importerFile, "..", importPath).replaceAll(
    "\\",
    "/",
  );
  if (!resolved.startsWith(SRC)) {
    return null;
  }
  return relative(SRC, resolved).replaceAll("\\", "/");
};

const getSliceRoot = (
  layer: "widgets" | "features" | "entities",
  relPath: string,
): string | null => {
  const parts = relPath.split("/");
  if (parts[0] !== layer) {
    return null;
  }
  if (layer === "features") {
    // features/<domain>/<feature-name>/...
    if (parts.length < 3) {
      return null;
    }
    return `${parts[0]}/${parts[1]}/${parts[2]}`;
  }
  // widgets/<slice>/... or entities/<slice>/...
  if (parts.length < 2) {
    return null;
  }
  return `${parts[0]}/${parts[1]}`;
};

const isInternalSegment = (segment: string): boolean =>
  segment === "ui" || segment === "models" || segment === "helpers";

const checkPublicApi = (
  importerRel: string,
  targetRel: string,
  displayPath: string,
): void => {
  for (const layer of ["widgets", "features", "entities"] as const) {
    const targetSlice = getSliceRoot(layer, targetRel);
    if (!targetSlice) {
      continue;
    }

    const importerSlice = getSliceRoot(layer, importerRel);
    if (importerSlice === targetSlice) {
      return;
    }

    const afterSlice = targetRel.slice(targetSlice.length + 1);
    const firstSegment = afterSlice.split("/")[0];
    if (firstSegment && isInternalSegment(firstSegment)) {
      violations.push({
        file: importerRel,
        importPath: displayPath,
        message: `Import past the ${layer} slice public API. Use the slice barrel instead of "${targetRel}". See project-structure skill.`,
      });
      return;
    }
  }
};

const checkLayerDirection = (
  importerLayer: Layer,
  targetLayer: Layer,
  importerRel: string,
  displayPath: string,
): void => {
  if (LAYER_RANK[importerLayer] <= LAYER_RANK[targetLayer]) {
    return;
  }

  violations.push({
    file: importerRel,
    importPath: displayPath,
    message: `FSD layer violation: "${importerLayer}" must not import from "${targetLayer}". See project-structure skill.`,
  });
};

const sourceFiles = globSync("src/**/*.{ts,tsx}", {
  cwd: ROOT,
  ignore: ["**/*.d.ts"],
});

for (const relFile of sourceFiles) {
  const absFile = resolve(ROOT, relFile);
  const importerLayer = getLayer(absFile);
  if (!importerLayer) {
    continue;
  }

  const content = readFileSync(absFile, "utf8");
  const importerRel = relative(SRC, absFile).replaceAll("\\", "/");

  for (const match of content.matchAll(IMPORT_RE)) {
    const importPath = match[1];
    if (!importPath?.startsWith(".")) {
      continue;
    }

    const targetRel = resolveImportPath(absFile, importPath);
    if (!targetRel) {
      continue;
    }

    const targetLayer = getLayerFromRel(targetRel);
    if (targetLayer) {
      checkLayerDirection(importerLayer, targetLayer, importerRel, importPath);
    }

    checkPublicApi(importerRel, targetRel, importPath);
  }
}

if (violations.length > 0) {
  console.error("Architecture check failed:\n");
  for (const v of violations) {
    console.error(`  ${v.file}`);
    console.error(`    import: ${v.importPath}`);
    console.error(`    ${v.message}\n`);
  }
  process.exit(1);
}

console.log("Architecture check passed.");
