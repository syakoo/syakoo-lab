import { renderHook } from "@testing-library/react";

import { useMountedState } from "./use-mounted-state";

describe("useMountedState", () => {
  it("関数を返す", () => {
    const hook = renderHook(() => useMountedState(), { initialProps: false });

    expect(typeof hook.result.current).toEqual("function");
  });

  it("コンポーネントがマウント時には true を返す", () => {
    const hook = renderHook(() => useMountedState(), { initialProps: false });

    expect(hook.result.current()).toBeTruthy();
  });

  it("コンポーネントがアンマウント時には false を返す", () => {
    const hook = renderHook(() => useMountedState(), { initialProps: false });

    hook.unmount();

    expect(hook.result.current()).toBeFalsy();
  });
});
