import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { InputForm } from "@/components/ui/input";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { FaPlus, FaSave, FaTimes, FaTrash } from "react-icons/fa";
import { defaultHoursValue } from "./utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
  item: {
    name: string;
    value: number;
  };
};

export function SettingsSchedulesForm({ item }: Props) {
  const form = useForm({
    defaultValues: {
      hours: [defaultHoursValue],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "hours",
    control: form.control,
  });

  const canCreateMoreFields = fields.length < 3;

  return (
    <DrawerContent>
      <div className="flex justify-between p-4">
        <DrawerTitle className="text-lg">{item.name}</DrawerTitle>
        <DrawerClose>
          <FaTimes />
        </DrawerClose>
      </div>

      <FormProvider {...form}>
        <form className="flex h-full flex-col gap-4 p-4">
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
              />
              <InputForm
                className="col-span-5"
                name={`hours.${idx}.finalTime`}
                label="Fim"
                type="time"
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

          <p className="rounded border border-input bg-neutral-50 p-2 text-sm text-neutral-600">
            <p className="font-medium">💡 Dica</p>
            se você atende pela manhã, das 8h às 12h e durante a tarde das 14h
            às 18h, crie duas faixas de horário, uma para cada período.
          </p>

          {/* Links para sites externos */}

          <div className="mb-4 mt-auto flex flex-col gap-6">
            <div className="item-center flex gap-2">
              <Checkbox id="replicate" />
              <Label htmlFor="replicate">
                Replicar para todos os dias da semana
              </Label>
            </div>

            <Button type="submit" className="flex flex-1 gap-2">
              <FaSave />
              Salvar edições
            </Button>
          </div>
        </form>
      </FormProvider>
    </DrawerContent>
  );
}
