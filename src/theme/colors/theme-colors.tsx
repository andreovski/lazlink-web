export const themeColors: { [key: string]: any } = {
  default: {
    title: "Verde - Claro",
    color1: "#259688",
    color2: "#FFFCF4",
  },
  dark: {
    title: "Verde - Escuro",
    color1: "#008174",
    color2: "#3B3934",
  },
  sky: {
    title: "Azul - Claro",
    color1: "#0284c7",
    color2: "#FFFCF4",
  },
  "sky-dark": {
    title: "Azul - Escuro",
    color1: "#0369a1",
    color2: "#3B3934",
  },
  ambar: {
    title: "Ambar - Claro",
    color1: "#d97706",
    color2: "#FFFCF4",
  },
  "ambar-dark": {
    title: "Ambar - Escuro",
    color1: "#b45309",
    color2: "#3B3934",
  },
  coffee: {
    title: "Cappuccino",
    color1: "#8F5C38",
    color2: "#F1E8E2",
  },
  "lilac-dark": {
    title: "Lilás",
    color1: "#B4869F",
    color2: "#4e4c67",
  },
  ice: {
    title: "Gelo",
    color1: "#166187",
    color2: "#f0f5f7",
  },
  violet: {
    title: "Violeta",
    color1: "#43394b",
    color2: "#EEEE",
  },
};

export type AppThemes =
  | "default"
  | "dark"
  | "sky"
  | "sky-dark"
  | "ambar"
  | "ambar-dark"
  | "coffee"
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
