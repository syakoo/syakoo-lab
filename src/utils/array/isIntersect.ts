/**
 * 任意の二つの配列が同じ値を持つかどうかのチェック関数
 *
 * - complexity: O(|`array1`| |`array2`|)
 */
export const isIntersect = (array1: unknown[], array2: unknown[]): boolean => {
  return array1.some((value) => array2.includes(value));
};
