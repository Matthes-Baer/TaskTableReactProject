import ActiveTodosSlice, {
  addActiveTodo,
  removeActiveTodo,
} from "../features/ActiveTodosSlice";

interface activeTodoInterface {
  id: string;
  title: string;
  badges?: { name: string; checked: boolean }[];
  comment?: string;
  time: number;
}

let todoTask: activeTodoInterface = {
  id: "1",
  title: "todoTask",
  badges: [
    { name: "important", checked: true },
    { name: "longterm", checked: false },
  ],
  comment: "this is something important",
  time: 9000,
};

describe("active todos reducer", () => {
  const initialState = {
    value: [],
  };

  it("should handle initial state", () => {
    expect(ActiveTodosSlice(undefined, { type: "unknown" })).toEqual({
      value: [],
    });
  });

  it("should handle addActiveTodo", () => {
    const actual = ActiveTodosSlice(initialState, addActiveTodo(todoTask));
    expect(actual.value).toEqual([todoTask]);
  });

  //   it("should handle decrement", () => {
  //     const actual = counterReducer(initialState, decrement());
  //     expect(actual.value).toEqual(2);
  //   });

  //   it("should handle incrementByAmount", () => {
  //     const actual = counterReducer(initialState, incrementByAmount(2));
  //     expect(actual.value).toEqual(5);
  //   });
});
