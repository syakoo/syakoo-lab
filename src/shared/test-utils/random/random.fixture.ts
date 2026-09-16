import { z } from "zod";

import { setRandomSource } from "./random-source";

/** Default seed when enabling deterministic mode without an explicit value. */
export const DEFAULT_DETERMINISTIC_RANDOM_SEED = 42;

/** globalThis key used to request deterministic mode from outside this module. */
export const DETERMINISTIC_RANDOM_SEED_GLOBAL_KEY =
  "__SYAKOO_DETERMINISTIC_RANDOM_SEED__";

const deterministicRandomSeedSchema = z.number();

/**
 * Mulberry32 — small deterministic PRNG. Same seed ⇒ same sequence.
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md
 */
const mulberry32 = (seed: number): (() => number) => {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/**
 * Switch `random` helpers to a seeded PRNG in the current JS realm.
 * Calling again with the same (or another) seed restarts the sequence.
 */
export const enableDeterministicRandom = (
  seed: number = DEFAULT_DETERMINISTIC_RANDOM_SEED,
): void => {
  setRandomSource(mulberry32(seed));
};

/**
 * If `globalThis` carries a seed under {@link DETERMINISTIC_RANDOM_SEED_GLOBAL_KEY},
 * enable deterministic random with that seed.
 * @returns whether deterministic mode was enabled
 */
export const tryEnableDeterministicRandomFromGlobal = (): boolean => {
  const parsed = deterministicRandomSeedSchema.safeParse(
    Reflect.get(globalThis, DETERMINISTIC_RANDOM_SEED_GLOBAL_KEY),
  );
  if (!parsed.success) {
    return false;
  }
  enableDeterministicRandom(parsed.data);
  return true;
};
