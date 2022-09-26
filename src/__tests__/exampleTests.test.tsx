import Sum from "../testFunctions/testFunction";

describe("sum", () => {
  test("sums up to two values", () => {
    expect(Sum(1, 2)).toBe(3);
  });
});
