import { Button } from "@/components/ui/button";

import { FaExclamationCircle, FaGoogle } from "react-icons/fa";

export function ErrorLogin() {
  return (
    <div className="relative mx-auto flex h-[90vh] w-full max-w-[765px] flex-col gap-8 px-8 py-5 md:px-0">
      <FaExclamationCircle className="text-lg" />

      <h1 className="w-full text-4xl font-extrabold">Ops!</h1>
      <p className="font-light leading-9">
        Parece que algo deu errado na hora de conectar com a sua conta. Vamos
        tentar novamente?
        <br />
        Não esqueça de clicar em ”Autorizar” na próxima página.
      </p>

      <div className="absolute bottom-6 right-0 flex w-full flex-col items-center gap-4 px-8 text-center md:px-0">
        <Button className="flex w-64 gap-3">
          <FaGoogle />
          Entrar com Google
        </Button>
        <p className="text-sm">
          Seus dados estão seguros. Não temos acesso à sua senha e guardamos
          todas as informações com criptografia.
        </p>
      </div>
    </div>
  );
}
