import { makeStyles, shorthands } from "@fluentui/react-components";

export const useHomeStyles = makeStyles({
  container: {
    maxWidth: "1280px",
    padding: "2rem",
    textAlign: "center",
    "& p": {
      fontSize: "18px",
    },
  },
  logo: {
    height: "6em",
    padding: "1.5em",
    ...shorthands.transition("filter", "300ms"),
  },
  viteLogo: {
    ":hover": {
      filter: "drop-shadow(0 0 2em #646cffaa)",
    },
  },
  reactLogo: {
    ":hover": {
      filter: "drop-shadow(0 0 2em #61dafbaa)",
    },
    "@media (prefers-reduced-motion: no-preference)": {
      animationIterationCount: "infinite",
      animationDuration: "20s",
      animationName: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
      animationTimingFunction: "linear",
    },
  },
  card: {
    padding: "2em",
  },
  pTag: {
    display: "block",
  },
});
