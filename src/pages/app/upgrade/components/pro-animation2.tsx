import { themeFonts } from "@/theme/fonts/theme-fonts";
import "./style2.css";
import { useEffect, useState } from "react";

export function ProAnimation2() {
  const themeFont: any = Object.keys(themeFonts);

  const [font, setFont] = useState(themeFonts[1]);

  const getRandomString = () => {
    const randomIndex = Math.floor(Math.random() * themeFont.length);
    return themeFont[randomIndex];
  };

  useEffect(() => {
    // Atualiza a string a cada 3 segundos
    const intervalId = setInterval(() => {
      setFont(getRandomString());
    }, 3500);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container flex flex-col gap-2 rounded rounded-r-none">
      <h1 className="text-3xl font-semibold text-white">Premium</h1>
      <p className={`text-1xl ${font} font-medium text-white`}>André Luiz</p>
    </div>
  );
}
