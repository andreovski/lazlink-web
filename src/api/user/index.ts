import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";

import { IResponseList, ParamsPagination, QueryOptions } from "../utils";

export const queryKeyGetUsers = "users";
export const useQueryGetUsers = (
  params?: ParamsPagination,
  config?: QueryOptions<IResponseList<IUser[]>>,
) =>
  useQuery({
    queryKey: [queryKeyGetUsers, params, params?.page],
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
  config?: QueryOptions<IUser>,
) =>
  useQuery({
    queryKey: [queryKeyGetUsers, params],
    queryFn: async () => {
      const { data } = await api.get<IUser>(`/users/${params.id}`);
      return data;
    },
    ...config,
  });
