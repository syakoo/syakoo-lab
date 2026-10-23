import { describe, expect, it, vi } from "vitest";

vi.mock("../../../env", () => ({
  env: { WAKU_PUBLIC_GOOGLE_ANALYTICS_ID: "G-TEST" },
}));

const { buildPageUrl } = await import("./core");

describe("buildPageUrl", () => {
  it("returns only the pathname when there are no search params", () => {
    expect(buildPageUrl("/writing", "")).toBe("/writing");
  });

  it("joins the pathname and search params with ?", () => {
    expect(buildPageUrl("/writing", "page=2")).toBe("/writing?page=2");
  });
});
