import { BrandVariants, makeStyles, Theme } from "@fluentui/react-components";

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

// Scaffolded with https://react.fluentui.dev/?path=/docs/theme-theme-designer--page
// 2024-08-05, key value #00ffff, hue torsion -40, vibrancy 20
export const brandVariants: BrandVariants = {
  10: "#020405",
  20: "#0F1B20",
  30: "#122E36",
  40: "#123B46",
  50: "#104956",
  60: "#0A5766",
  70: "#006676",
  80: "#007585",
  90: "#008494",
  100: "#0094A2",
  110: "#00A4B1",
  120: "#00B4C0",
  130: "#00C4CF",
  140: "#00D5DD",
  150: "#00E6EB",
  160: "#00F7F9",
};

// Custom colors applied for APCA compliance
// https://www.myndex.com/APCA (see below link for SSL issues)
// https://github.com/mark-wiemer/mark-wiemer-com/issues/22
export const brandDarkThemeColors: Partial<Theme> = {
  // link colors customized
  colorBrandForegroundLink: brandVariants[150],
  colorBrandForegroundLinkHover: brandVariants[160],
  colorBrandForegroundLinkPressed: "#ffffff",
  colorNeutralBackground1: "#1f1f1f", // customized
};

export const brandLightThemeColors: Partial<Theme> = {
  colorBrandForegroundLink: brandVariants[70],
  colorBrandForegroundLinkHover: brandVariants[50],
  colorBrandForegroundLinkPressed: "#123B46",
  colorBrandForegroundLinkSelected: "#006676",
  colorNeutralForeground1: "#000000",
};
