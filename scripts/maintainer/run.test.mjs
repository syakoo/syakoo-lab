import { describe, expect, it } from "vitest";

import { plan } from "./run.mjs";

const repo = "syakoo/syakoo-lab";
const base = {
  n: 7,
  repo,
  raw: { pr: { labels: [], headSha: "abc1234", branch: "claude/x" } },
  prior: null,
  state: {
    sha: "abc1234",
    decision: "wait",
    reason: "r",
    switchOn: true,
    attempts: { review: 0, ci: 0, update: 0, reviewRun: 0 },
  },
};
const priorOf = (over = {}) => ({
  comment: { id: 99 },
  state: { ...base.state, ...over },
});
const types = (o) => plan({ ...base, ...o }).map((a) => a.type);

describe("plan", () => {
  it("does nothing for an unchanged wait", () => {
    expect(
      types({ decision: { kind: "wait", reason: "r" }, prior: priorOf() }),
    ).toEqual([]);
  });

  it("labels and posts a status comment for a first human decision", () => {
    const state = { ...base.state, decision: "human" };
    expect(types({ decision: { kind: "human", reason: "r" }, state })).toEqual([
      "addLabel",
      "postComment",
    ]);
  });

  it("skips the label when the switch is off (label: false)", () => {
    const state = { ...base.state, decision: "human" };
    expect(
      types({ decision: { kind: "human", reason: "r", label: false }, state }),
    ).toEqual(["postComment"]);
  });

  it("does not re-label a PR that already has the label on the same head", () => {
    const raw = { pr: { ...base.raw.pr, labels: ["needs-human"] } };
    const state = { ...base.state, decision: "human" };
    expect(
      types({
        raw,
        state,
        decision: { kind: "human", reason: "r" },
        prior: priorOf({ decision: "human" }),
      }),
    ).toEqual([]);
  });

  it("clears the label on a new head, then labels again if still human", () => {
    const raw = { pr: { ...base.raw.pr, labels: ["needs-human"] } };
    const state = { ...base.state, decision: "human" };
    expect(
      types({
        raw,
        state,
        decision: { kind: "human", reason: "r" },
        prior: priorOf({ sha: "old", decision: "human" }),
      }),
    ).toEqual(["removeLabel", "addLabel", "patchComment"]);
  });

  it("clears the label when the decision is no longer human", () => {
    const raw = { pr: { ...base.raw.pr, labels: ["needs-human"] } };
    expect(
      types({
        raw,
        decision: { kind: "wait", reason: "r" },
        prior: priorOf({ decision: "human" }),
      })[0],
    ).toBe("removeLabel");
  });

  it("edits the existing status comment instead of posting a new one", () => {
    const [a] = plan({
      ...base,
      decision: { kind: "review", reason: "r" },
      state: { ...base.state, decision: "review" },
      prior: priorOf(),
    });
    expect(a).toMatchObject({ type: "patchComment", id: 99 });
  });

  it("merges pinned to the judged head sha", () => {
    const actions = plan({
      ...base,
      decision: { kind: "merge", reason: "r" },
      state: { ...base.state, decision: "merge" },
    });
    expect(actions.at(-1)).toEqual({
      type: "merge",
      n: 7,
      repo,
      sha: "abc1234",
    });
  });

  it("writes the triage payload and dispatches a review", () => {
    expect(
      plan({
        ...base,
        decision: { kind: "triage", triageKind: "ci", reason: "r" },
        state: { ...base.state, decision: "triage" },
      }).find((a) => a.type === "writeTriage").payload,
    ).toEqual({ pr: 7, kind: "ci", sha: "abc1234", branch: "claude/x" });
    expect(
      types({
        decision: { kind: "review", reason: "r" },
        state: { ...base.state, decision: "review" },
      }).at(-1),
    ).toBe("dispatchReview");
  });
});
