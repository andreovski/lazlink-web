import { Button } from "@/components/ui/button";
import { FaArrowCircleUp, FaClock, FaCog, FaEdit } from "react-icons/fa";
import { Brand } from "@/components/ui/brand";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import {
  SettingsProfile,
  SettingsSchedules,
  SettingsServicos,
} from "../settings";
import { Upgrade } from "../upgrade";
import { useAppContext } from "@/context/app-context";
import { ProfileInfo } from "./profile-info";
import { ProfileServices } from "./profile-services";

export function Profile() {
  const { isAuthenticated } = useAppContext();

  return (
    <div className="flex flex-col">
      {!isAuthenticated ? (
        <ProfileNotAuthenticated />
      ) : (
        <ProfileAuthenticated />
      )}
    </div>
  );
}

function ProfileNotAuthenticated() {
  const { professional } = useAppContext();

  const isPremiumUser = professional?.premium;

  const contentH = isPremiumUser ? "md:h-screen" : "md:h-[91dvh]";

  return (
    <>
      <div
        className={`overflow-y-auto ${contentH} relative flex w-full flex-wrap justify-center gap-6 bg-background px-7 pt-8 md:justify-start md:px-24 md:pt-16`}
      >
        <div className="flex flex-col gap-4 md:flex-1">
          <ProfileInfo />
        </div>
        <div className="flex md:flex-1">
          <ProfileServices />
        </div>
      </div>

      {!isPremiumUser && (
        <div className={`flex w-full flex-col md:h-[8dvh]`}>
          <Brand />
        </div>
      )}
    </>
  );
}

function ProfileAuthenticated() {
  const { professional } = useAppContext();

  const isPremiumUser = professional?.premium;
  // const userTheme = professional?.theme.profile || "default";

  const contentH = isPremiumUser ? "md:h-[91dvh]" : "md:h-[85dvh]";
  const footerH = isPremiumUser ? "md:h-[8dvh]" : "md:h-[15dvh]";

  const professionalServices = professional?.services;

  return (
    <>
      <div
        className={`overflow-y-auto ${contentH} relative flex w-full flex-wrap justify-center gap-6 bg-background px-7 pt-8 md:justify-start md:px-24 md:pt-16`}
      >
        <div className="flex flex-col gap-4 md:flex-1">
          <ProfileInfo />
        </div>
        <div className="flex md:flex-1">
          <ProfileServices />
        </div>
      </div>

      <div className={`flex w-full flex-col ${footerH}`}>
        {!isPremiumUser && <Brand />}
        <div className="flex flex-wrap justify-between gap-2 px-4 py-4 md:px-24">
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button className="flex w-full gap-2 md:w-0 md:flex-1">
                <FaEdit />
                Editar Perfil
              </Button>
            </DrawerTrigger>

            <SettingsProfile />
          </Drawer>

          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button className="flex w-[48%] gap-2 md:flex-1">
                <FaClock />
                Editar Horários
              </Button>
            </DrawerTrigger>

            <SettingsSchedules />
          </Drawer>

          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button className="flex w-[48%] gap-2 md:flex-1">
                <FaCog />
                {professionalServices.length
                  ? "Editar Serviços"
                  : "Adicionar Serviços"}
              </Button>
            </DrawerTrigger>

            <SettingsServicos />
          </Drawer>

          {!isPremiumUser && (
            <Upgrade>
              <Button
                variant="solid"
                className="flex w-full gap-2 md:w-0 md:flex-1"
              >
                <FaArrowCircleUp />
                Seja Premium
              </Button>
            </Upgrade>
          )}
        </div>
      </div>
    </>
  );
};