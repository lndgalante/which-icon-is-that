import { useEffect } from "react";
import { useClipboard } from "@chakra-ui/react";

// components
import { useToast } from "@modules/common/hooks/useToast";

export function useCopyEmail() {
  const { displayToast } = useToast();
  const { hasCopied, onCopy } = useClipboard("whichiconisthat@gmail.com");

  useEffect(() => {
    if (hasCopied) {
      displayToast("Email copied to your clipboard.");
    }
  }, [hasCopied]);

  return { onCopy };
}
