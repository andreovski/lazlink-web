import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { FaExclamationCircle, FaGoogle, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/app-context";

export function SignIn() {
  const [hasError, setHasError] = useState(false);
  const [isLogginIn, setIsLogginIn] = useState(false);

  const { handleGoogleLogin } = useAppContext();

  const navigate = useNavigate();

  const login = useGoogleLogin({
    scope:
      "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
    onNonOAuthError: () => setIsLogginIn(false),
    onSuccess: async (tokenResponse) => {
      const data = await handleGoogleLogin(tokenResponse.access_token);
      console.log("🚀 ~ onSuccess: ~ data:", data);

      if (data) {
        navigate("/acesso/config", {
          state: {
            ...data,
          },
          replace: true,
        });
      }
      setIsLogginIn(false);
    },
    onError: () => [setHasError(true), setIsLogginIn(false)],
  });

  return (
    <div className="relative mx-auto flex h-[90vh] w-full max-w-[765px] flex-col gap-8 px-8 py-5 md:px-0">
      {!hasError && (
        <>
          <h1 className="w-full text-4xl font-extrabold">Vamos começar?</h1>
          <p className="leading-9">
            Você precisa conectar uma conta do Google, assim conseguimos
            integrar com seu calendário. É super fácil! <br /> Você só precisa
            clicar no botão abaixo que cuidamos de todo o resto.
          </p>
        </>
      )}
      {hasError && <SignInError />}
      <div className="absolute bottom-6 right-0 flex w-full flex-col items-center gap-4 px-8 text-center md:px-0">
        <Button
          onClick={() => [login(), setIsLogginIn(true)]}
          className="flex w-64 gap-3"
          disabled={isLogginIn}
        >
          {isLogginIn ? <FaSpinner className="animate-spin" /> : <FaGoogle />}
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

const SignInError = () => {
  return (
    <>
      <FaExclamationCircle className="w-full text-center text-5xl text-primary" />

      <h1 className="w-full text-4xl font-extrabold">Ops!</h1>
      <p className="font-light leading-9">
        Parece que algo deu errado na hora de conectar com a sua conta. Vamos
        tentar novamente?
        <br />
        Não esqueça de clicar em ”Autorizar” na próxima página.
      </p>
    </>
  );
};
