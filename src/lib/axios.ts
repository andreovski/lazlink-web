import axios from "axios";

import { convertDataBaseResponse } from "@/api/utils";
import { useAppContext } from "@/context/app-context";
import { env } from "@/env";

export const api = axios.create({
  baseURL: `${env.VITE_API_URL}/v1`,
  withCredentials: true,
});

export const googleCalendarApi = axios.create({
  baseURL: `https://www.googleapis.com/calendar/v3`,
  withCredentials: true,
});

api.interceptors.response.use(async (response) => {
  const { config } = response;
  let data = response.data;

  if (config.method === "get" && data?.data) {
    data = convertDataBaseResponse(data);
  }

  return {
    ...response,
    data,
  };
});

googleCalendarApi.interceptors.request.use(async (config) => {
  const { userGoogleAccessToken } = useAppContext();

  if (!userGoogleAccessToken) {
    throw new Error(`googleAccessToken is not available`);
  }

  config.headers.set("Authorization", `Bearer ${userGoogleAccessToken}`);
  return config;
});
