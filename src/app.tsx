import "./globals.css";

import { RouterProvider } from "react-router-dom";

import { authRoutes } from "./pages/routes/auth.routes";

export function App() {
  return (
    <div className="h-screen relative">
      <RouterProvider router={authRoutes} />;
    </div>
  );
}
