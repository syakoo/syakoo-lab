/** Unit interval [0, 1), same contract as Math.random. */
export type RandomSource = () => number;

let source: RandomSource = Math.random;

export const getNextFloat = (): number => source();

export const setRandomSource = (next: RandomSource): void => {
  source = next;
};

export const useLiveRandomSource = (): void => {
  source = Math.random;
};
