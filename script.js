import fs from "fs";
import path from "path";

function camelToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  const importPattern = /(import\s+.*\s+from\s+['"])(.*?)(['"])/g;
  const newContent = content.replace(importPattern, (match, p1, p2, p3) => {
    const parts = p2.split("/");
    const newParts = parts.map((part) => camelToKebab(part));
    const newPath = newParts.join("/");
    return `${p1}${newPath}${p3}`;
  });

  fs.writeFileSync(filePath, newContent, "utf-8");
}

function renamePath(oldPath) {
  const newPath = path.join(
    path.dirname(oldPath),
    camelToKebab(path.basename(oldPath)),
  );
  fs.renameSync(oldPath, newPath);
  return newPath;
}

function processDirectory(directory) {
  fs.readdirSync(directory).forEach((file) => {
    const fullPath = path.join(directory, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      const newDirPath = renamePath(fullPath);
      processDirectory(newDirPath);
    } else if (
      fullPath.endsWith(".js") ||
      fullPath.endsWith(".ts") ||
      fullPath.endsWith(".jsx") ||
      fullPath.endsWith(".tsx")
    ) {
      const newFilePath = renamePath(fullPath);
      processFile(newFilePath);
    }
  });
}
const directory = "./src"; // ここに対象のディレクトリパスを指定
processDirectory(directory);
