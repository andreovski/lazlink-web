import { api } from "@/lib/axios";
import {
  InvalidateQueryFilters,
  MutationOptions,
  QueryKey,
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { IResponseList, ParamsPagination, QueryOptions } from "../utils";
import { SettingsProfileValidationSchema } from "@/pages/app/settings";

export const queryKeyGetProfessionals = "professionals";
export const useQueryGetProfessionals = (
  params?: ParamsPagination,
  config?: QueryOptions<IResponseList<IProfessional[]>>,
) =>
  useQuery({
    queryKey: [queryKeyGetProfessionals, params],
    queryFn: async () => {
      const { data } = await api.get<IResponseList<IProfessional[]>>(
        "/professionals",
        {
          params: {
            page: params?.page ?? 1,
            ...params,
          },
        },
      );
      return data;
    },
    ...config,
  });

export const queryKeyGetProfessionalById = "professionalsById";
export const useQueryGetProfessionalById = (
  params: { id: string },
  config?: QueryOptions<IProfessional>,
): UseQueryResult<IProfessional> =>
  useQuery({
    queryKey: [queryKeyGetProfessionalById, params.id],
    queryFn: () => getProfessionalById(params),
    ...config,
  });

export const getProfessionalById = async (params: { id: string }) => {
  const { data } = await api.get<IProfessional>(`/professionals/${params.id}`);
  return data;
};

export const useMutationPutProfessional = (
  config?: MutationOptions<
    IProfessional,
    unknown,
    SettingsProfileValidationSchema
  >,
) =>
  useMutation<IProfessional, unknown, SettingsProfileValidationSchema>({
    mutationFn: async (payload: SettingsProfileValidationSchema) => {
      const { data } = await api.put<IProfessional>(
        `/professionals/${payload._id}`,
        payload,
      );
      return data;
    },
    ...config,
  });
