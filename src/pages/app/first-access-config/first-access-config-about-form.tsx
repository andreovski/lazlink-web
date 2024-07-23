import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { FaArrowRight, FaHashtag, FaUser } from "react-icons/fa";
import { InferType } from "yup";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/ui/input";
import { TextareaForm } from "@/components/ui/textarea";

import { validateSchemaAboutForm } from "./utils";

type UserAccessConfigSchema = InferType<typeof validateSchemaAboutForm>;

export function FirstAccessConfigAboutForm() {
  const formContext = useFormContext();
  const form = useForm<UserAccessConfigSchema>({
    resolver: yupResolver(validateSchemaAboutForm),
    defaultValues: {},
  });

  const { handleSubmit } = form;

  const onSubmit = (formValues: UserAccessConfigSchema) => {
    for (const [key, value] of Object.entries(formValues)) {
      formContext.setValue(key, value);
    }
    formContext.setValue("step", 2);
  };

  const [isEnterpriseName, name, enterpriseName, avatar] = formContext.watch([
    "useEnterpriseName",
    "name",
    "enterpriseName",
    "avatarUrl",
  ]);

  const [workTitle] = form.watch(["workTitle"]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-4 md:space-y-8"
      >
        <h1 className="text-2xl font-extrabold md:text-4xl">
          Agora, adicione algumas informações que irão aparecer em seu perfil.
        </h1>
        <div className="flex items-center gap-x-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatar} />
            <AvatarFallback className="flex items-center justify-center bg-primary">
              <FaUser className="text-background" />
            </AvatarFallback>
          </Avatar>

          <div className="">
            <h1 className="text-lg font-semibold">
              {isEnterpriseName ? enterpriseName : name}
            </h1>
            <p>{workTitle}</p>
          </div>
        </div>

        <div className="space-y-2">
          <InputForm
            name="workTitle"
            label="Profissão/Titulo *"
            placeholder="Ex: Contador"
          />
          <TextareaForm
            name="about"
            label="Descrição"
            placeholder="Conte um pouco sobre você e seus serviços ..."
          />
        </div>

        <div className="space-y-2">
          <h1 className="flex gap-2 font-semibold">
            <FaHashtag className="text-lg" />
            Redes sociais
          </h1>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <InputForm
              name="instagramUrl"
              label="Instagram"
              sublabel="Digite apenas o usuário, sem o @"
            />
            <InputForm
              name="twitterUrl"
              label="Twitter/X"
              sublabel="Digite apenas o usuário, sem o @"
            />
            <InputForm name="linkedInUrl" label="LinkedIn" />
            <InputForm name="facebookUrl" label="Facebook" />
          </div>
        </div>

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
