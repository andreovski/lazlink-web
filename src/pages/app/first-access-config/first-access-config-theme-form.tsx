import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import {
  queryKeyGetProfessionalById,
  useMutationPutProfessional,
} from "@/api/professional";
import { DialogUpdateConfirm } from "@/components/dialogs/dialog-update-confirm";
import { toast } from "@/components/ui/use-toast";
import { useAppContext } from "@/context/app-context";
import { convertEmptyStringsToNull } from "@/utils";
import { useDisclosure } from "@/utils/hooks/useDisclosure";

import { ThemeBase, ThemeCardSelect } from "./_components/theme-card-select";

export function FirstAccessConfigThemeForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { professional } = useAppContext();

  const queryClient = useQueryClient();

  const formContext = useFormContext();
  const dialogPremium = useDisclosure({ opened: false });

  const { mutate } = useMutationPutProfessional({
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        queryKeyGetProfessionalById,
        data._id,
      ] as any);

      toast({
        title: "Tema configurado com sucesso!",
        variant: "success",
      });
      formContext.setValue("step", 4);
    },
    onSettled: () => setIsLoading(false),
  });

  const handleSelectTheme = (theme: ThemeBase) => {
    // const isUserPremium = professional.premium
    const isUserPremium = false;
    const userValues = formContext.getValues() || professional;

    if (theme.premium && !isUserPremium) {
      return dialogPremium.open();
    }

    setIsLoading(true);

    const payload = convertEmptyStringsToNull({
      ...professional,
      ...userValues,
      theme: {
        color: theme.color,
        font: theme.font,
        profile: theme.profile,
      },
    });

    return mutate(payload);
  };

  const [avatar, name, workTitle, about] = formContext.watch([
    "avatarUrl",
    "name",
    "workTitle",
    "about",
  ]);

  const themes: ThemeBase[] = [
    {
      color: "default",
      font: "font-sans",
      profile: "default",
      premium: false,
    },
    {
      color: "sky",
      font: "font-serif",
      profile: "default",
      premium: false,
    },
    {
      color: "sky-dark",
      font: "font-serif",
      profile: "default",
      premium: false,
    },
    {
      color: "cappuccino",
      font: "font-josefin-sans",
      profile: "default",
      premium: true,
    },
  ];

  return (
    <div className="my-3 flex w-full flex-col space-y-8">
      <p>Escolha um modelo base para sua página personalizada:</p>

      <div className="flex h-[480px] w-full gap-2 overflow-auto scroll-smooth">
        {themes.map((theme, idx) => (
          <ThemeCardSelect
            key={idx}
            idx={idx}
            onSelect={() => handleSelectTheme(theme)}
            theme={theme}
            isLoading={isLoading}
            profile={{
              name,
              avatar,
              about,
              workTitle,
            }}
          />
        ))}
      </div>

      <p className="w-full text-center text-sm">
        Se você mudar de ideia, dá para trocar por outro modelo depois. :)
      </p>

      <DialogUpdateConfirm {...dialogPremium} />
    </div>
  );
}
