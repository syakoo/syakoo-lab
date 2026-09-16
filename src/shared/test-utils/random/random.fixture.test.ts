import { afterEach, describe, expect, it } from "vitest";

import { random } from "./random";
import {
  DETERMINISTIC_RANDOM_SEED_GLOBAL_KEY,
  enableDeterministicRandom,
  tryEnableDeterministicRandomFromGlobal,
} from "./random.fixture";
import { useLiveRandomSource } from "./random-source";

describe("enableDeterministicRandom", () => {
  afterEach(() => {
    useLiveRandomSource();
    Reflect.deleteProperty(globalThis, DETERMINISTIC_RANDOM_SEED_GLOBAL_KEY);
  });

  it("replays the same sequence for the same seed", () => {
    enableDeterministicRandom(7);
    const first = [
      random.integer(0, 100),
      random.pickOne(["a", "b", "c"]),
      random.pick([1, 2, 3, 4], 2),
    ];

    enableDeterministicRandom(7);
    const second = [
      random.integer(0, 100),
      random.pickOne(["a", "b", "c"]),
      random.pick([1, 2, 3, 4], 2),
    ];

    expect(second).toEqual(first);
  });

  it("tryEnableDeterministicRandomFromGlobal reads the global seed", () => {
    Reflect.set(globalThis, DETERMINISTIC_RANDOM_SEED_GLOBAL_KEY, 11);
    expect(tryEnableDeterministicRandomFromGlobal()).toBe(true);

    enableDeterministicRandom(11);
    const expected = random.integer(0, 1000);

    Reflect.set(globalThis, DETERMINISTIC_RANDOM_SEED_GLOBAL_KEY, 11);
    tryEnableDeterministicRandomFromGlobal();
    expect(random.integer(0, 1000)).toBe(expected);
  });

  it("tryEnableDeterministicRandomFromGlobal is a no-op without the global", () => {
    expect(tryEnableDeterministicRandomFromGlobal()).toBe(false);
  });

  it("tryEnableDeterministicRandomFromGlobal ignores non-number globals", () => {
    Reflect.set(globalThis, DETERMINISTIC_RANDOM_SEED_GLOBAL_KEY, "11");
    expect(tryEnableDeterministicRandomFromGlobal()).toBe(false);
  });
});
