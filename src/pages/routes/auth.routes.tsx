import { createBrowserRouter } from "react-router-dom";

import { BrandHeader } from "@/components/layouts/brand-header";

import { SignIn } from "../auth/sign-in";
import { FirstAccessConfig } from "../app/first-access-config";

export const authRoutes = createBrowserRouter([
  {
    path: "/",
    element: <BrandHeader />,
    errorElement: <h1>Um erro ocorreu</h1>,
    children: [
      {
        path: "/login",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/",
    element: <BrandHeader />,
    errorElement: <h1>Um erro ocorreu</h1>,
    children: [
      {
        path: "/acesso/config",
        element: <FirstAccessConfig />,
      },
    ],
  },
]);
