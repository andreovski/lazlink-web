import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useDisclosure } from "@/utils/hooks/useDisclosure";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { FaPlus, FaSave, FaTimes, FaTrash } from "react-icons/fa";
import { defaultHoursValue, externalLinkFormSchema } from "./utils";
import { InputForm } from "@/components/ui/input";
import { AlertError } from "@/components/ui/alert";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UpgradeConfirm } from "../../upgrade/upgrade-confirm";
import { DialogUpdateConfirm } from "@/components/dialogs/dialog-update-confirm";
import { useAppContext } from "@/context/app-context";

export function SettingsExternalLinks({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, open, close } = useDisclosure({ opened: false });

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(e) => (e ? open() : close())}
      direction="right"
      modal={false}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <div className="flex justify-between p-4">
          <DrawerTitle className="text-lg">Links externos</DrawerTitle>
          <DrawerClose>
            <FaTimes />
          </DrawerClose>
        </div>
        <SettingsExternalLinksComponent />
      </DrawerContent>
    </Drawer>
  );
}

function SettingsExternalLinksComponent() {
  const { professional } = useAppContext();

  const premiumDialog = useDisclosure({ opened: false });

  const form = useForm({
    resolver: yupResolver(externalLinkFormSchema),
    defaultValues: {
      externalLinks: [defaultHoursValue],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control as any,
    name: "externalLinks",
  });

  const errors = form.formState.errors?.externalLinks;

  const isUserPremium = professional.premium;
  const max = isUserPremium ? 5 : 1;

  const handleAdd = () => {
    if (fields.length === max) {
      return premiumDialog.open();
    }

    return append(defaultHoursValue);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className="flex h-full flex-col gap-4 p-4"
      >
        <Button
          variant="outline"
          onClick={handleAdd}
          disabled={fields.length >= 5}
          className="ml-auto flex gap-2"
        >
          <FaPlus />
          Adicionar Link
        </Button>
        {fields.map((field, idx) => (
          <div
            key={field.id}
            className="grid w-full grid-cols-12 items-end gap-4"
          >
            <InputForm
              className="col-span-5"
              name={`externalLinks.${idx}.title`}
              label="Título"
              hideErrorMessage
              placeholder="O títlo da URL"
            />
            <InputForm
              className="col-span-5"
              name={`externalLinks.${idx}.url`}
              label="URL"
              hideErrorMessage
              placeholder="https://instagram.co..."
            />
            <Button
              className="col-span-2"
              variant="destructive"
              onClick={() => remove(idx)}
              disabled={fields.length <= 1}
            >
              <FaTrash />
            </Button>
          </div>
        ))}

        <div className="mb-4 mt-auto flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            {!!errors?.length && (
              <AlertError>
                <ul className="flex list-disc flex-col pl-4">
                  {errors?.map?.((error, idx) => {
                    return (
                      <React.Fragment key={idx}>
                        {error?.title?.message && (
                          <li className="text-sm font-semibold">
                            {error.title.message}
                          </li>
                        )}
                        {error?.url?.message && (
                          <li className="text-sm font-semibold">
                            {error.url.message}
                          </li>
                        )}
                      </React.Fragment>
                    );
                  })}
                </ul>
              </AlertError>
            )}

            <Button
              type="submit"
              disabled={!!errors?.length}
              className="flex flex-1 gap-2"
            >
              <FaSave />
              Salvar edições
            </Button>
          </div>
        </div>

        <DialogUpdateConfirm {...premiumDialog} />
      </form>
    </FormProvider>
  );
}
