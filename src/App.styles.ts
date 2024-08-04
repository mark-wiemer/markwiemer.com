import { makeStyles } from "@fluentui/react-components";

const useAppStyles = makeStyles({
  provider: {
    // support 320px + 20px scrollbar
    // scrollbar width varies by user agent
    minWidth: "300px",
    maxWidth: "100vw",
    "& div": {
      display: "flex",
      flexDirection: "column",
    },
    fontSize: "18px",
    lineHeight: "1.5",
    "& h1": {
      fontSize: "3em",
    },
  },
  article: {
    padding: "2rem",
    maxWidth: "640px",
    textAlign: "left",
    "@media (max-width: 640px)": {
      padding: "4px",
      maxWidth: "calc(100vw - 24px)",
    },
  },
});

export default useAppStyles;
