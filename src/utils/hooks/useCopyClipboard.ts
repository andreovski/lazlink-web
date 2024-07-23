import { useState } from "react";

import { toast } from "@/components/ui/use-toast";

export const useCopyClipboard = (value = "") => {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = (value: string) => {
    if (document.execCommand) {
      // Browsers antigos
      const textArea = document.createElement("textarea");
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setHasCopied(true);
    } else if (navigator.clipboard) {
      // Browser que suporta clipboard API
      navigator.clipboard.writeText(value).then(() => {
        setHasCopied(true);
      });
    }
  };

  const onCopy = (newValue: string) => {
    copyToClipboard(newValue.trim() || value.trim());
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 1500);

    toast({
      title: "O conteúdo foi copiado para área de transferência!",
    });
  };

  return { value, onCopy, hasCopied };
};
