import { XyzTransition } from "@animxyz/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAppContext } from "@/context/app-context";

import { FirstAccessConfigAboutForm } from "./first-access-config-about-form";
import { FirstAccessConfigBasicForm } from "./first-access-config-basic-form";
import { FirstAccessConfigThemeForm } from "./first-access-config-theme-form";
import { FirstAccessConfigUrlForm } from "./first-access-config-url-form";

export function FirstAccessConfig() {
  const { isAuthenticated, professional, isLoadingProfessional } =
    useAppContext();
  const navigate = useNavigate();
  const { state } = useLocation();

  const form = useForm({
    defaultValues: {
      step: 0,
    },
  });

  const step = form.watch("step");

  useEffect(() => {
    if (isLoadingProfessional) {
      return;
    }
    if (!isAuthenticated) {
      return navigate("/login", { replace: true });
    }
    if (professional?._id) {
      // return navigate(`/${professional.userUrl}`, { replace: true });
    }
  }, [isAuthenticated, state, navigate]);

  if (isLoadingProfessional) {
    return (
      <div className="flex h-[90vh] w-full flex-col items-center justify-center gap-4 px-8 py-5 md:px-0">
        <Spinner />
        <p className="animate-pulse font-sans text-lg font-semibold">
          Autenticando usuário ...
        </p>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <div className="relative mx-auto flex h-[90vh] w-full max-w-[765px] px-8 py-5 md:px-0">
        <XyzTransition xyz="ease-out-back fade in-right out-left duration-3">
          {step === 0 && (
            <div className="w-full">
              <FirstAccessConfigBasicForm />
            </div>
          )}
          {step === 1 && (
            <div className="w-full">
              <FirstAccessConfigAboutForm />
            </div>
          )}
          {step === 2 && (
            <div className="w-full">
              <FirstAccessConfigUrlForm />
            </div>
          )}
          {step === 3 && (
            <div className="w-full">
              <FirstAccessConfigThemeForm />
            </div>
          )}
          {step === 4 && (
            <div className="w-full">
              <FirstAccessConfigSuccess />
            </div>
          )}
        </XyzTransition>
      </div>
    </FormProvider>
  );
}

export function FirstAccessConfigSuccess() {
  const navigate = useNavigate();
  const { professional } = useAppContext();

  return (
    <div className="relative mx-auto flex h-[90vh] w-full max-w-[765px] flex-col gap-4 px-8 py-5 md:px-0">
      <FaCheckCircle className="w-full text-center text-5xl text-primary" />
      <h1 className="w-full text-4xl font-extrabold">Tudo certo!</h1>
      <p className="font-light leading-9">
        Agora é só personalizar a sua página e deixar ela com a sua cara.
      </p>
      <div className="absolute bottom-10 right-0 flex w-full flex-col items-center gap-4 px-8 text-center md:px-0">
        <Button
          className="flex w-64 gap-3"
          onClick={() => navigate(`/${professional.userUrl}`)}
        >
          Vamos lá
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
}
