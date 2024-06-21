import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { SettingsServicesForm } from "./settings-services-form";
import { SettingsServicesRow } from "./settings-services-row";

export function SettingsServicos() {
  return (
    <DrawerContent>
      <div className="flex justify-between p-4">
        <DrawerTitle className="text-lg">Editar Serviços</DrawerTitle>
        <DrawerClose>
          <FaTimes />
        </DrawerClose>
      </div>

      <div className="relative flex h-full w-full flex-col gap-6 px-8">
        <p className="text-sm text-neutral-500">
          Aqui você pode adicionar, editar, excluir ou reordenar seus serviços.
        </p>

        <div className="flex w-full">
          <SettingsServicesRow />
        </div>

        <div className="fixed bottom-0 left-0 w-full px-6 py-4">
          <Drawer direction="right" modal={false}>
            <DrawerTrigger asChild>
              <Button className="flex w-full gap-2">
                <FaPlus />
                Adicionar novo serviço
              </Button>
            </DrawerTrigger>

            <SettingsServicesForm />
          </Drawer>
        </div>
      </div>
    </DrawerContent>
  );
}
