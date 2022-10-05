import { fireEvent, screen } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../utils/test-utils";
import App from "../App";
import CompletedTaskContainer from "../components/CompletedTaskContainer";
import TasksLeftSide from "../components/TasksLeftSide";

// const testResponseData = { testKey: "testDat" };

// const fetchTest = jest.fn((url, options) => {
//   return new Promise((resolve, reject) => {
//     const testResponse = {
//       ok: true,
//       json() {
//         return new Promise((resolve, reject) => {
//           resolve(testResponseData);
//         });
//       },
//     };
//     resolve(testResponse);
//   });
// });

test("App component renders", async () => {
  renderWithProviders(<App />);
});

test("element with 'finished tasks' text exists", async () => {
  renderWithProviders(<CompletedTaskContainer />);
  const Element = screen.getByText(/Finished Tasks/i);
  expect(Element).toBeInTheDocument();
});

test("include 1 h2 heading", async () => {
  renderWithProviders(<CompletedTaskContainer />);
  const Element = screen.getAllByRole("heading", { level: 2 });
  expect(Element).toHaveLength(1);
});

test("able to change title and comment state dynamically", async () => {
  renderWithProviders(<TasksLeftSide />);
  const titleInput = screen.getByTestId("titleInput");
  const commentInput = screen.getByTestId("commentInput");

  const testValue = "testValue";
  fireEvent.change(titleInput, { target: { value: testValue } });
  fireEvent.change(commentInput, { target: { value: testValue } });
});

// test('promise Test', () => {
//   expect(fetchTest({ key: 'test' })).resolves().toEqual(testResponseData);
// })
