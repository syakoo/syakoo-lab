/**
 * Python の range みたいなやつ
 *
 * @example
 * range(0, 10)
 * // = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * range(0, 10, 2)
 * // = [0, 2, 4, 6, 8]
 *
 * range(10, 0, -1)
 * // = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
 */
export const range = (start: number, end: number, step = 1): number[] => {
  if ((start < end && step <= 0) || (start > end && step >= 0)) {
    throw new Error(
      `${start} → ${end} に step=${step} では到達できません。入力を確認してください。`,
    );
  }

  const result: number[] = [];
  const symbol = step > 0 ? 1 : -1;
  for (let i = start * symbol; i < end * symbol; i += step * symbol) {
    result.push(i * symbol);
  }

  return result;
};
