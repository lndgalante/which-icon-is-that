import React from "react";
import { Text, Tag as ChakraTag } from "@chakra-ui/react";

type IconLibraryProps = {
  children: React.ReactNode;
};

export function Tag({ children }: IconLibraryProps) {
  return (
    <ChakraTag backgroundColor="brand.lightGrey" borderRadius={8} paddingX={4} paddingY={2}>
      <Text color="brand.warmBlack" opacity={0.5}>
        {children}
      </Text>
    </ChakraTag>
  );
}
