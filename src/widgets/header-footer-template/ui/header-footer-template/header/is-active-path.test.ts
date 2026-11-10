import { isActivePath } from "./is-active-path";

describe("isActivePath", () => {
  it("matches a trailing-slash href against the normalized pathname", () => {
    expect(isActivePath("/writings", "/writings/", false)).toBe(true);
  });

  it("matches nested paths when not exact", () => {
    expect(isActivePath("/writings/20220222", "/writings/", false)).toBe(true);
  });

  it("does not match a path that only shares a prefix", () => {
    expect(isActivePath("/writings-foo", "/writings/", false)).toBe(false);
  });

  it("matches the root only exactly", () => {
    expect(isActivePath("/", "/", true)).toBe(true);
    expect(isActivePath("/writings", "/", true)).toBe(false);
  });

  it("does not match nested paths when exact", () => {
    expect(isActivePath("/writings/20220222", "/writings/", true)).toBe(false);
  });
});
