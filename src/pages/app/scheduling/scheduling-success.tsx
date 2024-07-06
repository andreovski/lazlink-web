import { Button } from "@/components/ui/button";
import { TextClamped } from "@/components/ui/text-clamped";
import { format, toZonedTime } from "date-fns-tz";
import { useFormContext } from "react-hook-form";
import {
  FaCalendar,
  FaCheckCircle,
  FaClock,
  FaGoogle,
  FaWhatsapp,
} from "react-icons/fa";

export function SchedulingSuccess() {
  const form = useFormContext();

  // TODO: FIX HOUR
  const [date, hour] = form.watch(["date", "hour"]);

  const formattedDate = format(
    toZonedTime(new Date(date).setHours(hour), "UTC"),
    "yyyyMMdd'T'HHmmss'Z'",
    {
      timeZone: "UTC",
    },
  );

  const handleGoogleCalendar = () => {
    // TODO: SET INTERVAL OF SERVICE - SET EVENT NAME
    window.open(
      `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${formattedDate}/${formattedDate}&text=`,
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="flex w-full items-center justify-center gap-2 text-center text-2xl font-semibold text-foreground">
        <FaCheckCircle className="text-primary" />
        Deu tudo certo!
      </h1>

      <p className="">
        Seu agendamento foi confirmado e já avisamos o profissional. Também
        vamos te enviar um lembrete próximo da data, ok?
      </p>

      <div className="relative rounded-md border p-4">
        <h1 className="text-lg font-semibold">Programador WEB</h1>
        <TextClamped lines={4}>
          Descrição do serviço ofertado, sem truncamento do texto. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </TextClamped>

        <div className="mb-8 flex gap-4">
          <div className="flex items-center gap-x-2">
            <FaCalendar className="text-primary" />
            <p className="!font-sans font-semibold">
              {format(new Date(), "dd' de 'MMM' de 'yyyy")}
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <FaClock className="text-primary" />
            <p className="!font-sans font-semibold">12:00</p>
          </div>
        </div>

        <Button
          onClick={handleGoogleCalendar}
          className="absolute bottom-0 right-0 flex w-full gap-2 rounded-b-sm rounded-t-none"
        >
          <FaGoogle />
          Adicionar à minha agenda
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Caso tenha alguma dúvida, entre em contato diretamente com o
          profissional:
        </p>

        <Button variant="outline" className="flex gap-2">
          <FaWhatsapp />
          Chame no WhatsApp
        </Button>
      </div>
    </div>
  );
}
