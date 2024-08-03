import {
  BrandVariants,
  createDarkTheme,
  FluentProvider,
  makeStyles,
  Theme,
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

// https://react.fluentui.dev/?path=/docs/theme-theme-designer--page
// 2024-08-03
// Key color value: #A016BB
// Hue torsion: -31
// Vibrancy: 12
const plumBrandVariants: BrandVariants = {
  10: "#060105",
  20: "#270D24",
  30: "#430E40",
  40: "#580C59",
  50: "#6E0873",
  60: "#82058F",
  70: "#9608AB",
  80: "#A422C1",
  90: "#AC3FCD",
  100: "#B457D7",
  110: "#BB6DDF",
  120: "#C382E7",
  130: "#CB96ED",
  140: "#D3A9F2",
  150: "#DBBCF7",
  160: "#E5CFFA",
};

const plumDarkTheme: Theme = {
  ...createDarkTheme(plumBrandVariants),
};

plumDarkTheme.colorBrandForeground1 = plumBrandVariants[110];
plumDarkTheme.colorBrandForeground2 = plumBrandVariants[120];

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
      <FluentProvider theme={plumDarkTheme} className={styles.provider}>
        <RouterProvider router={router} />
      </FluentProvider>
    </StrictMode>
  );
};

export default App;
