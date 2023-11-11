import { useState } from "react";
import { useMountedState } from "../../mount/useMountedState";
import {
  AsyncStateError,
  AsyncStateIdle,
  AsyncStateLoading,
  AsyncStateSuccess,
} from "./types";

type AsyncFnBase = (...args: unknown[]) => Promise<unknown>;
type AsyncFnReturn<AsyncFn extends AsyncFnBase> = AsyncFn extends (
  ...args: unknown[]
) => Promise<infer T>
  ? T
  : never;

/**
 * useAsyncFn におけるステート型
 */
type BaseAsyncFnState<Data> =
  | AsyncStateIdle
  | AsyncStateLoading<Data>
  | AsyncStateSuccess<Data>
  | AsyncStateError;

/**
 * 非同期関数をラップしステート型 ({@link BaseAsyncFnState}) にパターン分岐する抽象化フック
 *
 * NOTE: このフックは外部では使用しないこと
 */
export const useBaseAsyncFn = <AsyncFn extends AsyncFnBase>(
  asyncFn: AsyncFn,
  initialState: BaseAsyncFnState<AsyncFnReturn<AsyncFn>> = {
    status: "idle",
  },
) => {
  const [state, setState] =
    useState<BaseAsyncFnState<AsyncFnReturn<AsyncFn>>>(initialState);
  const isMounted = useMountedState();

  const callBack = async (...args: Parameters<AsyncFn>) => {
    // NOTE: 前回のロード内容を保持したままバックグラウンドで実行する
    setState((prev) => ({ ...prev, status: "loading" }));

    try {
      const result = (await asyncFn(...args)) as AsyncFnReturn<AsyncFn>;

      const successResult: AsyncStateSuccess<AsyncFnReturn<AsyncFn>> = {
        status: "success",
        data: result,
      };

      // NOTE: メモリリーク対策のため、この時点でマウントがある場合に更新する
      if (isMounted()) setState(successResult);
      return successResult;
    } catch (error) {
      const errorResult: AsyncStateError = {
        status: "error",
        error,
      };
      setState(errorResult);
      // NOTE: エラーは throw せずに返す
      return errorResult;
    }
  };

  return [state, callBack] as const;
};
