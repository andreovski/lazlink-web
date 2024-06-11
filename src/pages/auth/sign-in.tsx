import { Button } from "@/components/ui/button";

import { FaGoogle } from "react-icons/fa";

export function SignIn() {
  return (
    <div className="flex flex-col gap-8 w-full py-8 px-[256px]">
      <h1 className="text-4xl font-extrabold w-full">Vamos começar?</h1>
      <p className="leading-9 font-light">
        Você precisa conectar uma conta do Google, assim conseguimos integrar
        com seu calendário. É super fácil! <br /> Você só precisa clicar no
        botão abaixo que cuidamos de todo o resto.
      </p>

      <div className="flex flex-col gap-4 w-full items-center bottom-6 right-0 absolute">
        <Button className="w-64 flex gap-3">
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
