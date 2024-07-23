import * as React from "react";
import { FieldError, useController, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Label } from "./label";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError | undefined;
}

export interface TextareaFormProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <>
        <textarea
          className={cn(
            `flex min-h-[60px] w-full rounded-md border border-${error ? "red-600" : "input"} bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <Label className="text-xs text-red-600">{error.message}</Label>
        )}
      </>
    );
  },
);
Textarea.displayName = "Textarea";

const TextareaForm = ({ name, label, ...props }: TextareaFormProps) => {
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
    <div className="w-full space-y-2">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Textarea id={name} error={error} {...props} {...field} />
    </div>
  );
};

export { Textarea, TextareaForm };
