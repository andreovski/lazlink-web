import "./globals.css";
import "@animxyz/core";

import { RouterProvider } from "react-router-dom";

import { authRoutes } from "./pages/routes/auth.routes";
import { ThemeProvider } from "./components/theme/theme-provider";

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="@lazlink-ui/theme">
      <RouterProvider router={authRoutes} />
    </ThemeProvider>
  );
}
