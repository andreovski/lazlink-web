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

type Props = {
  children: React.ReactNode;
};

export function Scheduling({ children }: Props) {
  const serviceName = "Programação web";

  const form = useForm<any>({
    defaultValues: {
      step: 0,
      date: new Date(),
      hour: null,
      phone: "",
    },
  });

  const step = form.watch("step");

  const handleReset = () => {
    form.reset();
  };

  return (
    <Dialog onOpenChange={(e) => !e && handleReset()}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="h-full max-w-[600px] p-0 md:h-auto md:max-h-[600px]">
        <div className="flex h-full flex-col gap-4">
          <DialogHeader className="p-6 pb-0 text-lg font-semibold">
            {serviceName}
          </DialogHeader>

          <ScrollArea className="h-full w-full">
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(() => {})}
                className="flex h-[90svh] flex-col justify-between gap-4 p-6 pt-1 md:h-full"
              >
                {/* <XyzTransition apper xyz="fade ease-in-out-back right duration-3"> */}
                {step === 0 && (
                  <>
                    <div className="space-y-4">
                      <p>
                        Descrição do serviço ofertado, sem truncamento do texto.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Descrição do serviço ofertado,
                      </p>
                      <p className="flex gap-2">
                        Valor do serviço:{" "}
                        <p className="text-md font-semibold">R$ 99,90</p>
                      </p>
                    </div>

                    <Button
                      className="mt-30 flex gap-2"
                      onClick={() => form.setValue("step", 1)}
                    >
                      Verificar disponibilidade
                      <FaArrowRight />
                    </Button>
                  </>
                )}
                {step === 1 && <ShedulingAvaliabilities />}
                {step === 2 && <ShedulingFormInfo />}
                {/* </XyzTransition> */}
              </form>
            </FormProvider>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
