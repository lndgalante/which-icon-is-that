import { useEffect } from "react";
import { useClipboard } from "@chakra-ui/react";

// hooks
import { useToast } from "@modules/common/hooks/useToast";

export function useCopyEmail() {
  // custom hooks
  const { displayToast } = useToast();

  // chakra hooks
  const { hasCopied, onCopy } = useClipboard("whichiconisthat@gmail.com");

  // effects
  useEffect(() => {
    if (hasCopied) {
      displayToast("Email copied to your clipboard.");
    }
  }, [hasCopied, displayToast]);

  return { onCopy };
}
