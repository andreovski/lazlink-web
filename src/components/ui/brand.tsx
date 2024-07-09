import { Logo } from "@/assets/logo";

export function Brand({ logoOnly = false }: { logoOnly?: boolean }) {
  return (
    <div className="mb-4 mt-6 flex h-[35px] w-full items-center justify-center md:mt-2">
      {!logoOnly && <p className="text-sm font-medium">feito com</p>}

      <p className="h-[26px] w-[76px] text-primary">
        <Logo />
      </p>
    </div>
  );
}
