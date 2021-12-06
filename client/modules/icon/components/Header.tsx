import { capitalCase } from "change-case";
import { Stack, Text, HStack, Button } from "@chakra-ui/react";

type Props = {
  iconName: string;
  onOpen: () => void;
};

export function Header({ iconName, onOpen }: Props) {
  return (
    <Stack
      as="header"
      justifyContent="space-between"
      alignItems="flex-start"
      flexDirection={{ base: "column", md: "row" }}
      spacing={5}
    >
      <HStack flexDirection={{ base: "column", md: "row" }} spacing={{ base: 0, md: 8 }} alignItems="baseline">
        <Text as="h1" color="brand.darkRed" fontSize={{ base: 24, md: 36 }} fontWeight={800}>
          {capitalCase(iconName)}
        </Text>
      </HStack>

      <HStack spacing={4}>
        <Button variant="brand.solid" onClick={onOpen}>
          Developer Panel
        </Button>
      </HStack>
    </Stack>
  );
}
