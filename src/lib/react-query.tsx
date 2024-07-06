import { toast } from "@/components/ui/use-toast";
import { QueryClient } from "@tanstack/react-query";

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
