import { Outlet, createBrowserRouter } from "react-router-dom";

import { BrandHeader } from "@/components/layouts/brand-header";

import { SignIn } from "../auth/sign-in";
import { FirstAccessConfig } from "../app/first-access-config";
import { Profile } from "../app/profile/profile";

export const authRoutes = createBrowserRouter([
  //* Authenticated routes
  {
    path: "/",
    element: <Outlet />,
    errorElement: <h1>Um erro ocorreu</h1>,
    children: [
      {
        path: "/",
        element: <Profile />,
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
  //* Auth routes
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
]);
