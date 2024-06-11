import { createBrowserRouter } from "react-router-dom";

import { BrandHeader } from "@/components/layouts/brand-header";

import { SignIn } from "../auth/sign-in";

export const authRoutes = createBrowserRouter([
  {
    path: "/",
    element: <BrandHeader />,
    errorElement: <h1>Um erro ocorreu</h1>,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);
