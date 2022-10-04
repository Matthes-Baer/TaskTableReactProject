import { Sum, Text } from "../testFunctions/testFunction";

describe("Sum() & Text()", () => {
  test.concurrent("Check for Sum() result", () => {
    expect(Sum(1, 2)).toBeGreaterThan(2);
  });

  test.concurrent("Was Text() called?", () => {
    //! Es wird gecheckt, ob die Callback-Function mit dem passenden argument ausgeführt wurde mittels Spy
    //! Also ob der zweite Paremeter in der eigentlichen Funktion im console.log verwendet wird
    const checker = jest.fn();
    const argument = "Second Argument";
    Text(checker, argument);

    expect(checker).toBeCalledWith(argument);
  });
});
