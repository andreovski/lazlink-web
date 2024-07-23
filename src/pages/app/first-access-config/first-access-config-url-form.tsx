import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { InferType } from "yup";

import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/ui/input";

import { validateSchemaUrlForm } from "./utils";

type UserAccessConfigSchema = InferType<typeof validateSchemaUrlForm>;

export function FirstAccessConfigUrlForm() {
  const formContext = useFormContext();
  const form = useForm<UserAccessConfigSchema>({
    resolver: yupResolver(validateSchemaUrlForm),
    reValidateMode: "onChange",
  });

  const { handleSubmit } = form;

  const onSubmit = (formValues: UserAccessConfigSchema) => {
    for (const [key, value] of Object.entries(formValues)) {
      formContext.setValue(key, value);
    }
    formContext.setValue("step", 3);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-8"
      >
        <h1 className="text-4xl font-extrabold">
          Agora vamos personalizar seu Lazlink
        </h1>
        <p>Escolha o link de acesso da sua página:</p>

        <div className="space-y-1">
          <Label className="text-xs font-medium">lazlink.com/</Label>
          <InputForm
            name="userUrl"
            type="text"
            placeholder="fulano_silva_sauro"
          />
          <p className="pt-2 text-xs text-neutral-600">
            Você pode usar letras, números e underline (_).
          </p>
        </div>

        <div className="absolute bottom-10 right-0 flex w-full flex-col items-center gap-4 px-8 text-center md:px-0">
          <Button type="submit" className="flex w-full gap-3 sm:w-[380px]">
            Continuar
            <FaArrowRight />
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
