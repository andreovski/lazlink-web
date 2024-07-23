import { createContext, useContext, useEffect, useState } from "react";

import { AppThemes, themeColors } from "./colors/theme-colors";
import { ThemeFonts, themeFonts } from "./fonts/theme-fonts";

type Theme = AppThemes;

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ITheme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontTheme: ThemeFonts;
  setFontTheme: (font: ThemeFonts) => void;
  profileTheme: string;
  setProfileTheme: (profile: string) => void;
  isDarkTheme: boolean;
};

const ThemeProviderContext = createContext<ThemeProviderState>(
  {} as ThemeProviderState,
);

export function ThemeProvider({
  children,
  defaultTheme,
  ...props
}: ThemeProviderProps) {
  const [fontFamily, setFontFamily] = useState<ThemeFonts>(defaultTheme!.font);
  const [theme, setTheme] = useState<Theme>(defaultTheme!.color);
  const [profileTheme, setProfileTheme] = useState<string>(
    defaultTheme!.profile,
  );

  useEffect(() => {
    setProfileTheme(defaultTheme!.profile);
    setTheme(defaultTheme!.color);
    setFontFamily(defaultTheme!.font);
  }, [defaultTheme]);

  // * Fonts
  const handleSetFontTheme = (font: ThemeFonts) => {
    setFontFamily(font);
  };

  const handleSetTheme = (theme: Theme) => {
    setTheme(theme);
  };

  useEffect(() => {
    const root = window.document.body;

    root.classList.remove(...Object.keys(themeFonts));
    root.classList.add(fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDarkTheme = theme.includes("dark");

    root.classList.remove(...Object.keys(themeColors));

    if (isDarkTheme) {
      root.classList.add("dark");
    }

    root.classList.add(theme);
  }, [theme]);

  const isDarkTheme = theme.includes("dark");

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{
        setTheme: handleSetTheme,
        theme,
        fontTheme: fontFamily,
        setFontTheme: handleSetFontTheme,
        profileTheme,
        setProfileTheme,
        isDarkTheme,
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
