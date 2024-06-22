import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useFormContext } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ptBR } from "date-fns/locale";

export function ShedulingAvaliabilities() {
  const form = useFormContext();

  const [date, hour, step] = form.watch(["date", "hour", "step"]);

  return (
    <>
      <p className="text-sm text-primary-800 dark:text-primary-100">
        Verifique os dias e horários disponíveis para realizar um agendamento do
        serviço escolhido.
      </p>

      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4">
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={new Date()}
          onSelect={(e) => form.setValue("date", e)}
          className="col-span-2 rounded-md border"
          locale={ptBR}
        />

        <ScrollArea className="h-full md:h-[330px]">
          <ToggleGroup
            type="single"
            variant="outline"
            className="flex flex-col gap-2"
          >
            {Array.from({ length: 5 }).map((_, idx) => {
              return (
                <ToggleGroupItem
                  value={idx.toString()}
                  onClick={() => form.setValue("hour", idx.toString())}
                  className="w-full justify-start p-2"
                  key={idx}
                >
                  12:00
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </ScrollArea>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 pb-4">
        <Button
          onClick={() => form.setValue("step", step - 1)}
          variant="ghost"
          className="col-span-1 flex gap-2"
        >
          <FaArrowLeft />
          Voltar
        </Button>
        <Button
          disabled={!hour}
          onClick={() => form.setValue("step", step + 1)}
          className="col-span-3 gap-2"
        >
          Continuar
          <FaArrowRight />
        </Button>
      </div>
    </>
  );
}
