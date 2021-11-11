import { capitalCase } from "change-case";
import { Stack, Text, HStack, Button } from "@chakra-ui/react";

// common
import { LinkButton } from "@modules/common/components/LinkButton";

type HeaderProps = {
  onOpen: () => void;
  packName: string;
  iconName: string;
  packParsedName: string;
};

export function Header({ iconName, packName, packParsedName, onOpen }: HeaderProps) {
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
        {/*
        <HStack>
          <Text as="h2" fontWeight={700}>
            Tags:
          </Text>
          <Text>circle, clock, measure, time</Text>
        </HStack>
      */}
      </HStack>

      <HStack spacing={4}>
        <LinkButton  href={`/gallery?iconLibrary=${packName}&iconName=%20`} variant="brand.outline" text={`${packParsedName} Gallery`} />

        <Button variant="brand.solid" onClick={onOpen}>
          Developer Panel
        </Button>
      </HStack>
    </Stack>
  );
}
