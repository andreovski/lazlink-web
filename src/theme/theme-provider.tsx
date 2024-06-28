import { createContext, useContext, useEffect, useState } from "react";
import { AppThemes, themeColors } from "./colors/theme-colors";
import { ThemeFonts, themeFonts } from "./fonts/theme-fonts";

type Theme = AppThemes;

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontTheme: ThemeFonts;
  setFontTheme: (font: ThemeFonts) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState>(
  {} as ThemeProviderState,
);

export function ThemeProvider({
  children,
  defaultTheme = "default",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [fontFamily, setFontFamily] = useState<ThemeFonts>(
    () =>
      (localStorage.getItem(`${storageKey}/font`) as ThemeFonts) ||
      "font-serif",
  );
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );
  console.log("🚀 ~ theme:", theme);

  // * Fonts
  const handleSetFontTheme = (font: ThemeFonts) => {
    localStorage.setItem(storageKey, theme);
    setFontFamily(font);
  };

  const handleSetTheme = (theme: Theme) => {
    localStorage.setItem(`${storageKey}/font`, fontFamily);
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

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{
        setTheme: handleSetTheme,
        theme,
        fontTheme: fontFamily,
        setFontTheme: handleSetFontTheme,
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
