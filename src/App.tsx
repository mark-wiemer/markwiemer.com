import {
  createDarkTheme,
  createLightTheme,
  FluentProvider,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import About from "./routes/about/About";
import Breakout from "./routes/games/breakout/Breakout";
import Home from "./routes/home/Home";
import { StrictMode, useEffect, useMemo, useState } from "react";
import useAppStyles, {
  brandDarkThemeColors,
  brandLightThemeColors,
  brandVariants,
} from "./App.styles";

const App = () => {
  const styles = useAppStyles();
  const [useDarkTheme, setUseDarkTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const darkTheme = useMemo(
    () => ({
      ...webDarkTheme,
      ...createDarkTheme(brandVariants),
      ...brandDarkThemeColors,
    }),
    []
  );
  const lightTheme = useMemo(
    () => ({
      ...webLightTheme,
      ...createLightTheme(brandVariants),
      ...brandLightThemeColors,
    }),
    []
  );

  useEffect(() => {
    document.body.style.backgroundColor = useDarkTheme ? "#1f1f1f" : "#ffffff";
  }, [useDarkTheme]);

  // Run on mount only: check for dark mode preference
  useEffect(() => {
    // Get current state
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkMode.matches) setUseDarkTheme(true);
    else setUseDarkTheme(false);

    // Listen for future changes
    prefersDarkMode.addEventListener("change", (e) => {
      if (e.matches) setUseDarkTheme(true);
      else setUseDarkTheme(false);
    });
    return () => {
      prefersDarkMode.removeEventListener("change", () => {
        /* no-op */
      });
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/about",
      element: <About />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/games/breakout",
      element: <Breakout />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <StrictMode>
      <FluentProvider
        theme={useDarkTheme ? darkTheme : lightTheme}
        className={styles.provider}
      >
        <RouterProvider router={router} />
      </FluentProvider>
    </StrictMode>
  );
};

export default App;
