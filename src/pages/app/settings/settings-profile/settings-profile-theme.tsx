import { BubbleTheme } from "@/components/ui/bubble-theme";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AppThemes, themeColors } from "@/theme/colors/theme-colors";
import { FaAdjust, FaChevronRight, FaFont, FaTimes } from "react-icons/fa";
import { ThemeDefaultProfile } from "../../profile/themes/theme-default/theme-default-profile";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "@/theme/theme-provider";
import { ThemeFonts, fontsFamily, themeFonts } from "@/theme/fonts/theme-fonts";

export function SettingsProfileTheme() {
  const { theme } = useTheme();

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="link" className="px-0" asChild>
          <div className="flex w-full cursor-pointer justify-between">
            <div className="flex items-center justify-start gap-2">
              <BubbleTheme {...themeColors[theme]} />
              <p className="pointer-events-none font-medium text-foreground">
                {themeColors[theme].title}
              </p>
            </div>

            <FaChevronRight className="pointer-events-none" />
          </div>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-[100%]" overlay={false}>
        <div className="flex justify-between p-4">
          <DrawerTitle className="text-lg">Editar Tema</DrawerTitle>
          <DrawerClose>
            <FaTimes />
          </DrawerClose>
        </div>

        <SettingsProfileThemeContent />
      </DrawerContent>
    </Drawer>
  );
}

function SettingsProfileThemeContent() {
  const { theme, setTheme, setFontTheme, fontTheme } = useTheme();

  const userName = "André Luiz";

  return (
    <div className="overflow-auto">
      <div className="m-4 my-1 flex flex-col gap-6">
        <div className="flex flex-col gap-2 bg-background py-2">
          <p className="font-medium">Pré-visualização</p>
          <div className="pointer-events-none flex flex-col gap-4 rounded-md border border-input p-4 md:flex-1">
            <ThemeDefaultProfile />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="flex items-center gap-2 font-semibold">
            <FaAdjust className="text-lg" />
            Cores
          </h1>

          <ToggleGroup
            type="single"
            className="grid grid-cols-2 gap-2"
            variant="outline"
            defaultValue={theme}
          >
            {Object.entries(themeColors).map(([name, theme]) => (
              <ToggleGroupItem
                key={theme.title}
                value={name}
                onClick={() => setTheme(name as AppThemes)}
                className="h-12 justify-start gap-2 p-2"
              >
                <BubbleTheme {...theme} />
                {theme.title}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="my-2 space-y-2">
          <h1 className="flex items-center gap-2 font-semibold">
            <FaFont className="text-lg" />
            Fonte
          </h1>

          <ToggleGroup
            type="single"
            className="grid grid-cols-1 gap-2"
            variant="outline"
            defaultValue={fontTheme}
          >
            {Object.entries(themeFonts).map(([name]) => (
              <ToggleGroupItem
                key={name}
                value={name}
                onClick={() => setFontTheme(name as ThemeFonts)}
                className={`${name} h-12 justify-start gap-4 p-4`}
              >
                <span className="text-lg">{userName}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
}
