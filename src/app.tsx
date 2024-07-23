import "./theme/globals.css";
import "@animxyz/core";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";

import { Error404 } from "./components/error/404";
import { AppProvider } from "./context/app-context";
import { env } from "./env";
import { queryClient } from "./lib/react-query";
import { authRoutes } from "./pages/routes/auth.routes";

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
