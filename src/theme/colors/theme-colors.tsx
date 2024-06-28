export const themeColors: { [key: string]: any } = {
  default: {
    title: "Verde - Claro",
    color1: "#259688", //* Primary
    color2: "#FFFCF4", //* Background
    isPremium: false,
  },
  dark: {
    title: "Verde - Escuro",
    color1: "#008174",
    color2: "#3B3934",
    isPremium: false,
  },
  sky: {
    title: "Azul - Claro",
    color1: "#0284c7",
    color2: "#FFFCF4",
    isPremium: false,
  },
  "sky-dark": {
    title: "Azul - Escuro",
    color1: "#0369a1",
    color2: "#3B3934",
    isPremium: false,
  },
  ambar: {
    title: "Ambar - Claro",
    color1: "#d97706",
    color2: "#FFFCF4",
    isPremium: true,
  },
  "ambar-dark": {
    title: "Ambar - Escuro",
    color1: "#b45309",
    color2: "#3B3934",
    isPremium: true,
  },
  cappuccino: {
    title: "Cappuccino",
    color1: "#8F5C38",
    color2: "#F1E8E2",
    isPremium: true,
  },
  "lilac-dark": {
    title: "Lilás",
    color1: "#B4869F",
    color2: "#4e4c67",
    isPremium: true,
  },
  ice: {
    title: "Gelo",
    color1: "#166187",
    color2: "#f0f5f7",
    isPremium: true,
  },
  violet: {
    title: "Violeta",
    color1: "#43394b",
    color2: "#EEEEEE",
    isPremium: true,
  },
};

export type AppThemes =
  | "default"
  | "dark"
  | "sky"
  | "sky-dark"
  | "ambar"
  | "ambar-dark"
  | "cappuccino"
  | "lilac-dark"
  | "ice"
  | "violet";

export type PrimaryColors = {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
};
