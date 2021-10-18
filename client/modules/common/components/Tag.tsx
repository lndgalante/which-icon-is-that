import React from "react";
import { Text, Tag as ChakraTag, TagProps } from "@chakra-ui/react";

export function Tag(props: TagProps) {
  return (
    <ChakraTag
      backgroundColor="brand.lightGrey"
      borderRadius={8}
      paddingX={4}
      paddingY={2}
      transition="all 400ms ease-in-out"
      {...props}
    >
      <Text color="brand.warmBlack" opacity={0.7}>
        {props.children}
      </Text>
    </ChakraTag>
  );
}
