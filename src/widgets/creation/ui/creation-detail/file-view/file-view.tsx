import { promises as fs } from "fs";
import path from "path";

import type { FC } from "react";

import { FileViewUI } from "./file-view-ui";

type Props = {
  src: string;
  fileName?: string;
};

export const FileView: FC<Props> = async ({ src, fileName }) => {
  const filePath = path.join(process.cwd(), "public", src);
  const content = await fs.readFile(filePath, "utf-8");
  const displayFileName = fileName ?? path.basename(src);

  return <FileViewUI fileName={displayFileName}>{content}</FileViewUI>;
};
