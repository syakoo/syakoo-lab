import { EffectCallback, useEffect } from "react";

export const useMount = (callback: EffectCallback) => {
  // NOTE: 一度のみ
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
};
