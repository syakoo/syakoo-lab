import { useMount } from "../use-mount/use-mount";

import type {
  AsyncStateError,
  AsyncStateLoading,
  AsyncStateSuccess,
} from "./_base/types";
import { useBaseAsyncFn } from "./_base/use-base-async-fn";

type AsyncFnBase = () => Promise<unknown>;
type AsyncFnReturn<AsyncFn extends AsyncFnBase> = AsyncFn extends () => Promise<
  infer T
>
  ? T
  : never;

/**
 * useInitAsync におけるステート型
 */
export type InitAsyncState<Data> =
  | AsyncStateLoading<Data>
  | AsyncStateSuccess<Data>
  | AsyncStateError;

/**
 * 引数のない非同期関数を評価しステート型 ({@link InitAsyncState}) にパターン分岐するフック
 *
 * 評価するタイミングはアプリ初期化直後のみである。
 * @example
 * ```tsx
 *   const somethingState = useInitAsync(async () => {
 *     // 何らかの非同期関数
 *     const result = await get(...);
 *     return mapToViewModel(result);
 *   });
 *
 *   return (
 *     <div>
 *       <div>
 *         {somethingState.status === 'loading' ? (
 *           <div>ロード中...</div>
 *         ) : somethingState.status === 'error' ? (
 *           <div>エラーが発生しました: {somethingState.error}</div>
 *         ) : somethingState.status === 'success' ? (
 *           <div>取得成功: {somethingState.data}</div>
 *         ) : null}
 *       </div>
 *     </div>
 *   )
 * ```
 */
export const useInitAsync = <AsyncFn extends AsyncFnBase>(asyncFn: AsyncFn) => {
  const [state, callback] = useBaseAsyncFn(asyncFn, {
    // NOTE: 最初からロード状態とする
    status: "loading",
  }) as [
    InitAsyncState<AsyncFnReturn<AsyncFn>>,
    () => Promise<AsyncStateSuccess<AsyncFnReturn<AsyncFn>> | AsyncStateError>,
  ];

  useMount(() => {
    void callback();
  });

  return state;
};
