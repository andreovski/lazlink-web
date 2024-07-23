import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { Spinner } from "@/components/ui/spinner";

export function SchedulingPayment() {
  // TODO:
  const form = useFormContext();

  const step = form.watch("step");

  useEffect(() => {
    setTimeout(() => {
      form.setValue("step", step + 1);
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <Spinner />
      <p className="text-sm font-medium">Carregando meios de pagamento...</p>
    </div>
  );
}
