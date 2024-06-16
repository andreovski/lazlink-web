import { ThemeDefaultProfile } from "./theme-default-profile";
import { ThemeDefaultServices } from "./theme-default-services";

export function ThemeDefault() {
  return (
    <div className="relative flex w-full flex-wrap justify-center gap-6 bg-background px-7 pt-8 md:justify-start md:px-24 md:pt-16">
      <div className="flex flex-col gap-4 md:flex-1">
        <ThemeDefaultProfile />
      </div>
      <div className="flex md:flex-1">
        <ThemeDefaultServices />
      </div>
    </div>
  );
}
