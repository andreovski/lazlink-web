import { api } from "@/lib/axios";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export const useMutationUpdateServices = (
  config?: MutationOptions<IServiceUpdate, unknown, IServiceUpdate>,
) =>
  useMutation<IServiceUpdate, unknown, IServiceUpdate>({
    mutationFn: async (payload: IServiceUpdate) => {
      const { data } = await api.put(`/professionals/${payload.id}`, payload);
      return data;
    },
    ...config,
  });
