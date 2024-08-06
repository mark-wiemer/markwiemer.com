import { FluentProvider, webDarkTheme } from "@fluentui/react-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import About from "./routes/about/About";
import Breakout from "./routes/games/breakout/Breakout";
import Home from "./routes/home/Home";
import { StrictMode } from "react";
import useAppStyles, { brandDarkThemeColors } from "./App.styles";

const App = () => {
  const styles = useAppStyles();

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
        theme={{ ...webDarkTheme, ...brandDarkThemeColors }}
        className={styles.provider}
      >
        <RouterProvider router={router} />
      </FluentProvider>
    </StrictMode>
  );
};

export default App;
