"use client";

import { resolveMDXAsComponent } from "@/features/mdx/resolveMDXAsComponent";

import { ArtResolvedBody, ArtSerializedBody } from "./types";

/**
 * イラストのシリアライズされた文字列をコンポーネント化する関数
 */
export const resolveArtBody = (
  serializedBody: ArtSerializedBody,
): ArtResolvedBody => {
  return {
    type: "resolved",
    data: resolveMDXAsComponent(serializedBody.data),
  };
};
