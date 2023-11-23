"use client";

import { resolveMDXAsComponent } from "@/features/mdx/resolveMDXAsComponent";

import { WritingResolvedBody, WritingSerializedBody } from "./types";

/**
 * 文書のシリアライズされた文字列をコンポーネント化する関数
 */
export const resolveWritingBody = (
  serializedBody: WritingSerializedBody,
): WritingResolvedBody => {
  return {
    type: "resolved",
    data: resolveMDXAsComponent(serializedBody.data),
  };
};
