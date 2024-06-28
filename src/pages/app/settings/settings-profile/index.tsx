import AvatarUpload from "@/components/ui/avatarUpload";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { InputForm } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TextareaForm } from "@/components/ui/textarea";
import { Xyz } from "@/utils/xyz";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import {
  FaAdjust,
  FaChevronRight,
  FaClipboardList,
  FaHashtag,
  FaLink,
  FaRegUserCircle,
  FaSave,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { settingsProfileValidationSchema } from "./utils";
import { InferType } from "yup";
import { InputPhone } from "@/components/ui/input-phone";
import { SettingsProfileTheme } from "./settings-profile-theme";
import { SettingsExternalLinks } from "./settings-external-links";

type SettingsProfileValidationSchema = InferType<
  typeof settingsProfileValidationSchema
>;

export function SettingsProfile() {
  const [useEnterpriseName, setUseEnterpriseName] = useState(false);
  const [isWhatsApp, setIsWhatsApp] = useState(true);

  const form = useForm<SettingsProfileValidationSchema>({
    resolver: yupResolver(settingsProfileValidationSchema),
    defaultValues: {
      externalLinks: [],
    },
  });

  const { formState } = form;

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

  const onSubmit = (values: SettingsProfileValidationSchema) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    return;
  };

  const handleChangeInputUncontrolled = (name: any, value: any) => {
    form.setValue(name, value);
  };

  const errorPhone = formState.errors?.phone;
  const errorWhatsappPhone = formState.errors?.whatsappPhone;

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
          <AvatarUpload name="avatar" className="mx-auto h-20 w-20" />

          {/* //* basic info  */}
          <div className="space-y-2">
            <h1 className="flex items-center gap-2 font-semibold">
              <FaRegUserCircle className="text-lg" />
              Dados básicos
            </h1>

            <InputForm name="name" label="Nome completo" />
            <InputForm name="work" label="Profissão/Titulo" />

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

            <TextareaForm name="description" label="Descrição" />
          </div>

          <Separator />

          {/* //* contact  */}
          <div className="space-y-2">
            <h1 className="flex items-center gap-2 font-semibold">
              <FaClipboardList className="text-lg" />
              Informações de contato
            </h1>

            <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="phone">
                Telefone
              </Label>
              <InputPhone
                id="phone"
                error={form.formState.errors?.phone}
                defaultCountry="BR"
                onChange={(e) => handleChangeInputUncontrolled("phone", e)}
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
              <div className="space-y-2">
                <Label className="text-sm font-medium" htmlFor="whatsappPhone">
                  WhatsApp
                </Label>
                <InputPhone
                  id="whatsappPhone"
                  error={form.formState.errors?.phone}
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

            <InputForm name="postalCode" label="CEP" />
            <InputForm name="street" label="Rua/Avenida/etc." />
            <InputForm name="city" label="Cidade" />
            <InputForm name="state" label="Estado" />
            <InputForm name="complement" label="Complemento" />
          </div>

          <Separator />

          {/* //* social media */}
          <div className="space-y-2">
            <h1 className="flex items-center gap-2 font-semibold">
              <FaHashtag className="text-lg" />
              Redes sociais
            </h1>

            <InputForm
              name="instagram"
              label="Instagram"
              sublabel="Digite apenas o usuário, sem o @"
            />
            <InputForm name="linkedIn" label="LinkedIn" />
            <InputForm name="facebook" label="Facebook" />
            <InputForm
              name="twitter"
              label="Twitter/X"
              sublabel="Digite apenas o usuário, sem o @"
            />
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

          <Button type="submit" className="my-4 flex gap-2">
            <FaSave />
            Salvar edições
          </Button>
        </form>
      </FormProvider>
    </DrawerContent>
  );
}
