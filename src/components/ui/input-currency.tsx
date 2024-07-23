import { Label } from "@radix-ui/react-label";
import { useReducer } from "react";
import { useController, useFormContext } from "react-hook-form";

import { Input } from "../ui/input";

type TextInputProps = {
  name: string;
  label?: string;
  sublabel?: string;
  placeholder?: string;
};

// Brazilian currency config
const moneyFormatter = Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function InputCurrency({
  name,
  label,
  sublabel,
  ...props
}: TextInputProps) {
  const form = useFormContext();

  if (!form) {
    throw new Error("InputForm component needs to be used with Form Provider");
  }

  const initialValue = form.getValues()[name]
    ? moneyFormatter.format(form.getValues()[name])
    : "";

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, "");
    return moneyFormatter.format(Number(digits) / 100);
  }, initialValue);

  function handleChange(
    realChangeFn: (v: number) => void,
    formattedValue: string,
  ) {
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits) / 100;
    realChangeFn(realValue);
  }

  const {
    fieldState: { error },
    field,
  } = useController({
    control: form.control,
    name,
    defaultValue: "",
  });

  return (
    <div className="w-full space-y-1">
      {label && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
      )}

      <Input
        {...props}
        error={error}
        type="text"
        onChange={(ev) => {
          setValue(ev.target.value);
          handleChange(field.onChange, ev.target.value);
        }}
        value={value}
      />
      {sublabel && <p className="text-[0.6rem] text-neutral-500">{sublabel}</p>}
    </div>
  );
}
