import "./theme/globals.css";
import "@animxyz/core";

import { RouterProvider } from "react-router-dom";

import { authRoutes } from "./pages/routes/auth.routes";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { AppProvider } from "./context/app-context";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Error404 } from "./components/error/404";

import { ErrorBoundary } from "react-error-boundary";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { env } from "./env";

export function App() {
  return (
    <GoogleOAuthProvider clientId={env.VITE_APP_GOOGLE_CLIENT_ID}>
      <ErrorBoundary fallback={<Error404 />}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <RouterProvider router={authRoutes} />
          </AppProvider>

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    </GoogleOAuthProvider>
  );
}
