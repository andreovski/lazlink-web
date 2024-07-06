import {
  FaExternalLinkAlt,
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
import { formatAddress, pickInitialNames } from "@/utils";
import { useAppContext } from "@/context/app-context";
import { useLoader } from "@/utils/loader";

export function ProfileInfo() {
  const { isLoadingProfessional, professional, userGoogleAccessToken } =
    useAppContext();
  console.log(
    "🚀 ~ ProfileInfo ~ userGoogleAccessToken:",
    userGoogleAccessToken,
  );
  const { loader } = useLoader({
    isLoading: isLoadingProfessional,
  });

  const avatarURL = professional.avatarUrl || "";
  const userName = professional.name;

  const externalLinks = professional.externalLinks;

  const handleOpenSocialLinks = {
    instagram: () =>
      window.open(`https://www.instagram.com/${professional.instagramUrl}/`),
    facebook: () =>
      window.open(`https://pt-br.facebook.com/${professional.facebookUrl}/`),
    linkedin: () =>
      window.open(`https://www.linkedin.com/in/${professional.linkedInUrl}/`),
    twitter: () => window.open(`https://x.com/${professional.twitterUrl}/`),
  };

  return (
    <>
      <div className="flex gap-4">
        {loader(
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarURL} alt={`@${userName}`} />
            <AvatarFallback className="m-auto">
              {pickInitialNames(userName)}
            </AvatarFallback>
          </Avatar>,
          { loadClass: "h-16 w-16 rounded-full" },
        )}

        <div className="flex flex-col">
          {loader(<h1 className="text-3xl font-medium">{userName}</h1>, {
            loadClass: "h-8 w-40 mb-2 rounded-lg",
          })}

          {loader(
            <p className="text-md font-medium">{professional.workTitle}</p>,
            {
              loadClass: "h-4 w-[200px]",
            },
          )}
        </div>
      </div>

      {loader(<TextClamped lines={4}>{professional.about!}</TextClamped>, {
        loadClass: "h-4 w-full",
        multiple: 4,
        condition: !!professional.about?.length,
      })}

      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <div className="flex items-center gap-2">
          {professional.showAddress && (
            <FaMapMarkerAlt className="mt-1 text-primary" />
          )}
          {loader(<p>{formatAddress(professional.address)}</p>, {
            loadClass: "h-4 w-[310px]",
            condition: professional.showAddress,
          })}
        </div>

        <div className="mt-4 flex justify-center gap-4 text-primary md:mt-0">
          {loader(
            <FaInstagram
              onClick={() => handleOpenSocialLinks["instagram"]()}
              className="cursor-pointer text-xl"
            />,
            {
              loadClass: "h-4 w-4 rounded-full",
              condition: !!professional.instagramUrl,
            },
          )}
          {loader(
            <FaFacebook
              onClick={() => handleOpenSocialLinks["facebook"]()}
              className="cursor-pointer text-xl"
            />,
            {
              loadClass: "h-4 w-4 rounded-full",
              condition: !!professional.facebookUrl,
            },
          )}
          {loader(
            <FaLinkedin
              onClick={() => handleOpenSocialLinks["linkedin"]()}
              className="cursor-pointer text-xl"
            />,
            {
              loadClass: "h-4 w-4 rounded-full",
              condition: !!professional.linkedInUrl,
            },
          )}
          {loader(
            <FaTwitter
              onClick={() => handleOpenSocialLinks["twitter"]()}
              className="cursor-pointer text-xl"
            />,
            {
              loadClass: "h-4 w-4 rounded-full",
              condition: !!professional.twitterUrl,
            },
          )}
        </div>
      </div>

      {loader(
        <Button variant="outline" className="mt-2 flex w-full gap-2">
          <FaWhatsapp className="text-lg" />
          Chame no WhatsApp
        </Button>,
        {
          loadClass: "h-9",
          condition: professional.premium && !!professional.cellphone,
        },
      )}

      {!isLoadingProfessional && externalLinks?.length && (
        <div className="flex w-full flex-col">
          <div className="flex flex-col items-center gap-2">
            {externalLinks.map(({ label, link }) => (
              <Button
                onClick={() => window.open(link, "_blank")}
                className="flex h-8 w-full items-center gap-2 p-0"
              >
                <FaExternalLinkAlt className="text-prmiary" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
