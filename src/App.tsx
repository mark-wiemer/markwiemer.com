import {
  FluentProvider,
  makeStyles,
  webDarkTheme,
} from "@fluentui/react-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import About from "./routes/about/About";
import Breakout from "./routes/games/breakout/Breakout";
import Home from "./routes/root/Home";
import { StrictMode } from "react";

const useAppStyles = makeStyles({
  provider: {
    minWidth: "320px",
    maxWidth: "100vw",
    "& div": {
      display: "flex",
      flexDirection: "column",
    },
  },
});

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
      <FluentProvider theme={webDarkTheme} className={styles.provider}>
        <RouterProvider router={router} />
      </FluentProvider>
    </StrictMode>
  );
};

export default App;
