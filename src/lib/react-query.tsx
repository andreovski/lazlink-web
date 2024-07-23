import { QueryClient } from "@tanstack/react-query";

import { toast } from "@/components/ui/use-toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: ({ message }) => {
        toast({
          variant: "destructive",
          title: "Ocorreu um erro",
          description:
            message ||
            "Um erro desconhecido ocorreu. Tente novamente mais tarde.",
        });
      },
    },
  },
});
