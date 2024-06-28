import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormProvider, useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { XyzTransition } from "@animxyz/react";
import { ShedulingAvaliabilities } from "./scheduling-avaliabilities";
import { ShedulingFormInfo } from "./scheduling-form-info";
import { SchedulingResume } from "./scheduling-resume";
import { SchedulingSuccess } from "./scheduling-success";
import { SchedulingPayment } from "./scheduling-payment";
import { InferType } from "yup";
import { validationSchema } from "./utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchedulingError } from "./scheduling-error";

type Props = {
  children: React.ReactNode;
};

type SchedulingSchema = InferType<typeof validationSchema>;

export function Scheduling({ children }: Props) {
  const serviceName = "Programação web";

  const form = useForm<SchedulingSchema>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      step: 0,
      date: new Date(),
      hour: "",
      name: "",
      phone: "",
      whatsappPhone: "",
      isWhatsApp: true,
      email: "",
    },
  });

  const step = form.watch("step");

  const handleReset = () => {
    form.reset();
  };

  return (
    <Dialog onOpenChange={(e) => !e && handleReset()}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="h-[100dvh] max-w-[600px] p-0 md:h-auto md:max-h-[600px]">
        <DialogHeader className="p-6 pb-0 text-lg font-semibold">
          {serviceName}
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(() => {})}
            className="mb-4 flex flex-col justify-between gap-4 overflow-y-auto p-6 pt-1 md:mb-0"
          >
            {/* <XyzTransition apper xyz="fade ease-in-out-back right duration-3"> */}
            {step === 0 && (
              <div className="flex h-full flex-col">
                <div className="space-y-4">
                  <p>
                    Descrição do serviço ofertado, sem truncamento do texto.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Descrição do serviço ofertado,
                  </p>
                  <p className="flex gap-2">
                    Valor do serviço:{" "}
                    <p className="text-md font-semibold">R$ 99,90</p>
                  </p>
                </div>

                <Button
                  className="mt-auto flex gap-2 md:mt-4"
                  onClick={() => form.setValue("step", 1)}
                >
                  Verificar disponibilidade
                  <FaArrowRight />
                </Button>
              </div>
            )}
            {step === 1 && <ShedulingAvaliabilities />}
            {step === 2 && <ShedulingFormInfo />}
            {step === 3 && <SchedulingResume />}
            {step === 4 && <SchedulingPayment />}
            {step === 5 && <SchedulingSuccess />}

            {/* //* Error comp */}
            {step === 9 && <SchedulingError />}
            {/* </XyzTransition> */}
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
