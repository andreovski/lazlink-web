import { useEffect, useRef, useState } from "react";

type LabelClampedProps = {
  children: string;
  className?: string;
  clamped?: boolean;
  lines?: number;
};

export function LabelClamped({
  children,
  className = "",
  lines = 3,
  clamped = true,
}: LabelClampedProps) {
  const [isClamped, setIsClamped] = useState(clamped);
  const [showSpans, setShowToggle] = useState(false);
  const paragraphRef = useRef<any>(null);

  const widthLines: { [key: number]: string } = {
    1: "h-[55px]",
    2: "h-[82px]",
    3: "h-[104px]",
    4: "h-[129px]",
  };

  useEffect(() => {
    if (paragraphRef.current) {
      const height = paragraphRef.current.scrollHeight; // Obtém a altura real do parágrafo
      const lineHeight = parseFloat(
        getComputedStyle(paragraphRef.current).lineHeight, // Obtém a altura de uma linha
      );
      const maxHeight = lines * lineHeight; // Calcula a altura máxima permitida com base no número de linhas fornecidas

      // Compara a altura real do parágrafo com a altura máxima permitida
      if (height > maxHeight) {
        setShowToggle(true);
      } else {
        setShowToggle(false);
      }
    }
  }, [children, lines]);

  return (
    <div
      className={`relative overflow-hidden ${isClamped ? `line-clamp-${lines} ${widthLines[lines]}` : ""}`}
    >
      <p ref={paragraphRef} className={className}>
        {children}
      </p>

      {showSpans &&
        (isClamped ? (
          <span
            onClick={() => setIsClamped(false)}
            className="dark:from-foregound dark:via-foregound absolute bottom-0 left-0 right-0 cursor-pointer bg-gradient-to-t from-background via-background to-transparent py-4 text-center font-medium text-primary hover:underline"
          >
            veja mais...
          </span>
        ) : (
          <span
            onClick={() => setIsClamped(true)}
            className="flex flex-1 cursor-pointer justify-center py-1 font-medium text-primary hover:underline"
          >
            ver menos
          </span>
        ))}
    </div>
  );
}
