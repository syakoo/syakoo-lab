import type { DependencyList } from "react";
import { useCallback } from "react";

import type {
  AsyncStateError,
  AsyncStateIdle,
  AsyncStateLoading,
  AsyncStateSuccess,
} from "./_base/types";
import { useBaseAsyncFn } from "./_base/useBaseAsyncFn";

type AsyncFnBase = (...args: unknown[]) => Promise<unknown>;
type AsyncFnReturn<AsyncFn extends AsyncFnBase> = AsyncFn extends (
  ...args: unknown[]
) => Promise<infer T>
  ? T
  : never;

/**
 * useAsyncFn におけるステート型
 */
export type AsyncFnState<Data> =
  | AsyncStateIdle
  | AsyncStateLoading<Data>
  | AsyncStateSuccess<Data>
  | AsyncStateError;

/**
 * 非同期関数をラップしステート型 ({@link AsyncFnState}) にパターン分岐するフック
 *
 * @example
 * ```tsx
 *   const [somethingState, updateSomething] = useAsyncFn(async () => {
 *     // 何らかの非同期関数
 *     const result = await post(...);
 *     return mapToViewModel(result);
 *   }, []);
 *
 *   return (
 *     <div>
 *       <button onClick={updateSomething}>更新</button>
 *       <div>
 *         {somethingState.status === 'loading' ? (
 *           <div>ロード中...</div>
 *         ) : somethingState.status === 'error' ? (
 *           <div>エラーが発生しました: {somethingState.error}</div>
 *         ) : somethingState.status === 'success' ? (
 *           <div>更新成功: {somethingState.data}</div>
 *         ) : null}
 *       </div>
 *     </div>
 *   )
 * ```
 */
export const useAsyncFn = <AsyncFn extends AsyncFnBase>(
  asyncFn: AsyncFn,
  deps: DependencyList,
  initialState: AsyncFnState<AsyncFnReturn<AsyncFn>> = { status: "idle" },
) => {
  const [state, callback] = useBaseAsyncFn(asyncFn, initialState);

  // NOTE: asyncFn のラッパー関数であるため asyncFn の deps を入れる
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memorizedCallback = useCallback(callback, [...deps]);

  return [state, memorizedCallback] as const;
};
