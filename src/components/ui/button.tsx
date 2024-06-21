/* eslint-disable prettier/prettier */
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary !font-sans text-primary-foreground shadow hover:bg-primary-700 dark:hover:bg-primary-600 active:bg-primary-700 dark:active:bg-primary-500",
        solid:
          "bg-neutral-800 !font-sans dark:bg-neutral-500 text-primary-foreground shadow hover:bg-neutral-600 dark:hover:bg-neutral-600 dark:active:bg-neutral-500 active:bg-primary-700",
        destructive:
          "bg-destructive !font-sans text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-primary !font-sans bg-background text-primary shadow-sm active:bg-primary-200 hover:bg-primary-100 dark:hover:text-primary-200 dark:hover:bg-primary-800 hover:text-background-foreground dark:active:bg-primary-700",
        secondary:
          "bg-secondary text-primary shadow-sm !font-sans hover:bg-secondary/80 active:opacity-60",
        ghost:
          "hover:bg-accent hover:text-accent-foreground !font-sans text-primary",
        link: "text-primary underline-offset-4 hover:underline !font-sans",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        type={props.type || "button"}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
