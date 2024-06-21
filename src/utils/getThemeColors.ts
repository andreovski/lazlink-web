import { PrimaryColors } from "@/theme/theme-colors";
import { useTheme } from "@/theme/theme-provider";
import defaultColors from "tailwindcss/colors";
import { DefaultColors } from "tailwindcss/types/generated/colors";

type Colors = DefaultColors & PrimaryColors;

export const getThemeColors = () => {
  const { theme } = useTheme();
  const colors: any = defaultColors;

  let themeName = theme.includes("dark") ? theme.split("-")?.[0] : theme;

  if (themeName === "dark" || themeName === "default") {
    themeName = "teal";
  }

  const primaryColors = colors?.[themeName];

  const res = {
    ...colors,
    primary: {
      ...primaryColors,
    },
  } as Colors;

  return res;
};
