import Logo from "@/assets/logo.svg";

export function Brand() {
  return (
    <div className="flex h-[35px] w-full items-center justify-center gap-2 pb-8 pt-6 md:pt-2">
      <p className="text-sm font-medium">feito com</p>
      <img src={Logo} alt="feito com lazlink" className="h-[24px] w-[60px]" />
    </div>
  );
}
