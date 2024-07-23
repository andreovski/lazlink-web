import { useAppContext } from "@/context/app-context";

import { Spinner } from "../ui/spinner";

export const Logout = () => {
  const { isLoadingProfessional, isLoginOut } = useAppContext();

  if (!isLoadingProfessional && !isLoginOut) return null;

  return (
    <div className="bg-white/33 absolute flex h-screen w-screen flex-col items-center justify-center gap-2 backdrop-blur-md">
      <Spinner />
      {isLoginOut ? "Saindo..." : "Carregando dados de usuário"}
    </div>
  );
};
