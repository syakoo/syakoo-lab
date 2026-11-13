import { describe, expect, it } from "vitest";

import { isFinal } from "./sweep.mjs";

const state = {
  sha: "abc",
  decision: "human",
  switchOn: false,
  roundAt: "2026-01-02T00:00:00Z",
};
const base = { state, headSha: "abc", ownerMentionAt: null, switchOn: false };

describe("isFinal", () => {
  it("is final for human on the same sha and switch", () => {
    expect(isFinal(base)).toBe(true);
  });
  it("is not final without a state comment", () => {
    expect(isFinal({ ...base, state: null })).toBe(false);
  });
  it("is not final after a push", () => {
    expect(isFinal({ ...base, headSha: "def" })).toBe(false);
  });
  it("is not final for wait, review, triage or merge decisions", () => {
    for (const decision of ["wait", "review", "triage", "merge"]) {
      expect(isFinal({ ...base, state: { ...state, decision } })).toBe(false);
    }
  });
  it("is not final when the switch changed", () => {
    expect(isFinal({ ...base, switchOn: true })).toBe(false);
  });
  it("is not final after a newer owner @claude comment", () => {
    expect(isFinal({ ...base, ownerMentionAt: "2026-01-03T00:00:00Z" })).toBe(
      false,
    );
  });
  it("stays final for an owner comment older than the round", () => {
    expect(isFinal({ ...base, ownerMentionAt: "2026-01-01T00:00:00Z" })).toBe(
      true,
    );
  });
});
