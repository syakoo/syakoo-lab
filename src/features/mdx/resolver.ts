import { runSync } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

import type {
  MDXComponent,
  ResolvedMDXContent,
  SerializedMDXContent,
} from "./types";

/**
 * シリアライズされた MDX をコンポーネントに解決する関数
 */
export const resolveMDXContent = (
  serializedMDXContent: SerializedMDXContent,
): ResolvedMDXContent => {
  // JS string -> MDXComponent
  const MDXContent = (
    runSync(serializedMDXContent.data, {
      ...runtime,
    }) as { default: MDXComponent }
  ).default;

  return {
    type: "resolved",
    data: MDXContent,
  };
};
