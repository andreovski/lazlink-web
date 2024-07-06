import { api } from "@/lib/axios";
import { QueryOptions, useQuery } from "@tanstack/react-query";
import { IResponseList, ParamsPagination } from "../utils";

export const queryKeyGetUsers = "users";
export const useQueryGetUsers = (
  params?: ParamsPagination,
  config?: QueryOptions,
) =>
  useQuery({
    queryKey: [queryKeyGetUsers, params],
    queryFn: async () => {
      const { data } = await api.get<IResponseList<IUser[]>>("/users", {
        params: {
          page: params?.page ?? 1,
          ...params,
        },
      });
      return data;
    },
    ...config,
  });

export const queryKeyGetUserById = "usersById";
export const useQueryGetUserById = (
  params: { id: string },
  config?: QueryOptions,
) =>
  useQuery({
    queryKey: [queryKeyGetUsers, params],
    queryFn: async () => {
      const { data } = await api.get<IResponseList<IUser>>(
        `/users/${params.id}`,
      );
      return data;
    },
    ...config,
  });
