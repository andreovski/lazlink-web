import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { InputForm } from "@/components/ui/input";
import { TextareaForm } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FaSave, FaTimes, FaTrash } from "react-icons/fa";
import { serviceTimeValues, settingsServicosValidationSchema } from "./utils";
import { InferType } from "yup";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputCurrency } from "@/components/ui/input-currency";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef } from "react";
import { useDisclosure } from "@/utils/hooks/useDisclosure";
import { useMutationUpdateServices } from "@/api/services";
import { useAppContext } from "@/context/app-context";

type SettingsProfileValidationSchema = InferType<
  typeof settingsServicosValidationSchema
>;

export function SettingsServicesForm({
  defaultValues,
}: {
  defaultValues?: SettingsProfileValidationSchema | undefined;
}) {
  const { professional } = useAppContext();

  const form = useForm<SettingsProfileValidationSchema>({
    resolver: yupResolver(settingsServicosValidationSchema),
    values: {
      ...defaultValues!,
      serviceTime: defaultValues?.serviceTime || serviceTimeValues[0].value,
    },
  });

  const { mutate } = useMutationUpdateServices();

  const onSubmit = (values: SettingsProfileValidationSchema) => {
    mutate({
      id: professional._id,
      services: [...professional.services, values],
    });

    console.log("🚀 ~ onSubmit ~ values:", values);
    return;
  };

  const serviceTimeValue = form.watch("serviceTime");

  const title = defaultValues ? "Editar serviço" : "Adicionar novo serviço";

  return (
    <DrawerContent>
      <div className="flex justify-between p-4">
        <DrawerTitle className="text-lg">{title}</DrawerTitle>
        <DrawerClose>
          <FaTimes />
        </DrawerClose>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col gap-6 overflow-auto px-8"
        >
          <div className="space-y-2">
            <InputForm name="title" label="Nome completo" />

            <TextareaForm name="description" label="Descrição" />

            <div className="space-y-2">
              <Label>Tempo de atendimento</Label>

              <Select defaultValue={serviceTimeValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tempo de atendimento" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {serviceTimeValues.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <InputCurrency name="value" label="Valor do serviço" />

            <div className="flex gap-2 pt-2">
              <Checkbox
                onCheckedChange={(e) => form.setValue("advancePayment", !!e)}
                checked={form.watch("advancePayment")}
                className="mt-1"
                id="paymentRequired"
              />
              <div className="space-y-1">
                <Label htmlFor="paymentRequired">
                  Exigir pagamento antecipado
                </Label>
                <p className="text-sm text-neutral-400">
                  O Lazlink cuida de tudo. Desde o pagamento até o depósito na
                  sua conta bancária.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4 mt-auto flex gap-4">
            <DeleteDialog />

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

type DialogDeleteProps = {
  item?: any;
};

function DeleteDialog({ item }: DialogDeleteProps) {
  const dialogCloseRef = useRef(null);
  const { isOpen, close, toggle } = useDisclosure({ opened: false });

  const serviceName = "Programador Web";

  const handleDelete = () => {
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => toggle()}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="flex gap-2">
          <FaTrash />
          Apagar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="font-semibold">
          Deseja apagar o serviço {serviceName} ?
        </DialogHeader>
        <p>
          Depois de apagado, não será mais possivel visualizar esse serviço em
          seu perfil.
        </p>

        <div className="flex gap-2">
          <DialogClose ref={dialogCloseRef} asChild>
            <Button variant="outline" className="flex w-full gap-2">
              <FaTimes />
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="flex w-full gap-2"
          >
            <FaTrash />
            Apagar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
