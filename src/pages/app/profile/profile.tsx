import { useEffect } from "react";
import {
  FaArrowCircleUp,
  FaClock,
  FaCog,
  FaEdit,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { Logout } from "@/components/layouts/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Brand } from "@/components/ui/brand";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Spinner } from "@/components/ui/spinner";
import { useAppContext } from "@/context/app-context";

import {
  SettingsProfile,
  SettingsSchedules,
  SettingsServicos,
} from "../settings";
import { Upgrade } from "../upgrade";
import { ProfileInfo } from "./profile-info";
import { ProfileServices } from "./profile-services";

export function Profile() {
  const { username } = useParams();
  const { isAuthenticated, setUsername } = useAppContext();

  useEffect(() => {
    if (username) {
      setUsername(username);
    }
  }, [setUsername, username]);

  return (
    <div className="flex h-[100dvh] flex-col">
      {!isAuthenticated ? (
        <ProfileNotAuthenticated />
      ) : (
        <ProfileAuthenticated />
      )}

      <Logout />
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
        <div className="flex w-full md:flex-1">
          <ProfileServices />
        </div>
      </div>

      {!isPremiumUser && (
        <div className={`mt-auto flex w-full flex-col md:h-[8dvh]`}>
          <Brand />
        </div>
      )}

      <Button
        variant={"ghost"}
        className="absolute right-2 top-2 flex items-center gap-2"
        onClick={() => [window.open("/login")]}
      >
        Login
        <FaSignInAlt />
      </Button>
    </>
  );
}

function ProfileAuthenticated() {
  const { professional, resetState } = useAppContext();

  const isPremiumUser = professional?.premium;

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
        <div className="flex w-full md:flex-1">
          <ProfileServices />
        </div>
      </div>

      <div className={`flex w-full flex-col ${footerH} mt-auto`}>
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

      <Button
        variant={"ghost"}
        className="absolute right-2 top-2 flex items-center gap-2"
        onClick={() => [resetState()]}
      >
        Sair
        <FaSignOutAlt />
      </Button>
    </>
  );
}
