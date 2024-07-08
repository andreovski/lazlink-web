import { UseQueryOptions } from "@tanstack/react-query";

export type ParamsPagination = {
  page?: number;
  sortBy?: string;
  sortDirection?: string;
};

export interface IResponseList<IData> {
  data: IData;
  total: number;
}

export const convertDataBaseResponse = (data: IResponseList<any>) => ({
  items: data.data,
  total: data.total,
});

export type QueryOptions<T> = Omit<UseQueryOptions<T>, "queryKey" | "queryFc">;
