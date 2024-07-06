import * as React from "react";
import { FieldError, useController, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Label } from "./label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined;
  hideErrorMessage?: boolean;
}

export interface InputFormProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  sublabel?: string;
  hideErrorMessage?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, hideErrorMessage, type, ...props }, ref) => {
    const border = error ? "border-red-600" : "border-input";

    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            `flex h-9 w-full rounded-md border ${border} bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:${error ? "red-600" : "ring-1"} focus-visible:${error ? "red-600" : "ring-ring"} disabled:cursor-not-allowed disabled:opacity-50`,
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && !hideErrorMessage && (
          <Label className="text-xs text-red-600">{error.message}</Label>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

const InputForm = ({
  name,
  label,
  sublabel,
  className,
  ...props
}: InputFormProps) => {
  const form = useFormContext();

  if (!form) {
    throw new Error("InputForm component needs to be used with Form Provider");
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
    <div className={cn("w-full space-y-1", className)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input id={name} error={error} {...props} {...field} />
      {sublabel && <p className="text-[0.6rem] text-neutral-500">{sublabel}</p>}
    </div>
  );
};

InputForm.displayName = "InputForm";

export { Input, InputForm };
