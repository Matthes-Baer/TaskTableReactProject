import { screen } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../utils/test-utils";
import App from "../App";
import CompletedTaskContainer from "../components/CompletedTaskContainer";

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

test("no finished todo tasks at first", async () => {
  renderWithProviders(<CompletedTaskContainer />);
  const Element = screen.getByTestId("to-do-task");
  expect(Element).toThrowError();
});
