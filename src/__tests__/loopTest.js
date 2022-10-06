let loopNumbers = [
  [1, 2, 3],
  [4, 4, 8],
  [2, 5, 7],
];

//! Loop Example for tests with %i
test.each(loopNumbers)("add %i to %i should be %i", (a, b, total) => {
  expect(a + b).toBe(total);
});
