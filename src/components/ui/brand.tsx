import { Logo } from "@/assets/logo";

export function Brand() {
  return (
    <div className="mb-4 mt-6 flex h-[35px] w-full items-center justify-center gap-2 md:mt-2">
      <p className="text-sm font-medium">feito com</p>

      <p className="text-primary">
        <Logo />
      </p>
    </div>
  );
}
