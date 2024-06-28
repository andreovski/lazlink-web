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
import { Upgrade } from "../upgrade";

const themeComponent: { [key: string]: React.ReactElement } = {
  default: <ThemeDefault />,
  alternative: <ThemeAlternative />,
};

export function Profile() {
  const isPremiumUser = false;
  const userTheme = "default";

  const contentH = isPremiumUser ? "md:h-[91dvh]" : "md:h-[85dvh]";
  const footerH = isPremiumUser ? "md:h-[8dvh]" : "md:h-[15dvh]";

  return (
    <div className="flex flex-col">
      <div className={`overflow-y-auto ${contentH}`}>
        {themeComponent[userTheme]}
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
                Editar Serviços
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
    </div>
  );
}
