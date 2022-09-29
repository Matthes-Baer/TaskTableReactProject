import { screen } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../utils/test-utils";
import App from "../App";
import CompletedTaskContainer from "../components/CompletedTaskContainer";

test("Render App Component", async () => {
  renderWithProviders(<App />);
});

test("render CompletedTaskContainer", async () => {
  renderWithProviders(<CompletedTaskContainer />);
  const Element = screen.getByText(/Finished Tasks/i);
  expect(Element).toBeInTheDocument();
});
