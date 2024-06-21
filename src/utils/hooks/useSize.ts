import { useCallback, useEffect, useState } from "react";

export function useSize() {
  const [isSm, setIsSm] = useState(window.innerWidth <= 640);
  const [isMd, setIsMd] = useState(window.innerWidth <= 768);
  const [isLg, setIsLg] = useState(window.innerWidth <= 1024);
  const [isXl, setIsXl] = useState(window.innerWidth > 1280);
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [windowInnerHeight, setWindowInnerHeight] = useState(
    window.innerHeight,
  );

  const handleWindowResize = useCallback(() => {
    setIsSm(window.innerWidth <= 576);
    setIsMd(window.innerWidth <= 768);
    setIsLg(window.innerWidth <= 992);
    setIsXl(window.innerWidth > 1400);

    setWindowInnerWidth(window.innerWidth);
    setWindowInnerHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return {
    isSm,
    isMd,
    isLg,
    isXl,
    windowInnerWidth,
    windowInnerHeight,
  };
}
