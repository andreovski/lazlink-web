import { format } from "date-fns";
import { useFormContext } from "react-hook-form";
import { FaArrowLeft, FaArrowRight, FaCalendar, FaClock } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/ui/input";
import { InputPhone } from "@/components/ui/input-phone";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Xyz } from "@/utils/xyz";

export function ShedulingFormInfo() {
  const form = useFormContext();

  const errorPhone = form.formState.errors?.phone;
  const errorWhatsappPhone = form.formState.errors?.whatsappPhone;

  const [step, name, phone, email, isWhatsApp] = form.watch([
    "step",
    "name",
    "phone",
    "email",
    "isWhatsApp",
  ]);

  const isFormCompleted = name && phone && email;

  const handleValidate = async () => {
    const isValidated = await form.trigger([
      "name",
      "phone",
      "isWhatsApp",
      "whatsappPhone",
      "email",
    ]);

    if (isValidated) {
      form.setValue("isBacking", false);
      // ? timeout to preserve the direction of the animation
      setTimeout(() => form.setValue("step", step + 1), 150);
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <p className="text-sm">
        Precisamos de algumas informações para continuar com o seu agendamento.
      </p>

      <div className="flex w-full gap-4 rounded-sm bg-primary-100 px-4 py-2 dark:bg-primary-950">
        <p className="hidden font-semibold md:block">Data selecionada:</p>
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

      <div className="mt-4 space-y-2">
        <InputForm name="name" label="Nome completo" />

        <div className="space-y-2">
          <Label className="text-sm font-medium" htmlFor="phone">
            Telefone
          </Label>
          <InputPhone
            id="phone"
            error={form.formState.errors?.phone as any}
            defaultCountry="BR"
            onChange={(e) => form.setValue("phone", e)}
          />
          {errorPhone?.message && (
            <p className="text-xs font-medium text-red-600">
              {errorPhone.message as any}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2 py-2">
          <Switch
            id="isWhatsApp"
            checked={isWhatsApp}
            onCheckedChange={(e) => [form.setValue("isWhatsApp", e)]}
          />
          <Label htmlFor="isWhatsApp" className="text-sm">
            Esse telefone também é WhatsApp
          </Label>
        </div>

        <Xyz condition={!isWhatsApp} xyz="fade down duration-3">
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="whatsappPhone">
              WhatsApp
            </Label>
            <InputPhone
              id="whatsappPhone"
              error={form.formState.errors?.phone}
              defaultCountry="BR"
              onChange={(e) => form.setValue("whatsappPhone", e)}
            />
            {errorWhatsappPhone?.message && (
              <p className="text-xs font-medium text-red-600">
                {errorWhatsappPhone.message as string}
              </p>
            )}
          </div>
        </Xyz>

        <InputForm name="email" type="email" label="E-mail" />
      </div>

      <div className="mt-auto grid grid-cols-4 gap-2 md:mt-4">
        <Button
          onClick={() => [
            form.setValue("isBacking", true),
            // ? timeout to preserve the direction of the animation
            setTimeout(() => form.setValue("step", step - 1), 150),
          ]}
          variant="ghost"
          className="col-span-1 flex gap-2"
        >
          <FaArrowLeft />
          Voltar
        </Button>
        <Button
          disabled={!isFormCompleted}
          onClick={() => handleValidate()}
          className="col-span-3 gap-2"
        >
          Continuar
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
}
