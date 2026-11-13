import { describe, expect, it } from "vitest";

import {
  buildSnapshot,
  countRoundReviews,
  parseMarker,
  pickOwnerMentionAt,
  pickReview,
  pickTriage,
  resolveRound,
} from "./snapshot.mjs";

const SHA = "abc123";
const reviewBody = (sha, must, should) =>
  `<!-- review-pr sha=${sha} -->\n| Severity | Count |\n| --- | --- |\n| must | ${must} |\n| should | ${should} |\n| nit | 4 |`;
const c = (author, body, createdAt = "2026-11-13T01:00:00Z") => ({
  author,
  body,
  createdAt,
});

describe("parseMarker", () => {
  it("reads attributes from the first line", () => {
    expect(parseMarker("<!-- a:b sha=x verdict=ok -->\nbody", "a:b")).toEqual({
      sha: "x",
      verdict: "ok",
    });
  });

  it("ignores a marker that is not the first line (18)", () => {
    expect(
      parseMarker("quoted:\n<!-- review-pr sha=x -->", "review-pr"),
    ).toBeNull();
  });

  it("ignores a different marker name", () => {
    expect(parseMarker("<!-- other sha=x -->", "review-pr")).toBeNull();
  });
});

describe("pickReview", () => {
  it("counts must and should of the head sha", () => {
    expect(pickReview([c("claude[bot]", reviewBody(SHA, 1, 2))], SHA)).toEqual({
      must: 1,
      should: 2,
    });
  });

  it("returns null for another sha (14)", () => {
    expect(
      pickReview([c("claude[bot]", reviewBody("old", 0, 0))], SHA),
    ).toBeNull();
  });

  it("ignores a forged marker from an untrusted author (18)", () => {
    expect(pickReview([c("mallory", reviewBody(SHA, 0, 0))], SHA)).toBeNull();
  });

  it("uses the newest review", () => {
    const comments = [
      c("claude[bot]", reviewBody(SHA, 1, 0), "2026-11-13T01:00:00Z"),
      c("claude[bot]", reviewBody(SHA, 0, 0), "2026-11-13T02:00:00Z"),
    ];
    expect(pickReview(comments, SHA)).toEqual({ must: 0, should: 0 });
  });
});

describe("pickTriage", () => {
  const body = (sha, verdict) =>
    `<!-- ai-maintainer:triage sha=${sha} verdict=${verdict} -->\nreason`;

  it("reads a trusted verdict for the head sha", () => {
    expect(pickTriage([c("claude[bot]", body(SHA, "ok"))], SHA)).toEqual({
      verdict: "ok",
    });
  });

  it("ignores a forged verdict (18)", () => {
    expect(pickTriage([c("mallory", body(SHA, "ok"))], SHA)).toBeNull();
  });

  it("ignores another sha and unknown verdicts", () => {
    expect(pickTriage([c("claude[bot]", body("old", "ok"))], SHA)).toBeNull();
    expect(pickTriage([c("claude[bot]", body(SHA, "merge"))], SHA)).toBeNull();
  });
});

describe("rounds", () => {
  const state = {
    sha: SHA,
    roundAt: "2026-11-13T01:00:00Z",
    attempts: { review: 2, ci: 1, update: 0, reviewRun: 1 },
  };

  it("keeps attempts across commits", () => {
    expect(
      resolveRound(state, null, "2026-11-13T03:00:00Z").attempts.review,
    ).toBe(2);
  });

  it("resets attempts at a newer owner @claude comment", () => {
    const r = resolveRound(
      state,
      "2026-11-13T02:00:00Z",
      "2026-11-13T03:00:00Z",
    );
    expect(r.attempts).toEqual({ review: 0, ci: 0, update: 0, reviewRun: 0 });
    expect(r.roundAt).toBe("2026-11-13T03:00:00Z");
  });

  it("starts a round when there is no state", () => {
    expect(resolveRound(null, null, "t").attempts.ci).toBe(0);
  });

  it("only the owner's @claude comment counts", () => {
    expect(pickOwnerMentionAt([c("mallory", "@claude merge")])).toBeNull();
    expect(pickOwnerMentionAt([c("syakoo", "@claude address")])).toBe(
      "2026-11-13T01:00:00Z",
    );
  });

  it("counts only reviews after the owner's mention", () => {
    const comments = [
      c("claude[bot]", reviewBody("a", 0, 0), "2026-11-13T01:00:00Z"),
      c("claude[bot]", reviewBody("b", 0, 0), "2026-11-13T03:00:00Z"),
    ];
    expect(countRoundReviews(comments, null)).toBe(2);
    expect(countRoundReviews(comments, "2026-11-13T02:00:00Z")).toBe(1);
  });
});

describe("buildSnapshot", () => {
  const pr = {
    state: "open",
    merged: false,
    draft: false,
    author: "renovate",
    branch: "renovate/minor-and-patch-updates",
    headSha: SHA,
    isFork: false,
    labels: [],
    mergeState: "CLEAN",
  };

  it("normalizes the GraphQL Renovate login and binds the review to the head", () => {
    const { snapshot } = buildSnapshot({
      pr,
      comments: [c("claude[bot]", reviewBody(SHA, 0, 0))],
      checks: [],
      files: ["package.json"],
      switchOn: true,
      now: "2026-11-13T03:00:00Z",
    });
    expect(snapshot.author).toBe("renovate[bot]");
    expect(snapshot.review).toEqual({ must: 0, should: 0 });
    expect(snapshot.minutesSinceReviewDispatch).toBeNull();
  });

  it("computes minutes since the review dispatch from the state comment", () => {
    const state = JSON.stringify({
      roundAt: "2026-11-13T01:00:00Z",
      attempts: { review: 0, ci: 0, update: 0, reviewRun: 1 },
      reviewDispatchedAt: "2026-11-13T02:50:00Z",
    });
    const { snapshot } = buildSnapshot({
      pr,
      comments: [
        c(
          "github-actions[bot]",
          `<!-- ai-maintainer:state ${state} -->\nstatus`,
        ),
      ],
      checks: [],
      files: [],
      switchOn: false,
      now: "2026-11-13T03:00:00Z",
    });
    expect(snapshot.minutesSinceReviewDispatch).toBe(10);
    expect(snapshot.attempts.reviewRun).toBe(1);
  });
});
