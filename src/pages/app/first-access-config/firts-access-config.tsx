import { FormProvider, useForm } from "react-hook-form";

import { XyzTransition } from "@animxyz/react";

import { FirtsAccessConfigBasicForm } from "./first-access-config-basic-form";
import { FirtsAccessConfigUrlForm } from "./first-access-config-url-form";
import { FirstAccessConfigThemeForm } from "./first-access-config-theme-form";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export function FirstAccessConfig() {
  const form = useForm({
    // resolver: zodResolver(validateSchema),
    defaultValues: {
      step: 0,
    },
  });

  const step = form.watch("step");

  return (
    <FormProvider {...form}>
      <div className="relative mx-auto flex h-[90vh] w-full max-w-[765px] px-8 py-5 md:px-0">
        <XyzTransition apper xyz="fade ease-in-out-back right duration-3">
          {step === 0 && (
            <div className="w-full">
              <FirtsAccessConfigBasicForm />
            </div>
          )}
          {step === 1 && (
            <div className="w-full">
              <FirtsAccessConfigUrlForm />
            </div>
          )}
          {step === 2 && (
            <div className="w-full">
              <FirstAccessConfigThemeForm />
            </div>
          )}
          {step === 3 && (
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
  return (
    <div className="relative mx-auto flex h-[90vh] w-full max-w-[765px] flex-col gap-4 px-8 py-5 md:px-0">
      <FaCheckCircle className="w-full text-center text-5xl text-primary" />

      <h1 className="w-full text-4xl font-extrabold">Tudo certo!</h1>
      <p className="font-light leading-9">
        Agora é só personalizar a sua página e deixar ela com a sua cara.
      </p>

      <div className="absolute bottom-10 right-0 flex w-full flex-col items-center gap-4 px-8 text-center md:px-0">
        <Button className="flex w-64 gap-3">
          Vamos lá
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
}
