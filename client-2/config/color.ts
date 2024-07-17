import { AppTheme } from "./theme";

export type Palette = {
  background: string;
  text: string;
  hover: string;
};

export type ColorKey = "primary" | "secondary";

export type ColorPalette = {
  [key in ColorKey]: Palette;
};

export const LightColor: ColorPalette = {
  primary: {
    background: "bg-blue-400",
    hover: "hover:bg-blue-600",
    text: "text-white",
  },
  secondary: {
    background: "bg-blue-400",
    hover: "bg-blue-500",
    text: "text-white",
  },
};
export const DarkColor: ColorPalette = {
  primary: {
    background: "bg-blue-400",
    hover: "bg-blue-500",
    text: "text-white",
  },
  secondary: {
    background: "bg-blue-400",
    hover: "bg-blue-500",
    text: "text-white",
  },
};

export const getColor = (theme: AppTheme): ColorPalette => {
  switch (theme) {
    case "light":
      return LightColor;
    case "dark":
      return DarkColor;
  }
};
