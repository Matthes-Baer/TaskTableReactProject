// app.test.js
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";

import App from "../App";
import {
  BrowserRouter,
  Link,
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import HomeRoute from "../Routes/home";
import ErrorPage from "../Routes/ErrorPage";
import { act } from "react-dom/test-utils";

const Container = () => {
  return (
    <BrowserRouter>
      <Link to="/somethingTHere">Something</Link>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomeRoute />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

beforeEach(() => {
  console.log("beforeEach() function");
});

//! .concurrent führt hier zum Error, weil dann zweimal der Container gerendered wird und die Ergebnisse doppelt gefunden werden

describe("React Router logic with Mockup", () => {
  test("full app rendering/navigating", async () => {
    renderWithProviders(<Container />);
    // verify page content for default route
    expect(screen.getByText(/Task Tour/i)).toBeInTheDocument();

    // verify page content for expected route after navigating - Ich habe keine anklickbaren Links, weshalb einer simuliert wird
    await fireEvent.click(screen.getByText(/Something/i));
    expect(screen.getByText(/Back home/i)).toBeInTheDocument();
  });

  test("landing on a bad page", () => {
    const badRoute = "/some/bad/route";

    // use <MemoryRouter> when you want to manually control the history
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <Link to="/somethingTHere">Something</Link>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<HomeRoute />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // verify navigation to "404 - Error Page"" route
    expect(screen.getByText(/Back home/i)).toBeInTheDocument();
  });
});

// test("rendering a component that uses useLocation", () => {
//   const route = "/some-route";

//   // use <MemoryRouter> when you want to manually control the history
//   render(
//     <MemoryRouter initialEntries={[route]}>
//       <LocationDisplay />
//     </MemoryRouter>
//   );

// verify location display is rendered
//   expect(screen.getByTestId("location-display")).toHaveTextContent(route);
// });
