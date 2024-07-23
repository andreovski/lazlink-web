import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";

import { Button } from "@/components/ui/button";

import { ProAnimation2 } from "./components/pro-animation2";

export function UpgradeConfirm({
  goBack,
  close,
}: {
  goBack?: () => void;
  close?: () => void;
}) {
  return (
    <>
      <div className="grid grid-cols-3 rounded-lg border border-input bg-background">
        <div className="relative col-span-1 flex h-full items-center justify-center rounded-lg rounded-r-none bg-primary-300">
          {goBack && !close && (
            <Button
              variant="ghost"
              className="absolute left-1 top-1 flex gap-2 text-background"
              onClick={goBack}
            >
              <FaArrowLeft />
              Voltar
            </Button>
          )}
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

          <div className="mt-4 flex flex-col gap-y-2">
            <Button>12x R$ 10,90 anual</Button>
            <Button variant="outline">R$ 14,90 mensal</Button>
          </div>

          <p className="text-xs text-neutral-600">
            Ao adquirir a versão premium, você terá acesso a todos os benefício
            descritos, mais os benefícios que já possui no plano gratuito.
          </p>
        </div>
      </div>
      {close && (
        <Button onClick={() => close()} variant="ghost">
          Fechar
        </Button>
      )}
    </>
  );
}
