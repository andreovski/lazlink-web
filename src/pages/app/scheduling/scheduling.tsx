import { XyzTransition } from "@animxyz/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { InferType } from "yup";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Xyz } from "@/utils/xyz";

import { ShedulingAvaliabilities } from "./scheduling-avaliabilities";
import { SchedulingError } from "./scheduling-error";
import { ShedulingFormInfo } from "./scheduling-form-info";
import { SchedulingPayment } from "./scheduling-payment";
import { SchedulingResume } from "./scheduling-resume";
import { SchedulingSuccess } from "./scheduling-success";
import { validationSchema } from "./utils";

type Props = {
  children: React.ReactNode;
  service: IService;
};

type SchedulingSchema = InferType<typeof validationSchema>;

export function Scheduling({ children, service }: Props) {
  const serviceName = service.title;

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
      isBacking: false,
    },
  });

  const step = form.watch("step");

  const handleReset = () => {
    form.reset();
  };

  const isBacking = form.watch("isBacking");
  const animation = isBacking ? "in-left out-right" : "in-right out-left";

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
            <XyzTransition xyz={`ease-out-back ${animation} duration-3`}>
              {step === 0 && (
                <div className="flex h-full flex-col">
                  <div className="space-y-4">
                    <p>{service.description}</p>
                    <p className="flex gap-2">
                      Valor do serviço:{" "}
                      <p className="text-md font-semibold">R$ 99,90</p>
                    </p>
                  </div>

                  <Button
                    className="mt-auto flex gap-2 md:mt-4"
                    onClick={() => [
                      form.setValue("isBacking", false),
                      // ? timeout to preserve the direction of the animation
                      setTimeout(() => form.setValue("step", 1), 150),
                    ]}
                  >
                    Verificar disponibilidade
                    <FaArrowRight />
                  </Button>
                </div>
              )}
              {step === 1 && (
                <div className="w-full">
                  <ShedulingAvaliabilities />
                </div>
              )}
              {step === 2 && (
                <div className="w-full">
                  <ShedulingFormInfo />
                </div>
              )}
              {step === 3 && (
                <div className="w-full">
                  <SchedulingResume />
                </div>
              )}
              {step === 4 && (
                <div className="w-full">
                  <SchedulingPayment />
                </div>
              )}
              {step === 5 && (
                <div className="w-full">
                  <SchedulingSuccess />
                </div>
              )}
              {step === 9 && (
                <div className="w-full">
                  <SchedulingError />
                </div>
              )}
            </XyzTransition>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
