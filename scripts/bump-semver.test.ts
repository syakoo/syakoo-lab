import { describe, expect, it } from "vitest";

import { bumpSemver } from "./bump-semver.mjs";

describe("bumpSemver", () => {
  it("bumps patch", () => {
    expect(bumpSemver("1.2.3", "patch")).toBe("1.2.4");
  });

  it("bumps minor and resets patch", () => {
    expect(bumpSemver("1.2.3", "minor")).toBe("1.3.0");
  });

  it("bumps major and resets minor/patch", () => {
    expect(bumpSemver("1.2.3", "major")).toBe("2.0.0");
  });

  it("rejects invalid version", () => {
    expect(() => bumpSemver("1.2", "patch")).toThrow(/invalid version/);
  });

  it("rejects invalid level", () => {
    expect(() =>
      // @ts-expect-error intentional invalid level for runtime guard
      bumpSemver("1.2.3", "foo"),
    ).toThrow(/invalid level/);
  });
});
