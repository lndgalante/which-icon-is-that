import { useToast as useChakraToast } from "@chakra-ui/react";

// components
import { CustomToast } from "@modules/common/components/CustomToast";

export function useToast() {
  // chakra hooks
  const toast = useChakraToast();

  // methods
  function displayToast(message: string) {
    toast({
      position: "bottom-left",
      render: () => <CustomToast message={message} />,
    });
  }

  return { displayToast };
}
