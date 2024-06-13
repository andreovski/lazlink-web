import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";

export function FirstAccessConfigThemeForm() {
  const { setValue } = useFormContext();

  const handleSelectTheme = (themeIndex: number) => {
    setValue("theme", themeIndex);
    setValue("step", 3);
  };

  return (
    <div className="my-3 flex w-full flex-col space-y-8">
      <p>Escolha um modelo para sua página personalizada:</p>

      <div className="flex h-[480px] w-full gap-2 overflow-auto scroll-smooth">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="flex h-full min-w-[300px] flex-col gap-4 rounded bg-primary p-[24px]"
          >
            <h1 className="mt-auto text-lg font-medium text-white">Modelo</h1>
            <p className="text-sm text-white">
              Descrição do modelo explicando para quem ele é melhor indicado.
            </p>

            <Button
              className="flex gap-3"
              variant="secondary"
              onClick={() => handleSelectTheme(idx)}
            >
              Escolher esse
              <FaArrowRight />
            </Button>
          </div>
        ))}
      </div>

      <p className="w-full text-center text-sm">
        Se você mudar de ideia, dá para trocar por outro modelo depois. :)
      </p>
    </div>
  );
}
