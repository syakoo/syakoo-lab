import { act, renderHook, waitFor } from "@testing-library/react";

import { useInitAsync } from "./use-init-async";

const makeExampleAsyncFunction = () => {
  let resolve = (value: string) => {
    value;
  };
  let reject = (value: string) => {
    value;
  };
  const promise = new Promise<string>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  return {
    asyncFunction: () => {
      return promise;
    },
    resolve,
    reject,
  };
};

describe("useInitAsync", () => {
  test('初期状態は "loading" であり、データ・エラーは空である', () => {
    const { asyncFunction } = makeExampleAsyncFunction();
    const { result } = renderHook(() => useInitAsync(asyncFunction));

    expect(result.current).toEqual({
      status: "loading",
    });
  });

  test('非同期関数が完了した場合、"success" 状態になりデータを得ることができる', async () => {
    const { asyncFunction, resolve } = makeExampleAsyncFunction();
    const { result } = renderHook(() => useInitAsync(asyncFunction));

    act(() => {
      resolve("test-result");
    });

    await waitFor(() =>
      expect(result.current).toEqual({
        status: "success",
        data: "test-result",
      }),
    );
  });

  test('非同期関数が失敗した場合、"error" 状態になりエラーデータのみ得ることができる', async () => {
    const { asyncFunction, reject } = makeExampleAsyncFunction();
    const { result } = renderHook(() => useInitAsync(asyncFunction));

    act(() => {
      reject("test-error");
    });

    await waitFor(() =>
      expect(result.current).toEqual({
        status: "error",
        error: "test-error",
      }),
    );
  });
});
