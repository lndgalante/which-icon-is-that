import { As, InputProps, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

type InputExamplesProps = {
  reactIcon: As;
  size: InputProps["size"];
};

const ICON_SIZES = {
  sm: 4,
  md: 5,
  lg: 6,
};

export function InputExample({ reactIcon, size }: InputExamplesProps) {
  return (
    <InputGroup size={size} className="input-example">
      <InputLeftElement pointerEvents="none">
        <Icon
          as={reactIcon}
          w={ICON_SIZES[size]}
          h={ICON_SIZES[size]}
          color="brand.grey"
          transition="all ease-in-out 400ms"
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
        transition="all ease-in-out 400ms"
        _focus={{ borderColor: "brand.warmBlack" }}
        _hover={{ borderColor: "brand.warmBlack" }}
      />
    </InputGroup>
  );
}
