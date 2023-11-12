import { act, renderHook } from "@testing-library/react";

import { useAsyncFn } from "./useAsyncFn";

const makeExampleAsyncFunction = () => {
  let resolve = (value: string) => {
    value;
  };
  let reject = (value: unknown) => {
    value;
  };
  const promise = new Promise<string>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  return {
    asyncFunction: () => promise,
    resolve,
    reject,
  };
};

describe("useAsyncFn", () => {
  test('初期状態は "idle" であり、データ・エラーは空である', () => {
    const { asyncFunction } = makeExampleAsyncFunction();
    const { result } = renderHook(() => useAsyncFn(asyncFunction, []));

    expect(result.current[0]).toEqual({
      status: "idle",
    });
  });

  test('関数を実行すると、"loading" 状態になる', () => {
    const { asyncFunction } = makeExampleAsyncFunction();
    const { result } = renderHook(() => useAsyncFn(asyncFunction, []));

    act(() => {
      void result.current[1]();
    });

    expect(result.current[0]).toEqual({
      status: "loading",
    });
  });

  test('関数を実行して完了した場合、"success" 状態になりデータを得ることができる', async () => {
    const { asyncFunction, resolve } = makeExampleAsyncFunction();
    const { result } = renderHook(() => useAsyncFn(asyncFunction, []));

    await act(async () => {
      const promise = result.current[1]();
      resolve("test-result");
      const promiseResult = await promise;

      expect(promiseResult).toEqual({ status: "success", data: "test-result" });
    });

    expect(result.current[0]).toEqual({
      status: "success",
      data: "test-result",
    });
  });

  test('関数を実行して失敗した場合、"error" 状態になりエラーデータのみ得ることができる', async () => {
    const { asyncFunction, reject } = makeExampleAsyncFunction();
    const { result } = renderHook(() => useAsyncFn(asyncFunction, []));

    await act(async () => {
      const promise = result.current[1]();
      reject("test-error");
      const promiseResult = await promise;

      expect(promiseResult).toEqual({
        status: "error",
        error: "test-error",
      });
    });

    expect(result.current[0]).toEqual({
      status: "error",
      error: "test-error",
    });
  });
});
