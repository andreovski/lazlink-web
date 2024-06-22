import { Button } from "@/components/ui/button";
import { FaArrowCircleUp, FaClock, FaCog, FaEdit } from "react-icons/fa";
import { Brand } from "@/components/ui/brand";
import { ThemeDefault } from "./themes/theme-default";
import { ThemeAlternative } from "./themes/theme-alternative";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import {
  SettingsProfile,
  SettingsSchedules,
  SettingsServicos,
} from "../settings";

const themeComponent: { [key: string]: React.ReactElement } = {
  default: <ThemeDefault />,
  alternative: <ThemeAlternative />,
};

export function Profile() {
  const isPremiumUser = false;
  const userTheme = "default";

  return (
    <div className="flex flex-col">
      <div className="overflow-y-auto md:h-[85vh]">
        {themeComponent[userTheme]}
      </div>

      <div className="flex w-full flex-col md:h-[15vh]">
        <Brand />
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
                Editar Serviços
              </Button>
            </DrawerTrigger>

            <SettingsServicos />
          </Drawer>

          {!isPremiumUser && (
            <Button
              variant="solid"
              className="flex w-full gap-2 md:w-0 md:flex-1"
            >
              <FaArrowCircleUp />
              Seja Premium
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
