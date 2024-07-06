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
