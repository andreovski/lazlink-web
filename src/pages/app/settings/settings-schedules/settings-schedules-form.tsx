import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { InputForm } from "@/components/ui/input";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { FaPlus, FaSave, FaTimes, FaTrash } from "react-icons/fa";
import { defaultHoursValue, validationSchema } from "./utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, AlertError } from "@/components/ui/alert";
import React from "react";
import { toast } from "@/components/ui/use-toast";

type Props = {
  item: {
    name: string;
    value: number;
  };
  close: () => void;
};

type SettingsSchedulesSchema = InferType<typeof validationSchema>;

export function SettingsSchedulesForm({ item, close }: Props) {
  const form = useForm<SettingsSchedulesSchema>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      hours: [defaultHoursValue],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "hours",
    control: form.control,
  });

  const canCreateMoreFields = fields.length < 3;

  const onSubmit = (v: SettingsSchedulesSchema) => {
    console.log("🚀 ~ onSubmit ~ v:", v);
    toast({
      title: "Alteração feita com sucesso!",
      description: `Os horários foram ajustados para o dia de ${item.name}`,
    });

    close();
  };

  const errors = form.formState.errors?.hours;

  return (
    <DrawerContent>
      <div className="flex justify-between p-4">
        <DrawerTitle className="text-lg">{item.name}</DrawerTitle>
        <DrawerClose>
          <FaTimes />
        </DrawerClose>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full flex-col gap-4 p-4"
        >
          <Button
            variant="outline"
            onClick={() => append(defaultHoursValue)}
            disabled={!canCreateMoreFields}
            className="ml-auto flex gap-2"
          >
            <FaPlus />
            Adicionar faixa
          </Button>
          {fields.map((field, idx) => (
            <div
              key={field.id}
              className="grid w-full grid-cols-12 items-end gap-4"
            >
              <InputForm
                className="col-span-5"
                name={`hours.${idx}.initialTime`}
                label="Início"
                type="time"
                hideErrorMessage
              />
              <InputForm
                className="col-span-5"
                name={`hours.${idx}.finalTime`}
                label="Fim"
                type="time"
                hideErrorMessage
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

          {/* Links para sites externos */}

          <div className="mb-4 mt-auto flex flex-col gap-6">
            <Alert className="flex-col items-start gap-1 text-sm">
              <p className="font-semibold">💡 Aqui vai uma dica:</p>
              <p className="italic">
                se você atende pela manhã, das 8h às 12h e durante a tarde das
                14h às 18h, crie duas faixas de horário, uma para cada período.
              </p>
            </Alert>

            <div className="item-center flex gap-2">
              <Checkbox id="replicate" />
              <Label htmlFor="replicate">
                Replicar para todos os dias da semana
              </Label>
            </div>

            <div className="flex flex-col gap-2">
              {!!errors?.length && (
                <AlertError>
                  <ul className="flex list-disc flex-col pl-4">
                    {errors?.map?.((error, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          {error?.finalTime?.message && (
                            <li className="text-sm font-semibold">
                              {error.finalTime.message}
                            </li>
                          )}
                          {error?.initialTime?.message && (
                            <li className="text-sm font-semibold">
                              {error.initialTime.message}
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
        </form>
      </FormProvider>
    </DrawerContent>
  );
}
