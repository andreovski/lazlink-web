export const themeFonts: { [key: string]: any } = {
  "font-sans": {
    name: "Padrão",
    isPremium: false,
  },
  "font-serif": {
    name: "ui-serif",
    isPremium: false,
  },
  "font-josefin-sans": {
    name: "Josefin Sans",
    isPremium: true,
  },
};

export type ThemeFonts = "font-sans" | "font-serif" | "font-josefin-sans";

export const fontsFamily: { [key: string]: string } = {
  "font-sans-serif": "'Inter, 'sans-serif'",
  "font-serif": 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  "font-josefin-sans": "Josefin Sans, 'sans-serif'",
};
