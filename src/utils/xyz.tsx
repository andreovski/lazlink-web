/* eslint-disable @typescript-eslint/no-explicit-any */
import { XyzTransition } from "@animxyz/react";
import { ReactElement } from "react";

type Props = {
  children: any;
  className?: string;
  condition: boolean;
  xyz: string;
  apper?: "true";
};

export function Xyz({
  children,
  className = "w-full",
  condition = false,
  ...props
}: Props) {
  const hasMultipleChildren = children?.length && children.length > 1;

  return (
    <XyzTransition {...props}>
      {condition && (
        <div className={className}>
          {hasMultipleChildren
            ? children.map((child: ReactElement) => child)
            : children}
        </div>
      )}
    </XyzTransition>
  );
}
