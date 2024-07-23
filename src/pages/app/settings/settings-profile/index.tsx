import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  FaAdjust,
  FaChevronRight,
  FaClipboardList,
  FaHashtag,
  FaLink,
  FaPaste,
  FaRegUserCircle,
  FaSave,
  FaTimes,
  FaUserFriends,
} from "react-icons/fa";
import { InferType } from "yup";

import {
  queryKeyGetProfessionalById,
  useMutationPutProfessional,
} from "@/api/professional";
import { FieldCountryState } from "@/components/fields/field-country-state";
import AvatarUpload from "@/components/ui/avatarUpload";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input, InputForm } from "@/components/ui/input";
import { InputPhone } from "@/components/ui/input-phone";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TextareaForm } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useAppContext } from "@/context/app-context";
import { env } from "@/env";
import { convertEmptyStringsToNull } from "@/utils";
import { useCopyClipboard } from "@/utils/hooks/useCopyClipboard";
import { Xyz } from "@/utils/xyz";

import { SettingsExternalLinks } from "./settings-external-links";
import { SettingsProfileTheme } from "./settings-profile-theme";
import { settingsProfileValidationSchema } from "./utils";

export type SettingsProfileValidationSchema = InferType<
  typeof settingsProfileValidationSchema
>;

export function SettingsProfile() {
  const [useEnterpriseName, setUseEnterpriseName] = useState(false);
  const [isWhatsApp, setIsWhatsApp] = useState(true);

  const queryClient = useQueryClient();
  const { professional } = useAppContext();
  const { onCopy } = useCopyClipboard();

  const form = useForm<SettingsProfileValidationSchema>({
    resolver: yupResolver(settingsProfileValidationSchema),
    values: {
      ...professional,
      isWhatsApp: !!professional.whatsappPhone || true,
    },
  });

  const { formState, watch } = form;
  const appUrl = env.VITE_APP_URL;

  const handleCheckChange = (e: boolean) => {
    setUseEnterpriseName(e);
    form.setValue("useEnterpriseName", e);
  };

  const handleCheckChangeWhatsapp = (e: boolean) => {
    setIsWhatsApp(e);
    form.setValue("isWhatsApp", e);
  };

  const handleCheckChangeShowAddress = (e: boolean) => {
    form.setValue("showAddress", e);
  };

  const showAddres = form.watch("showAddress");

  const { mutate } = useMutationPutProfessional({
    onSuccess: (data: IProfessional) => {
      queryClient.setQueryData([queryKeyGetProfessionalById, data._id], data);
      toast({
        title: "Cadastro alterado com sucesso!",
        variant: "success",
      });
    },
  });

  const onSubmit = async (values: SettingsProfileValidationSchema) => {
    const payload = convertEmptyStringsToNull(values);

    await mutate(payload);
  };

  const handleChangeInputUncontrolled = (name: string, value: string) => {
    form.setValue(name as any, value);
  };

  const errorPhone = formState.errors?.cellphone;
  const errorWhatsappPhone = formState.errors?.whatsappPhone;
  const userUrl = appUrl.concat(`/${form.getValues().userUrl}`);

  return (
    <DrawerContent>
      <div className="flex justify-between p-4">
        <DrawerTitle className="text-lg">Editar Perfil</DrawerTitle>
        <DrawerClose>
          <FaTimes />
        </DrawerClose>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6 overflow-y-auto px-8"
        >
          <AvatarUpload name="avatarUrl" className="mx-auto h-20 w-20" />

          {/* //* basic info  */}
          <div className="space-y-2">
            <h1 className="flex items-center gap-2 font-semibold">
              <FaRegUserCircle className="text-lg" />
              Dados básicos
            </h1>

            <InputForm name="name" label="Nome completo" />
            <InputForm name="workTitle" label="Profissão/Titulo" />

            <div className="flex items-center space-x-2 py-2">
              <Switch
                id="useEnterpriseName"
                checked={useEnterpriseName}
                onCheckedChange={handleCheckChange}
              />
              <Label htmlFor="useEnterpriseNamee" className="text-sm">
                Prefiro usar o nome da minha empresa
              </Label>
            </div>

            <Xyz condition={useEnterpriseName} xyz="fade down duration-3">
              <InputForm name="enterpriseName" label="Nome da empresa" />
            </Xyz>
            <TextareaForm rows={6} name="about" label="Descrição" />
            <InputForm name="email" disabled label="E-mail" />

            <div className="relative space-y-1">
              <Label className="text-sm font-medium">URL de perfil</Label>
              <Input disabled value={userUrl} />
              <Button
                className="absolute right-[0.14rem] top-[1.63rem] h-8 rounded-sm"
                variant="ghost"
                onClick={() => onCopy(userUrl)}
              >
                <FaPaste />
              </Button>
            </div>
          </div>

          <Separator />

          {/* //* contact  */}
          <div className="space-y-2">
            <h1 className="flex items-center gap-2 font-semibold">
              <FaClipboardList className="text-lg" />
              Informações de contato
            </h1>

            <div className="space-y-1">
              <Label className="text-sm font-medium" htmlFor="cellphone">
                Telefone
              </Label>
              <InputPhone
                id="cellphone"
                error={form.formState.errors?.cellphone}
                defaultCountry="BR"
                value={watch("cellphone")}
                onChange={(e) => handleChangeInputUncontrolled("cellphone", e)}
              />
              {errorPhone?.message && (
                <p className="text-xs font-medium text-red-600">
                  {errorPhone.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2 py-2">
              <Switch
                id="isWhatsApp"
                checked={isWhatsApp}
                onCheckedChange={handleCheckChangeWhatsapp}
              />
              <Label htmlFor="isWhatsApp" className="text-sm">
                Esse telefone também é WhatsApp
              </Label>
            </div>

            <Xyz condition={!isWhatsApp} xyz="fade down duration-3">
              <div className="space-y-1">
                <Label className="text-sm font-medium" htmlFor="whatsappPhone">
                  WhatsApp
                </Label>
                <InputPhone
                  id="whatsappPhone"
                  error={form.formState.errors?.whatsappPhone}
                  value={watch("whatsappPhone")}
                  defaultCountry="BR"
                  onChange={(e) =>
                    handleChangeInputUncontrolled("whatsappPhone", e)
                  }
                />
                {errorWhatsappPhone?.message && (
                  <p className="text-xs font-medium text-red-600">
                    {errorWhatsappPhone.message}
                  </p>
                )}
              </div>
            </Xyz>
          </div>

          <Separator />

          {/* //* address */}
          <div className="space-y-2">
            <h1 className="flex items-center gap-2 font-semibold">
              <FaClipboardList className="text-lg" />
              Endereço
            </h1>

            <div className="flex items-center space-x-2 py-2">
              <Switch
                id="showAddress"
                checked={!!showAddres}
                onCheckedChange={handleCheckChangeShowAddress}
              />
              <Label htmlFor="showAddress" className="text-sm">
                Desejo exibir o endereço no meu perfil
              </Label>
            </div>

            <InputForm name="address.postalCode" label="CEP" />
            <InputForm name="address.street" label="Rua/Avenida/etc." />
            <InputForm name="address.city" label="Cidade" />
            {/* <InputForm name="address.state" label="Estado" /> */}
            <FieldCountryState name="address.state" />
            <InputForm name="address.complement" label="Complemento" />
          </div>

          <Separator />

          {/* //* social media */}
          <div className="space-y-2">
            <h1 className="flex items-center gap-2 font-semibold">
              <FaHashtag className="text-lg" />
              Redes sociais
            </h1>

            <InputForm
              name="instagramUrl"
              label="Instagram"
              sublabel="Digite apenas o usuário, sem o @"
            />
            <InputForm name="linkedInUrl" label="LinkedIn" />
            <InputForm name="facebookUrl" label="Facebook" />
            <InputForm
              name="twitterUrl"
              label="Twitter/X"
              sublabel="Digite apenas o usuário, sem o @"
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <h1 className="flex items-center gap-2 font-semibold">
              <FaUserFriends className="text-lg" />
              Indicação
            </h1>

            <InputForm name="recommendation" label="E-mail de indicação" />
          </div>

          <Separator />

          <div className="space-y-2">
            <h1 className="flex items-center gap-2 font-semibold">
              <FaLink className="text-lg" />
              Links externos
            </h1>

            <SettingsExternalLinks>
              <Button variant="link" className="px-0" asChild>
                <div className="flex w-full cursor-pointer justify-between">
                  <p className="pointer-events-none font-medium text-foreground">
                    Adicionar links externos
                  </p>

                  <FaChevronRight className="pointer-events-none" />
                </div>
              </Button>
            </SettingsExternalLinks>
          </div>

          <Separator />

          <div className="w-full space-y-2">
            <h1 className="flex items-center gap-2 font-semibold">
              <FaAdjust className="text-lg" />
              Temas
            </h1>

            <SettingsProfileTheme />
          </div>

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="my-4 flex gap-2"
          >
            <FaSave />
            Salvar edições
          </Button>
        </form>
      </FormProvider>
    </DrawerContent>
  );
}
