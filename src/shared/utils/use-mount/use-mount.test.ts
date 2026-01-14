import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { useMount } from "./use-mount";

const mockCallback = vi.fn();

afterEach(() => {
  vi.resetAllMocks();
});

describe("useMount", () => {
  it("マウント時に関数が一度だけ呼ばれる", () => {
    renderHook(() => useMount(mockCallback));

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("アンマウント時に関数は実行されない", () => {
    const { unmount } = renderHook(() => useMount(mockCallback));
    expect(mockCallback).toHaveBeenCalledTimes(1);

    unmount();

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("再描画時に関数は実行されない", () => {
    const { rerender } = renderHook(() => useMount(mockCallback));
    expect(mockCallback).toHaveBeenCalledTimes(1);

    rerender();

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
