import { Button } from "@/components/ui/button";
import { LabelClamped } from "@/components/ui/label-clamped";
import { FaCalendar } from "react-icons/fa";

export function ThemeDefaultServices() {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <h1 className="flex text-xl font-semibold">Serviços</h1>

      <div className="flex flex-col gap-3">
        <div className="flex max-h-[500px] flex-col gap-3 overflow-auto">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="">
                <h1 className="text-lg font-medium">Nome do serviço</h1>
                <LabelClamped lines={3}>
                  Descrição do serviço ofertado, truncado em 2 ou 3 linhas com
                  opção ”ler mais...” Descrição do serviço ofertado, truncado em
                  opção ”ler mais...” Descrição do serviço ofertado, truncado em
                </LabelClamped>

                <p className="flex justify-end gap-1">
                  <p className="text-sm">R$</p>
                  120,00
                </p>
              </div>

              <Button variant="ghost">
                <FaCalendar />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
