import { isIntersect } from "./is-intersect";

describe("isIntersect", () => {
  type Case = {
    array1: unknown[];
    array2: unknown[];
  };

  test.each<Case>([
    {
      array1: ["1"],
      array2: ["1"],
    },
    {
      array1: ["2"],
      array2: ["1", "2", "3"],
    },
    {
      array1: ["1", "2", "3"],
      array2: ["2"],
    },
    {
      array1: ["4", "8", "12"],
      array2: ["1", "2", "3", "5", "8"],
    },
  ])("$array1 ∩ $array2 /= φ", ({ array1, array2 }) => {
    expect(isIntersect(array1, array2)).toBeTruthy();
  });

  test.each<Case>([
    {
      array1: ["1", "3", "5"],
      array2: ["2", "4", "6"],
    },
    {
      array1: ["1"],
      array2: [1],
    },
    {
      array1: [],
      array2: [1],
    },
    {
      array1: ["1"],
      array2: [],
    },
    {
      array1: [],
      array2: [],
    },
  ])("$array1 ∩ $array2 = φ", ({ array1, array2 }) => {
    expect(isIntersect(array1, array2)).toBeFalsy();
  });
});
