import { Text, Tag as ChakraTag, TagProps } from "@chakra-ui/react";

export function Tag(props: TagProps) {
  return (
    <ChakraTag
      backgroundColor="brand.lightGrey"
      borderRadius={8}
      paddingX={4}
      paddingY={2}
      transition="all 200ms ease-in-out"
      {...props}
    >
      <Text color="brand.text">{props.children}</Text>
    </ChakraTag>
  );
}
