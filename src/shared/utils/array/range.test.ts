import { range } from "./range";

describe("range", () => {
  describe("正常系", () => {
    test.each<{
      inputs: [number, number] | [number, number, number];
      expected: number[];
    }>([
      {
        inputs: [0, 10],
        expected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
      {
        inputs: [0, 10, 2],
        expected: [0, 2, 4, 6, 8],
      },
      {
        inputs: [10, 0, -1],
        expected: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
      {
        inputs: [0, 0],
        expected: [],
      },
      {
        inputs: [0, 0, -1],
        expected: [],
      },
    ])("$inputs を入力すると $expected が返却される", ({
      inputs,
      expected,
    }) => {
      const [arg1, arg2, ...otherArgs] = inputs;
      const result = range(arg1, arg2, ...otherArgs);

      expect(result).toEqual(expected);
    });
  });
  describe("準正常系", () => {
    test.each<{
      inputs: [number, number, number];
    }>([
      {
        // 0 → 10 に -1 では到達できない
        inputs: [0, 10, -1],
      },
      {
        // 0 → 10 に -1 では到達できない
        inputs: [10, 0, 1],
      },
    ])("$inputs を入力するとエラーが throw される", ({ inputs }) => {
      const [arg1, arg2, ...otherArgs] = inputs;

      expect(() => range(arg1, arg2, ...otherArgs)).toThrowError();
    });
  });
});
