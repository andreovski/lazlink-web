import { useQueryGetProfessionalById } from "@/api/professional";
import { ThemeProvider } from "@/theme/theme-provider";
import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { defaultProfessionalValue } from "./utils";
import {
  GoogleUserDataResponse,
  getUserInformation,
} from "@/api/google/google";

type AppContext = {
  professional: IProfessional;
  isLoadingProfessional: boolean;
  isAuthenticated: boolean;
  userGoogleAccessToken: string | null;
  handleGoogleLogin: (
    access_token: string,
  ) => Promise<GoogleUserDataResponse | null>;
};

const AppContext = createContext({
  professional: defaultProfessionalValue,
  isLoadingProfessional: false,
  isAuthenticated: false,
} as AppContext);

export function AppProvider({ children }: { children?: React.ReactNode }) {
  const [userGoogleAccessToken, setUserGoogleAccessToken] = useState<
    null | string
  >(null);

  const isAuthenticated = false;

  const {
    data: professional = defaultProfessionalValue,
    isLoading: isLoadingProfessional,
    isError,
    error,
  } = useQueryGetProfessionalById(
    {
      id: "6681fcae392b3ef73236f87f",
    },
    {
      enabled: !!isAuthenticated,
    },
  );

  if (isError) {
    console.log("Error: ", error);
    throw new Error(error.message);
  }

  const handleGoogleLogin = async (access_token: string) => {
    try {
      setUserGoogleAccessToken(access_token);

      return await getUserInformation(access_token);
    } catch {
      setUserGoogleAccessToken(null);

      return null;
    }
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        professional,
        isLoadingProfessional,
        userGoogleAccessToken,
        handleGoogleLogin,
      }}
    >
      <ThemeProvider
        defaultTheme={{
          color: professional.theme.color,
          font: professional.theme.font,
          profile: professional.theme.profile,
        }}
      >
        {children}
        <Outlet />
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
