import { fireEvent, screen } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../utils/test-utils";
import App from "../App";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint

test("Render App Component", async () => {
  renderWithProviders(<App />);
});
