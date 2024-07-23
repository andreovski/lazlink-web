import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import {
  getUserInformation,
  GoogleUserDataResponse,
} from "@/api/google/google.user";
import {
  useQueryGetProfessionalById,
  useQueryKeyGetProfessionalByUsername,
} from "@/api/professional";
import { ThemeProvider } from "@/theme/theme-provider";

import { defaultProfessionalValue } from "./utils";

type AppContext = {
  professional: IProfessional;
  isLoadingProfessional: boolean;
  isAuthenticated: boolean;
  userGoogleAccessToken: string | null;
  isLoginOut: boolean;
  setUsername: (username: string) => void;
  resetState: () => void;
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
  const queryClient = useQueryClient();

  const [username, setUsername] = useState("");
  const [isLoginOut, setIsLoginOut] = useState(false);
  const [professional, setProfessional] = useState<IProfessional>(
    defaultProfessionalValue,
  );
  const [userGoogleAccessToken, setUserGoogleAccessToken] = useState<
    null | string
  >("6681fcae392b3ef73236f87f");

  const isAuthenticated = !!userGoogleAccessToken;

  const {
    data: professionalData,
    isLoading: isLoadingProfessional,
    isError: isErrorProfessional,
    error,
  } = useQueryGetProfessionalById(
    { id: userGoogleAccessToken! },
    { enabled: !!isAuthenticated },
  );

  const {
    data: viewProfessionalData,
    isLoading: isLoadingViewProfessional,
    isError: isErrorViewProfessional,
  } = useQueryKeyGetProfessionalByUsername(
    { username: username! },
    { enabled: !isAuthenticated && !!username.length },
  );

  useEffect(() => {
    if (professionalData?._id) {
      return setProfessional(professionalData);
    }
    if (viewProfessionalData?._id) {
      return setProfessional(viewProfessionalData);
    }
  }, [professionalData, viewProfessionalData]);

  if (isErrorProfessional || isErrorViewProfessional) {
    console.log("Error: ", error);
    throw new Error(error?.message);
  }

  // eslint-disable-next-line camelcase
  const handleGoogleLogin = async (access_token: string) => {
    try {
      setUserGoogleAccessToken(access_token);
      return await getUserInformation(access_token);
    } catch {
      setUserGoogleAccessToken(null);
      return null;
    }
  };

  const resetState = () => {
    setIsLoginOut(true);
    setUserGoogleAccessToken(null);
    setProfessional(defaultProfessionalValue);

    queryClient.resetQueries();
    setTimeout(() => setIsLoginOut(false), 500);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        isLoginOut,
        isLoadingProfessional:
          isLoadingProfessional || isLoadingViewProfessional,
        professional,
        userGoogleAccessToken,
        handleGoogleLogin,
        resetState,
        setUsername,
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
