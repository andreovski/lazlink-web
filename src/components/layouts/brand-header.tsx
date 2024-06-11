import { Outlet } from "react-router-dom";

import MainLogo from "@/assets/logo.svg";

export function BrandHeader() {
  return (
    <>
      <div className="bg-background flex justify-center max-h-[72px] w-full p-4">
        <img
          src={MainLogo}
          alt="Logo Lazilink"
          className="w-[100px] h-[40px]"
        />
      </div>

      <Outlet />
    </>
  );
}
