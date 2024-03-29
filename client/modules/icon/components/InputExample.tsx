import { As, InputProps, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

// constants
const ICON_SIZES = {
  sm: 4,
  md: 5,
  lg: 6,
};

type Props = {
  reactIcon: As;
  size: InputProps["size"];
};

export function InputExample({ reactIcon, size }: Props) {
  return (
    <InputGroup size={size} className="input-example">
      <InputLeftElement pointerEvents="none">
        <Icon
          as={reactIcon}
          w={ICON_SIZES[size]}
          h={ICON_SIZES[size]}
          color="brand.grey"
          transition="all ease-in-out 200ms"
          sx={{
            ".input-example:focus-within &": { color: "brand.warmBlack" },
            ".input-example:hover &": { color: "brand.warmBlack" },
          }}
        />
      </InputLeftElement>
      <Input
        borderRadius={6}
        type="text"
        placeholder="Input text"
        borderColor="brand.grey"
        transition="all ease-in-out 200ms"
        _focus={{ borderColor: "brand.warmBlack" }}
        _hover={{ borderColor: "brand.warmBlack" }}
      />
    </InputGroup>
  );
}
