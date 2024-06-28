import { Button } from "@/components/ui/button";
import { TextClamped } from "@/components/ui/text-clamped";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";
import { FaArrowLeft, FaArrowRight, FaCalendar, FaClock } from "react-icons/fa";

export function SchedulingResume() {
  const form = useFormContext();

  const step = form.watch("step");

  return (
    <div className="flex h-full flex-col gap-4">
      <p className="text-md">Seu agendamento será feito em:</p>

      <div className="flex w-full gap-4 rounded-sm bg-primary-100 px-4 py-2 dark:bg-primary-950">
        <p className="hidden font-semibold md:block">Data do agendamento:</p>
        <div className="flex items-center gap-x-2">
          <FaCalendar className="text-primary" />
          <p className="!font-sans">
            {format(new Date(), "dd' de 'MMM' de 'yyyy")}
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <FaClock className="text-primary" />
          <p className="!font-sans">12:00</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold">Programador Web</h1>
        <TextClamped lines={4}>
          Descrição do serviço ofertado, sem truncamento do texto. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </TextClamped>

        <p className="text-primary-600 dark:text-primary-400">
          Valor total do serviço: <b>R$ 99,90</b>
        </p>
      </div>

      <div className="mt-auto grid grid-cols-4 gap-2 md:mt-4">
        <Button
          onClick={() => form.setValue("step", step - 1)}
          variant="ghost"
          className="col-span-1 flex gap-2"
        >
          <FaArrowLeft />
          Voltar
        </Button>
        <Button
          onClick={() => form.setValue("step", step + 1)}
          className="col-span-3 gap-2"
        >
          Continuar
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
}
