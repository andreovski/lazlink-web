import "./globals.css";
import "@animxyz/core";

import { RouterProvider } from "react-router-dom";

import { authRoutes } from "./pages/routes/auth.routes";

export function App() {
  return <RouterProvider router={authRoutes} />;
}
