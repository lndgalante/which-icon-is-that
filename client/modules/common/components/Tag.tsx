import React from "react";
import { Text, Tag as ChakraTag } from "@chakra-ui/react";

type IconLibraryProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

export function Tag({ onClick, children }: IconLibraryProps) {
  return (
    <ChakraTag onClick={onClick} backgroundColor="brand.lightGrey" borderRadius={8} paddingX={4} paddingY={2}>
      <Text color="brand.warmBlack" opacity={0.5}>
        {children}
      </Text>
    </ChakraTag>
  );
}
