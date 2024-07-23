import { FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function SchedulingError() {
  const retry = () => {};

  return (
    <div className="flex flex-col gap-4">
      <h1 className="flex w-full items-center justify-center gap-2 text-center text-2xl font-semibold text-foreground">
        <FaExclamationCircle className="text-primary" />
        Ops!
      </h1>
      <p className="text-center">
        Parece que algo deu errado com o seu pagamento. Vamos tentar novamente?
      </p>

      <div className="mt-4 space-y-2">
        <Button className="flex w-full" onClick={retry}>
          Tentar novamente
        </Button>

        <Alert>
          <FaInfoCircle className="h-8 w-8" />
          <p className="text-sm">
            Seus dados estão seguros, seu pagamento será processado pela{" "}
            <b>Pagar.me</b>, uma empresa do grupo Stone.
          </p>
        </Alert>
      </div>
    </div>
  );
}
