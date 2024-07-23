/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useRef } from "react";

export function useThrottle(fun: Function, timeout: number) {
  const timer = useRef(null);

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);

      timer.current = null;
    }
  }, [timer]);

  useEffect(() => {
    cancel();
  }, [cancel]);

  return (...args: any) => {
    cancel();

    // @ts-ignore
    timer.current = setTimeout(() => {
      timer.current = null;

      if (fun && typeof fun === "function") {
        // @ts-ignore
        fun.apply(this, args);
      }
    }, timeout);
  };
}
