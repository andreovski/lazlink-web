import { Outlet, createBrowserRouter } from "react-router-dom";

import { BrandHeader } from "@/components/layouts/brand-header";

import { SignIn } from "../auth/sign-in";
import { FirstAccessConfig } from "../app/first-access-config";
import { Profile } from "../app/profile/profile";
import { Error404 } from "@/components/error/404";

export const authRoutes = createBrowserRouter([
  //* Authenticated routes
  {
    path: "/:username",
    element: <Profile />,
    errorElement: <Error404 />,
  },
  {
    path: "/acesso/config",
    element: <BrandHeader />,
    errorElement: <Error404 />,
    children: [
      {
        path: "",
        element: <FirstAccessConfig />,
      },
    ],
  },
  //* Auth routes
  {
    path: "/login",
    element: <BrandHeader />,
    errorElement: <Error404 />,
    children: [
      {
        path: "",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
