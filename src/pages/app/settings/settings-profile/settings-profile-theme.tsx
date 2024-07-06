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
import {
  FaAdjust,
  FaChevronRight,
  FaFont,
  FaLock,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { ProfileInfo } from "../../profile/profile-info";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "@/theme/theme-provider";
import { ThemeFonts, themeFonts } from "@/theme/fonts/theme-fonts";
import { useRef } from "react";
import { useForm, useFormContext } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDisclosure } from "@/utils/hooks/useDisclosure";
import { DialogUpdateConfirm } from "@/components/dialogs/dialog-update-confirm";
import { useAppContext } from "@/context/app-context";
import {
  queryKeyGetProfessionalById,
  useMutationPutProfessional,
} from "@/api/professional";
import { SettingsProfileValidationSchema } from ".";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { convertEmptyStringsToNull } from "@/utils";

type FormData = {
  color: AppThemes;
  font: ThemeFonts;
  profile: string;
};

export function SettingsProfileTheme() {
  const { isOpen, close, open } = useDisclosure({ opened: false });
  const { theme } = useTheme();

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(e) => (e ? open() : close())}
      direction="right"
    >
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

      <DrawerContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onKeyDown={(e) => (e.keyCode === 27 ? e.preventDefault() : {})}
        className="h-[100%]"
        overlay={false}
      >
        <SettingsProfileThemeContent onClose={close} />
      </DrawerContent>
    </Drawer>
  );
}

function SettingsProfileThemeContent({ onClose }: { onClose: () => void }) {
  const { professional } = useAppContext();

  const premiumDialog = useDisclosure({ opened: false });
  const { theme, setTheme, setFontTheme, fontTheme, profileTheme } = useTheme();

  const initialTheme = useRef(theme);
  const initialFontTheme = useRef(fontTheme);

  const queryClient = useQueryClient();
  const formContext = useFormContext<SettingsProfileValidationSchema>();

  const form = useForm<FormData>({
    defaultValues: {
      font: fontTheme,
      color: theme,
      profile: profileTheme,
    },
  });

  const [themeValue, fontThemeValue] = form.watch(["color", "font"]);

  const userName = "André Luiz";
  const userIsPremium = professional.premium;

  const isEdited =
    initialTheme.current !== theme || initialFontTheme.current !== fontTheme;

  const onDiscardChanges = () => {
    setTheme(initialTheme.current);
    setFontTheme(initialFontTheme.current as ThemeFonts);

    onClose();
  };

  const { mutate } = useMutationPutProfessional({
    onSuccess: (data) => {
      formContext.setValue("theme", data.theme);
      queryClient.setQueryData([queryKeyGetProfessionalById, data._id], data);

      toast({
        title: "Tema alterado com sucesso!",
        variant: "success",
      });
      onClose();
    },
  });

  const onSubmit = (v: FormData) => {
    const { isPremium: isThemePremium } = themeColors[v.color];
    const { isPremium: isFontPremium } = themeFonts[v.font];

    const isThemeOrFontPremium = isThemePremium || isFontPremium;

    if (!userIsPremium && isThemeOrFontPremium) {
      return premiumDialog.open();
    }

    const valuesFormContext = convertEmptyStringsToNull(formContext.getValues());

    return mutate({
      ...valuesFormContext,
      theme: v,
    });
  };

  return (
    <>
      <div className="flex justify-between p-4">
        <DrawerTitle className="text-lg">Editar Tema</DrawerTitle>
        {isEdited ? (
          <DialogExitWithoutSave onDiscardChange={onDiscardChanges} />
        ) : (
          <DrawerClose>
            <FaTimes />
          </DrawerClose>
        )}
      </div>

      <form
        onSubmit={(e) => [form.handleSubmit(onSubmit)(e), e.stopPropagation()]}
        className="overflow-auto"
      >
        <div className="m-4 my-1 flex flex-col gap-6">
          <div className="flex flex-col gap-2 bg-background py-2">
            <p className="font-medium">Pré-visualização</p>
            <div className="pointer-events-none flex flex-col gap-4 rounded-md border border-input p-4 md:flex-1">
              <ProfileInfo />
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
              defaultValue={themeValue}
            >
              {Object.entries(themeColors).map(([name, theme]) => (
                <ToggleGroupItem
                  key={theme.title}
                  value={name}
                  onClick={() => [
                    setTheme(name as AppThemes),
                    form.setValue("color", name as AppThemes),
                  ]}
                  className="h-12 justify-between p-2"
                >
                  <div className="flex items-center gap-1 md:gap-2">
                    <BubbleTheme {...theme} />
                    {theme.title}
                  </div>
                  {!userIsPremium && theme.isPremium && (
                    <FaLock className="text-primary-800 dark:text-primary-400" />
                  )}
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
              defaultValue={fontThemeValue}
            >
              {Object.entries(themeFonts).map(([name, props]) => (
                <ToggleGroupItem
                  key={name}
                  value={name}
                  onClick={() => [
                    setFontTheme(name as ThemeFonts),
                    form.setValue("font", name as ThemeFonts),
                  ]}
                  className={`${name} h-12 justify-between gap-4 p-4`}
                >
                  <span className="text-lg">{userName}</span>
                  {!userIsPremium && props.isPremium && (
                    <FaLock className="text-primary-800 dark:text-primary-400" />
                  )}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>

        <div className="mb-2 p-3">
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="flex w-full gap-2"
          >
            <FaSave />
            Salvar tema
          </Button>
        </div>
      </form>

      <DialogUpdateConfirm {...premiumDialog} />
    </>
  );
}

function DialogExitWithoutSave({
  onDiscardChange,
}: {
  onDiscardChange: () => void;
}) {
  const { isOpen, close, open } = useDisclosure({ opened: false });

  return (
    <Popover open={isOpen} onOpenChange={(e) => (e ? open() : close())}>
      <PopoverTrigger>
        <FaTimes />
      </PopoverTrigger>
      <PopoverContent className="right-2 w-[380px] bg-background">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-md font-semibold">
              Você tem alterações não salvas!
            </h1>
            <p>Deseja descartar as alterações ou continuar editando?</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => [onDiscardChange(), close()]}
              variant="destructive"
            >
              Descartar alterações
            </Button>
            <Button onClick={() => close()}>Continuar editando</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}