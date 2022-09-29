import {
  findByTestId,
  fireEvent,
  getByTestId,
  screen,
  waitFor,
} from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../utils/test-utils";
import App from "../App";
import CompletedTaskContainer from "../components/CompletedTaskContainer";
import TasksLeftSide from "../components/TasksLeftSide";
import TodoTaskContainer from "../components/TodoTaskContainer";

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

test("wait for appearance", async () => {
  renderWithProviders(<TodoTaskContainer />);
  await waitFor(() => {
    expect(screen.getByTestId("to-do-task")).toBeInTheDocument();
  });
});
