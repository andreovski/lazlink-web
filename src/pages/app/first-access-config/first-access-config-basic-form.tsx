import { yupResolver } from "@hookform/resolvers/yup";

import { useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Xyz } from "@/utils/xyz";

import { InferType } from "yup";

import { validateSchemaBasicForm } from "./utils";
import AvatarUpload from "@/components/ui/avatarUpload";
import { useLocation } from "react-router-dom";

type UserAccessConfigSchema = InferType<typeof validateSchemaBasicForm>;

export function FirstAccessConfigBasicForm() {
  const { state } = useLocation();

  const [useEnterpriseName, setUseEnterpriseName] = useState(false);

  const formContext = useFormContext();
  const form = useForm<UserAccessConfigSchema>({
    resolver: yupResolver(validateSchemaBasicForm),
    defaultValues: {
      enterpriseName: "",
      name: state?.name,
      avatarUrl: state?.photo,
      useEnterpriseName: false,
      email: state?.email || "andre@andre.com",
    },
  });

  const { setValue, handleSubmit } = form;

  const handleCheckChange = (e: boolean) => {
    setUseEnterpriseName(e);
    setValue("useEnterpriseName", e);

    // Delay to the animation apper more friendly
    if (!e) {
      setTimeout(() => setValue("enterpriseName", ""), 250);
    }
  };

  const onSubmit = (formValues: UserAccessConfigSchema) => {
    for (const [key, value] of Object.entries(formValues)) {
      formContext.setValue(key, value);
    }
    formContext.setValue("step", 1);
  };

  const [isEnterpriseName, name, enterpriseName] = form.watch([
    "useEnterpriseName",
    "name",
    "enterpriseName",
  ]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-4 md:space-y-8"
      >
        <h1 className="text-2xl font-extrabold md:text-4xl">
          Vamos nos conhecer melhor
        </h1>
        <p>
          Confirme se está tudo certo com o seu nome, é assim que vamos te
          chamar:
        </p>

        <div className="flex items-center gap-x-3">
          <AvatarUpload className="h-16 w-16" name="avatarUrl" />
          <h1 className="text-lg font-semibold">
            {isEnterpriseName ? enterpriseName : name}
          </h1>
        </div>

        <InputForm
          id="name"
          name="name"
          label="Nome completo"
          type="text"
          placeholder="Digite seu nome"
        />

        <div className="flex items-center space-x-2">
          <Switch
            id="useEnterpriseName"
            checked={useEnterpriseName}
            onCheckedChange={handleCheckChange}
          />
          <Label htmlFor="useEnterpriseNamee">
            Prefiro usar o nome da minha empresa
          </Label>
        </div>

        <Xyz
          condition={useEnterpriseName}
          apper="true"
          xyz="fade down duration-3"
        >
          <InputForm
            id="enterpriseName"
            name="enterpriseName"
            label="Nome de sua empresa"
            type="text"
            placeholder="Digite o nome de sua empresa"
            disabled={!useEnterpriseName}
          />
        </Xyz>

        <InputForm name="email" label="E-mail" disabled />

        <div className="h-[90px]" />

        <div className="fixed bottom-4 right-0 flex w-full flex-col items-center gap-4 px-8 text-center md:bottom-10 md:px-0">
          <Button type="submit" className="flex w-full gap-3 sm:w-[380px]">
            Continuar
            <FaArrowRight />
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
