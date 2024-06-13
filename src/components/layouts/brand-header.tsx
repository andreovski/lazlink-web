import { Outlet } from "react-router-dom";

import MainLogo from "@/assets/logo.svg";

export function BrandHeader() {
  return (
    <>
      <div className="flex max-h-[10vh] w-full justify-center bg-background p-4">
        <img
          src={MainLogo}
          alt="Logo Lazilink"
          className="h-[40px] w-[100px]"
        />
      </div>

      <Outlet />
    </>
  );
}
