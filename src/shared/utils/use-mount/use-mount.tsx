import type { EffectCallback } from "react";
import { useEffect } from "react";

export const useMount = (callback: EffectCallback) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: マウント時に一度だけ実行する
  useEffect(callback, []);
};
