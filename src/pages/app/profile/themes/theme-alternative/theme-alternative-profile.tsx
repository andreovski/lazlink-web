import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TextClamped } from "@/components/ui/text-clamped";
import { pickInitialNames } from "@/utils";

export function ThemeAlternativeProfile() {
  const avatarURL = "https://github.com/andreovski.png";
  const userName = "André Luiz";

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={avatarURL} alt="@Andre" />
          <AvatarFallback className="m-auto">
            {pickInitialNames(userName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col text-center">
          <h1 className="text-3xl font-medium">{userName}</h1>
          <p className="text-md font-medium">Programador</p>
        </div>
      </div>

      <TextClamped lines={4}>
        Espaço semelhante a uma bio do Instagram. Permite textos com um limite
        alto de caracteres, porém trunca a visualização inicial em 4 ou 5 linhas
        exibindo um ”ler mais...” para expandir. Espaço semelhante a uma bio do
        Instagram. Permite textos com um limite alto de caracteres, porém trunca
        a visualização inicial em 4 ou 5 linhas exibindo um ”ler mais...” para
        expandir. Espaço semelhante a uma bio do Instagram. Permite textos com
        um limite alto de caracteres, porém trunca a visualização inicial em 4
        ou 5 linhas exibindo um ”ler mais...” para expandir. Espaço semelhante a
        uma bio do Instagram. Permite textos com um limite alto de caracteres,
        porém trunca a visualização inicial em 4 ou 5 linhas exibindo um ”ler
        mais...” para expandir. Espaço semelhante a uma bio do Instagram.
        Permite textos com um limite alto de caracteres, porém trunca a
        visualização inicial em 4 ou 5 linhas exibindo um ”ler mais...” para
        expandir. Espaço semelhante a uma bio do Instagram. Permite textos com
        um limite alto de caracteres, porém trunca a visualização inicial em 4
        ou 5 linhas exibindo um ”ler mais...” para expandir.
      </TextClamped>

      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <div className="space-y-1">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              <p>Rua Benedito da silva, 23 - Curitiba PR</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-4 text-primary md:mt-0">
          <FaInstagram className="cursor-pointer text-xl" />
          <FaFacebook className="cursor-pointer text-xl" />
          <FaLinkedin className="cursor-pointer text-xl" />
          <FaTwitter className="cursor-pointer text-xl" />
        </div>
      </div>

      <Button variant="outline" className="mt-2 flex w-full gap-2">
        <FaWhatsapp className="text-lg" />
        Chame no WhatsApp
      </Button>
    </>
  );
}
