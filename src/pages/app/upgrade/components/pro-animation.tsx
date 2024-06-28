import { themeColors } from "@/theme/colors/theme-colors";
import { ThemeFonts, themeFonts } from "@/theme/fonts/theme-fonts";

import { Logo } from "@/assets/logo";

import "./style.css";
import { useState } from "react";

export function ProAnimation() {
  return (
    <div className="container relative rounded-md rounded-r-none">
      <div className={`box bg-[${themeColors["default"].color1}]`}>
        <p
          className={`flex h-full items-center justify-center font-serif text-lg text-[${themeColors["default"].color2}]`}
        >
          André Luiz
        </p>
      </div>
      <div className={`box bg-[${themeColors["sky"].color1}]`}>
        <p
          className={`flex h-full items-center justify-center font-josefin-sans text-lg text-[${themeColors["sky"].color2}]`}
        >
          André Luiz
        </p>
      </div>
      <div className={`box bg-[${themeColors["ambar"].color1}]`}>
        <p
          className={`flex h-full items-center justify-center font-sans text-lg text-[${themeColors["ambar"].color2}]`}
        >
          André Luiz
        </p>
      </div>
      <div className={`box bg-[${themeColors["cappuccino"].color1}]`}>
        <p
          className={`flex h-full items-center justify-center font-josefin-sans text-lg text-[${themeColors["cappuccino"].color2}]`}
        >
          André Luiz
        </p>
      </div>
      <div className={`box bg-[${themeColors["lilac-dark"].color1}]`}>
        <p
          className={`flex h-full items-center justify-center font-serif text-lg text-[${themeColors["lilac-dark"].color2}]`}
        >
          André Luiz
        </p>
      </div>
      <div className={`box bg-[${themeColors["violet"].color1}]`}>
        <p
          className={`flex h-full items-center justify-center font-josefin-sans text-lg text-[${themeColors["violet"].color2}]`}
        >
          André Luiz
        </p>
      </div>
      <h1
        className={`absolute left-2 top-12 w-full break-all font-sans text-3xl font-bold text-white dark:text-foreground`}
      >
        Premium
      </h1>

      <div className="flex h-full items-center justify-center text-primary">
        <Logo />
      </div>
    </div>
  );
}
