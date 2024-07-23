import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Logo } from "@/assets/logo";
import { Button } from "@/components/ui/button";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="h-[100dvh] w-full bg-[url('/src/assets/landing.png')] bg-cover bg-center p-4">
      <p className="flex h-[8dvh] justify-center text-white">
        <Logo />
      </p>

      <div className="flex h-[90dvh] w-full flex-col items-center justify-center gap-4">
        <h1 className="w-[580px] text-center font-sans text-4xl font-bold text-white">
          Economize tempo com a gestão da sua agenda
        </h1>
        <p className="w-[580px] font-sans text-2xl text-white">
          Marcação de horário e pagamento de sinal, tudo no mesmo lugar: aqui
          tem!
        </p>

        <Button
          className="mt-12 flex gap-2 bg-brand text-white"
          onClick={() => navigate("/login")}
        >
          Começe agora
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
}
