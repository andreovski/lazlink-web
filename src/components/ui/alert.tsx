import { ReactElement } from "react";

import { cn } from "@/lib/utils";

export const Alert = ({
  children,
  className,
}: {
  children: any;
  className?: string;
}) => {
  const hasMultipleChildren = children?.length && children.length > 1;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-md border border-input bg-primary-50 px-3 py-2 dark:bg-primary-900",
        className,
      )}
    >
      {hasMultipleChildren
        ? children.map((child: ReactElement) => child)
        : children}
    </div>
  );
};

export const AlertError = ({
  children,
  className,
}: {
  children: any;
  className?: string;
}) => {
  const hasMultipleChildren =
    children?.length && children.length > 1 && typeof children !== "string";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-md border border-rose-700 bg-rose-300 px-3 py-2 text-rose-950 dark:border-rose-700 dark:bg-rose-950 dark:text-red-100",
        className,
      )}
    >
      {hasMultipleChildren
        ? children.map((child: ReactElement) => child)
        : children}
    </div>
  );
};
