import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { FaEnvelope, FaExclamationCircle } from "react-icons/fa";

export function Error404() {
  return (
    <div className="relative mx-auto flex h-[90vh] w-full max-w-[765px] flex-col items-center justify-center gap-8 px-8 py-5 md:px-0">
      <div className="flex flex-col items-center gap-4 text-primary">
        <FaExclamationCircle className="text-4xl" />
        <h1 className="w-full text-center text-4xl font-extrabold">Ops!</h1>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-lg font-medium leading-9">
          Houve um erro ao carregar a página ou pode ser que ela não exista.
        </p>
        <p className="text-lg font-light">
          Se você tem certeza que isso é um erro, contate nosso suporte.
        </p>
      </div>

      <div className="flex items-center gap-2 font-semibold">
        <FaEnvelope className="text-primary" />
        <a href="mailto:lazlink@lazlink.com.br">lazlink@lazlink.com.br</a>
      </div>
    </div>
  );
}
