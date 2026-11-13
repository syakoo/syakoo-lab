import { describe, expect, it } from "vitest";

import { decide } from "./decide.mjs";

const green = { name: "ci / test", status: "completed", conclusion: "success" };
const reviewDone = {
  name: "Claude Review / review",
  status: "completed",
  conclusion: "success",
};

/** A PR that merges: the owner's, patch, green, reviewed, switch on. */
function snap(overrides = {}) {
  return {
    prState: "open",
    author: "syakoo",
    isFork: false,
    base: "main",
    draft: false,
    branch: "claude/feature",
    labels: ["semver:patch"],
    files: ["src/a.ts"],
    mergeState: "CLEAN",
    checks: [green, reviewDone],
    review: { must: 0, should: 0 },
    triage: null,
    attempts: { review: 0, ci: 0, update: 0, reviewRun: 0 },
    minutesSinceReviewDispatch: null,
    reviewCount: 1,
    switchOn: true,
    ...overrides,
  };
}

const renovate = (overrides = {}) =>
  snap({
    author: "renovate[bot]",
    branch: "renovate/minor-and-patch-updates",
    labels: ["dependencies"],
    ...overrides,
  });

describe("decide", () => {
  it("merges a clean owner patch PR (3)", () => {
    expect(decide(snap()).kind).toBe("merge");
  });

  it.each([
    ["draft (2)", { draft: true }],
    ["fork", { isFork: true }],
    ["merged (15)", { prState: "merged" }],
    ["closed (15)", { prState: "closed" }],
  ])("ignores %s", (_name, o) => {
    expect(decide(snap(o)).kind).toBe("ignore");
  });

  it("waits while a check is pending (4)", () => {
    const d = decide(
      snap({
        checks: [
          { name: "ci", status: "in_progress", conclusion: null },
          reviewDone,
        ],
      }),
    );
    expect(d.kind).toBe("wait");
  });

  it("ignores external deploy-preview checks, pending or failed", () => {
    for (const cf of [
      { name: "Cloudflare Pages: x", status: "in_progress", conclusion: null },
      {
        name: "Cloudflare Pages: x",
        status: "completed",
        conclusion: "failure",
      },
    ]) {
      expect(decide(snap({ checks: [green, reviewDone, cf] })).kind).toBe(
        "merge",
      );
    }
  });

  it("sends semver:minor to the owner (5)", () => {
    const d = decide(snap({ labels: ["semver:minor"] }));
    expect(d).toMatchObject({
      kind: "human",
      reason: "semver:minor needs the owner",
    });
  });

  it("requires exactly one semver label", () => {
    expect(decide(snap({ labels: [] })).kind).toBe("human");
    expect(
      decide(snap({ labels: ["semver:patch", "semver:minor"] })).kind,
    ).toBe("human");
  });

  it.each([
    ".github/workflows/ci.yml",
    ".claude/rules/x.md",
    ".githooks/pre-commit",
    "CLAUDE.md",
  ])("sends a change to %s to a human (6, 13)", (path) => {
    const d = decide(snap({ files: ["src/a.ts", path] }));
    expect(d.kind).toBe("human");
    expect(d.reason).toContain("protected path");
  });

  it("sends other authors to a human", () => {
    expect(decide(snap({ author: "someone" })).kind).toBe("human");
  });

  describe("review findings", () => {
    it("triages must findings (7)", () => {
      expect(decide(snap({ review: { must: 1, should: 0 } }))).toMatchObject({
        kind: "triage",
        triageKind: "review",
      });
    });

    it("triages should findings without a verdict", () => {
      expect(decide(snap({ review: { must: 0, should: 2 } })).kind).toBe(
        "triage",
      );
    });

    it("lets should findings pass after verdict ok (8)", () => {
      const d = decide(
        snap({ review: { must: 0, should: 2 }, triage: { verdict: "ok" } }),
      );
      expect(d.kind).toBe("merge");
    });

    it("verdict ok never clears a must", () => {
      const d = decide(
        snap({ review: { must: 1, should: 0 }, triage: { verdict: "ok" } }),
      );
      expect(d.kind).toBe("triage");
    });

    it("verdict ok never clears red CI", () => {
      const d = decide(
        snap({
          checks: [{ ...green, conclusion: "failure" }, reviewDone],
          triage: { verdict: "ok" },
        }),
      );
      expect(d).toMatchObject({ kind: "triage", triageKind: "ci" });
    });

    it("stops for a human after the attempts are used (9)", () => {
      const d = decide(
        snap({
          review: { must: 1, should: 0 },
          attempts: { review: 2, ci: 0, update: 0, reviewRun: 0 },
        }),
      );
      expect(d.kind).toBe("human");
      expect(d.reason).toContain("fix attempts used");
    });

    it("stops for a human on a triage human verdict (10)", () => {
      const d = decide(
        snap({ review: { must: 1, should: 0 }, triage: { verdict: "human" } }),
      );
      expect(d.kind).toBe("human");
    });
  });

  describe("Renovate", () => {
    it("merges the minor-and-patch group when clean (11)", () => {
      expect(decide(renovate()).kind).toBe("merge");
    });

    it("triages red CI on a Renovate PR (11)", () => {
      const d = decide(
        renovate({ checks: [{ ...green, conclusion: "failure" }, reviewDone] }),
      );
      expect(d).toMatchObject({ kind: "triage", triageKind: "ci" });
    });

    it("sends other Renovate branches to a human (12)", () => {
      const d = decide(renovate({ branch: "renovate/major-react" }));
      expect(d).toMatchObject({
        kind: "human",
        reason: "major update: summary only",
      });
    });

    it("still fixes CI on a major update", () => {
      const d = decide(
        renovate({
          branch: "renovate/major-react",
          checks: [{ ...green, conclusion: "failure" }, reviewDone],
        }),
      );
      expect(d.kind).toBe("triage");
    });

    it("accepts the GraphQL login without [bot]", () => {
      expect(decide(renovate({ author: "renovate" })).kind).toBe("merge");
    });

    it("sends Actions updates to a human (protected path)", () => {
      expect(
        decide(renovate({ files: [".github/workflows/ci.yml"] })).kind,
      ).toBe("human");
    });
  });

  describe("branch state (17)", () => {
    it.each(["DIRTY", "BEHIND"])("updates a %s branch once", (mergeState) => {
      expect(decide(snap({ mergeState }))).toMatchObject({
        kind: "triage",
        triageKind: "update",
      });
    });

    it("stops after one update", () => {
      const d = decide(
        snap({
          mergeState: "DIRTY",
          attempts: { review: 0, ci: 0, update: 1, reviewRun: 0 },
        }),
      );
      expect(d.kind).toBe("human");
    });

    it.each(["BLOCKED", "UNSTABLE", "UNKNOWN"])("waits on %s", (mergeState) => {
      expect(decide(snap({ mergeState })).kind).toBe("wait");
    });
  });

  describe("missing review (21, 22)", () => {
    const noReview = { review: null, checks: [green] };

    it("requests a review for a head without one (22)", () => {
      expect(decide(snap(noReview)).kind).toBe("review");
    });

    it("waits right after requesting", () => {
      expect(
        decide(snap({ ...noReview, minutesSinceReviewDispatch: 3 })).kind,
      ).toBe("wait");
    });

    it("asks again after 15 minutes, then stops", () => {
      expect(
        decide(snap({ ...noReview, minutesSinceReviewDispatch: 16 })).kind,
      ).toBe("review");
      const d = decide(
        snap({
          ...noReview,
          minutesSinceReviewDispatch: 16,
          attempts: { review: 0, ci: 0, update: 0, reviewRun: 2 },
        }),
      );
      expect(d).toMatchObject({ kind: "human", reason: "review missing" });
    });

    it("caps reviews per round at 3", () => {
      expect(decide(snap({ ...noReview, reviewCount: 3 })).kind).toBe("human");
    });

    it("sends a failed review run to a human (21)", () => {
      const d = decide(
        snap({
          review: null,
          checks: [green, { ...reviewDone, conclusion: "failure" }],
        }),
      );
      expect(d).toMatchObject({ kind: "human", reason: "review run failed" });
    });
  });

  describe("kill switch (19)", () => {
    const off = { switchOn: false };

    it("does not merge, and does not label", () => {
      expect(decide(snap(off))).toMatchObject({ kind: "human", label: false });
    });

    it("never triages or reviews", () => {
      expect(
        decide(snap({ ...off, review: { must: 1, should: 0 } })).kind,
      ).toBe("human");
      expect(decide(snap({ ...off, review: null, checks: [green] })).kind).toBe(
        "human",
      );
      expect(decide(snap({ ...off, mergeState: "BEHIND" })).kind).toBe("human");
      expect(
        decide(
          snap({
            ...off,
            checks: [{ ...green, conclusion: "failure" }, reviewDone],
          }),
        ).kind,
      ).toBe("human");
    });
  });

  it("does not merge unless the state is CLEAN (19)", () => {
    expect(decide(snap({ mergeState: "BLOCKED" })).kind).not.toBe("merge");
  });
});

describe("review reading and base branch", () => {
  it("sends an unreadable review to a human", () => {
    expect(
      decide(snap({ review: { must: 0, should: 0, malformed: true } })),
    ).toMatchObject({ kind: "human", reason: "review could not be read" });
  });

  it("sends a PR whose base is not main to a human", () => {
    expect(decide(snap({ base: "feature/stack" })).kind).toBe("human");
  });

  it("ignores a cancelled review check when a review of the head exists", () => {
    const cancelled = {
      name: "Claude Review",
      status: "completed",
      conclusion: "cancelled",
    };
    expect(decide(snap({ checks: [green, cancelled] })).kind).toBe("merge");
  });

  it("waits, not human, when a cancelled review check has a sibling still running", () => {
    const cancelled = {
      name: "Claude Review",
      status: "completed",
      conclusion: "cancelled",
    };
    const running = {
      name: "Claude Review",
      status: "in_progress",
      conclusion: null,
    };
    expect(
      decide(snap({ review: null, checks: [green, cancelled, running] })).kind,
    ).toBe("wait");
  });
});
