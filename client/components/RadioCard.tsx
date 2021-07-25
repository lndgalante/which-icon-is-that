import { Box, useRadio } from "@chakra-ui/react";

export function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        _checked={{
          bg: "blackAlpha.600",
          color: "white",
          borderColor: "blackAlpha.400",
        }}
        _focus={{ boxShadow: "lg" }}
        background="white"
        borderRadius="2xl"
        borderWidth="1px"
        boxShadow="md"
        cursor="pointer"
        px={4}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  );
}
