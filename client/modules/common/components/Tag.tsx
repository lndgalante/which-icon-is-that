import React from "react";
import { Text, Tag as ChakraTag, TagProps } from "@chakra-ui/react";

type IconLibraryProps = {
  onClick?: () => void;
  otherProps?: TagProps;
  children: React.ReactNode;
};

export function Tag({ onClick, children, ...otherProps }: IconLibraryProps) {
  return (
    <ChakraTag
      onClick={onClick}
      backgroundColor="brand.lightGrey"
      borderRadius={8}
      paddingX={4}
      paddingY={2}
      transition="all 400ms ease-in-out"
      {...otherProps}
    >
      <Text color="brand.warmBlack" opacity={0.5}>
        {children}
      </Text>
    </ChakraTag>
  );
}
