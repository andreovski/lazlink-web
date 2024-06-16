import AvatarUpload from "@/components/ui/avatarUpload";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";
import { InputForm } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TextareaForm } from "@/components/ui/textarea";
import { Xyz } from "@/utils/xyz";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  FaClipboardList,
  FaHashtag,
  FaRegUserCircle,
  FaSave,
  FaTimes,
} from "react-icons/fa";

export function Settings() {
  const [useEnterpriseName, setUseEnterpriseName] = useState(false);
  const [isWhatsApp, setIsWhatsApp] = useState(true);

  const form = useForm();

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

  return (
    <DrawerContent className="fixed left-auto top-0 mt-0 h-screen w-full rounded-none rounded-l-md md:w-[480px]">
      <div className="flex justify-between p-4">
        <DrawerTitle className="text-lg">Editar Perfil</DrawerTitle>
        <DrawerClose>
          <FaTimes />
        </DrawerClose>
      </div>

      <FormProvider {...form}>
        <form className="flex w-full flex-col gap-6 overflow-y-scroll px-8">
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
              <InputForm name="work" label="Profissão/Titulo" />
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

            <InputForm name="phone" label="Telefone" />

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
              <InputForm name="phone2" label="WhatsApp" />
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

            <InputForm name="code" label="CEP" />
            <InputForm name="avenue" label="Rua/Avenida/etc." />
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

          <Button type="submit" className="my-4 flex gap-2">
            <FaSave />
            Salvar edições
          </Button>
        </form>
      </FormProvider>
    </DrawerContent>
  );
}
