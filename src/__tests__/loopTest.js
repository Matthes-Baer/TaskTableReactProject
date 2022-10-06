let loopNumbers = [
  [1, 2, 3],
  [4, 4, 8],
  [2, 5, 7],
];

//! Loop Example for tests
test.each(loopNumbers)("somethingTest", (a, b, total) => {
  expect(a + b).toBe(total);
});
