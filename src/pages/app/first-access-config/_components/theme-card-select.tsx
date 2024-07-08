import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TextClamped } from "@/components/ui/text-clamped";
import {
  FaArrowRight,
  FaCrown,
  FaFont,
  FaSpinner,
  FaUser,
} from "react-icons/fa";
import { defaultAboutValue } from "../utils";

import "./theme-card-select.css";
import { BubbleTheme } from "@/components/ui/bubble-theme";
import { themeColors } from "@/theme/colors/theme-colors";
import { themeFonts } from "@/theme/fonts/theme-fonts";

export type ThemeBase = ITheme & {
  premium: boolean;
};

type Profile = {
  avatar: string | null;
  name: string;
  workTitle: string;
  about: string | null;
};

export function ThemeCardSelect({
  onSelect,
  profile,
  idx,
  theme,
  isLoading,
}: {
  onSelect: () => void;
  profile: Profile;
  idx: number;
  theme: ThemeBase;
  isLoading?: boolean;
}) {
  const themeVariant = theme.color.includes("dark") ? "dark" : "light";

  return (
    <div
      key={idx}
      data-theme={themeVariant}
      data-themeFont={theme.font}
      data-color={theme.color}
      data-premium={theme.premium}
      className={`Card-theme relative flex h-full min-w-[300px] flex-col gap-4 overflow-visible rounded border-2 bg-background p-[24px]`}
    >
      {theme.premium && (
        <div className="absolute right-0 top-2 rounded-sm rounded-r-none bg-primary px-2">
          <p className="flex items-center gap-2 font-sans text-sm font-semibold text-background">
            <FaCrown />
            Premium
          </p>
        </div>
      )}
      <div className="pointer-events-none flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar || ""} />
            <AvatarFallback className="flex items-center justify-center bg-primary">
              <FaUser className="text-background" />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h1 className="text-2xl font-medium">{profile.name}</h1>
            <p className="text-md font-medium">{profile.workTitle}</p>
          </div>
        </div>
        <TextClamped>{profile.about || defaultAboutValue}</TextClamped>
      </div>

      <div className="mt-auto flex items-center justify-start gap-2">
        <BubbleTheme {...themeColors[theme.color]} />
        <p className="pointer-events-none font-medium text-foreground">
          {themeColors[theme.color].title}
        </p>
      </div>

      <div className="flex items-center justify-start gap-2">
        <div className="rounded-sm border p-1">
          <FaFont />
        </div>
        <p className="pointer-events-none font-medium text-foreground">
          {themeFonts[theme.font].name}
        </p>
      </div>

      <Button
        className="flex gap-3"
        variant="outline"
        onClick={() => onSelect()}
        disabled={isLoading}
      >
        {isLoading && <FaSpinner className="animate-spin" />}
        {theme.premium && <FaCrown />}
        Escolher esse
        {!theme.premium && <FaArrowRight />}
      </Button>
    </div>
  );
}
