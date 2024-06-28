import "./theme/globals.css";
import "@animxyz/core";

import { RouterProvider } from "react-router-dom";

import { authRoutes } from "./pages/routes/auth.routes";
import { ThemeProvider } from "./theme/theme-provider";
import { Toaster } from "./components/ui/toaster";

export function App() {
  return (
    <ThemeProvider defaultTheme="default" storageKey="@lazlink-ui/theme">
      <RouterProvider router={authRoutes} />
      <Toaster />
    </ThemeProvider>
  );
}
