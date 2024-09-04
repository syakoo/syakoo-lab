import { useEffect, useRef } from "react";

/**
 * 現在マウントされているかを取得するフック
 *
 * 主に非同期処理のメモリリークの対処に用いる。
 * こちらを参考: {@link https://github.com/streamich/react-use/blob/master/src/useMountedState.ts}
 */
export const useMountedState = () => {
  const mountedRef = useRef<boolean>(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return () => mountedRef.current;
};
