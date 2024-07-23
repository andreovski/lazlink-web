import { XyzTransition } from "@animxyz/react";
import { useState } from "react";
import { FaArrowRight, FaCaretRight, FaCheckCircle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { ProAnimation2 } from "./components/pro-animation2";
import { UpgradeConfirm } from "./upgrade-confirm";

type Props = {
  children: React.ReactNode;
};

export function Upgrade({ children }: Props) {
  const [step, setStep] = useState(0);

  const handleChangeStep = () => setStep((old) => old + 1);
  const handleGoBack = () => setStep((old) => old - 1);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        close={false}
        className="p-3 md:w-[560px] md:max-w-[560px]"
      >
        {step === 0 && <UpgradeContent onUpgrade={handleChangeStep} />}
        {step === 1 && <UpgradeConfirm goBack={handleGoBack} />}
      </DialogContent>
    </Dialog>
  );
}

function UpgradeContent({ onUpgrade }: { onUpgrade(): void }) {
  return (
    <div className="xyz-nested flex flex-col gap-2">
      <div className="grid grid-cols-3 rounded-lg border border-input bg-background">
        <div className="col-span-1 flex h-full items-center justify-center rounded-lg rounded-r-none bg-primary-300">
          <ProAnimation2 />
        </div>
        <div className="col-span-2 flex flex-col gap-2 py-2 pl-4 pr-2">
          <h1 className="font-semibold">
            Assine o premium e tenhas as seguintes vantagens:
          </h1>
          <ul className="flex list-none flex-col gap-1">
            <li className="flex items-center gap-1 text-sm font-medium">
              <FaCheckCircle className="text-md text-emerald-600" />
              Acesso a todos os temas.
            </li>
            <li className="flex items-center gap-1 text-sm font-medium">
              <FaCheckCircle className="text-md text-emerald-600" />
              Acesso a todas as fontes.
            </li>
            <li className="flex items-center gap-1 text-sm font-medium">
              <FaCheckCircle className="text-md text-emerald-600" />5 botões
              para link externo.
            </li>
            <li className="flex items-center gap-1 text-sm font-medium">
              <FaCheckCircle className="text-md text-emerald-600" />
              Integração com WhatsApp.
            </li>
            <li className="flex items-center gap-1 text-sm font-medium">
              <FaCheckCircle className="text-md text-emerald-600" />
              Sem logo Lazlink.
            </li>
          </ul>

          <Button onClick={onUpgrade} className="flex gap-2">
            Assinar a versão premium
            <FaArrowRight />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 rounded-lg border border-input bg-background">
        <div className="relative col-span-1 flex items-center justify-center">
          <h1 className="text-2xl font-medium">Gratuito</h1>
          <Separator
            className="absolute bottom-1 right-0 h-[90%]"
            orientation="vertical"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-2 py-2 pl-4 pr-2">
          <h1 className="font-semibold">O seu plano gratuito está incluso:</h1>
          <ul className="flex list-disc flex-col gap-1">
            <li className="flex items-center gap-1 text-sm font-medium">
              <FaCaretRight className="text-md" />
              10 agendamentos por mês
            </li>
            <li className="flex items-center gap-1 text-sm font-medium">
              <FaCaretRight className="text-md" />1 botão para link externo
            </li>
            <li className="flex items-center gap-1 text-sm font-medium">
              <FaCaretRight className="text-md" />2 opcoes tema
            </li>
          </ul>
        </div>
      </div>

      <DialogClose asChild>
        <Button className="mt-3" variant="ghost">
          Fechar
        </Button>
      </DialogClose>
    </div>
  );
}
