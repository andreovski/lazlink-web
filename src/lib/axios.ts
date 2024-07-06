import { convertDataBaseResponse } from "@/api/utils";
import { env } from "@/env";
import axios from "axios";

export const api = axios.create({
  baseURL: `${env.VITE_API_URL}/v1`,
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
