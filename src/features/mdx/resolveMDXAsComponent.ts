import { runSync } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import type { MDXComponent, SerializedMDX } from "./types";

/**
 * シリアライズされた MDX をコンポーネントに解決する関数
 */
export const resolveMDXAsComponent = (
  serializedMDX: SerializedMDX,
): MDXComponent => {
  // JS string -> MDXComponent
  const MDXContent: MDXComponent = runSync(serializedMDX, {
    ...runtime,
  }).default;

  return MDXContent;
};
