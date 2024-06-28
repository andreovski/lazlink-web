import { Outlet, createBrowserRouter } from "react-router-dom";

import { BrandHeader } from "@/components/layouts/brand-header";

import { SignIn } from "../auth/sign-in";
import { FirstAccessConfig } from "../app/first-access-config";
import { Profile } from "../app/profile/profile";
import { Error404 } from "@/components/error/404";

export const authRoutes = createBrowserRouter([
  //* Authenticated routes
  {
    path: "/",
    element: <Outlet />,
    errorElement: <Error404 />,
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
    errorElement: <Error404 />,
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
    errorElement: <Error404 />,
    children: [
      {
        path: "/login",
        element: <SignIn />,
      },
    ],
  },
]);
