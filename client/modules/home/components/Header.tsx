import { Stack, Text } from "@chakra-ui/react";

// components
import * as Shapes from "@modules/home/components/Shapes";
import { DropZone } from "@modules/home/components/DropZone";

export function Header() {
  return (
    <Stack
      alignItems="center"
      as="header"
      backgroundColor="brand.lightOrange"
      borderRadius={{ base: 0, md: 24 }}
      minHeight={{ base: 448, md: 435 }}
      marginX={-4}
      position="relative"
      textAlign="center"
      spacing={0}
    >
      <Stack left={{ base: 6, md: 2 }} position="absolute" top={{ base: -10, md: 16 }}>
        <Shapes.TopLeft width={{ base: "2.5rem", md: "5.4375rem" }} />
      </Stack>
      <Stack bottom={{ base: 56, md: 10 }} left={{ base: -6, md: -6 }} position="absolute">
        <Shapes.BottomLeft width={{ base: "4.375rem", md: "14.25rem" }} />
      </Stack>
      <Stack left={{ base: 16, md: 32 }} position="absolute" top={{ base: -4, md: 44 }}>
        <Shapes.MiddleLeft width={{ base: "3.19rem", md: "7.5rem" }} />
      </Stack>
      <Stack position="absolute" right={{ base: 20, md: 16 }} top={{ base: -10, md: 20 }} zIndex={2}>
        <Shapes.TopRight width={{ base: "2rem", md: "7.5rem" }} />
      </Stack>
      <Stack position="absolute" right={{ base: 5, md: -7 }} top={{ base: -12, md: 16 }}>
        <Shapes.TopRightSecondary width={{ base: "3.8125rem", md: "7.5rem" }} />
      </Stack>
      <Stack bottom={{ base: "-3.9rem", md: -28 }} position="absolute" right={{ base: 20, md: 48 }}>
        <Shapes.BottomRight width={{ base: "3.8125rem", md: "5.9375rem" }} />
      </Stack>
      <Stack bottom={{ base: "4.9rem", md: 8 }} position="absolute" right={{ base: 2, md: 16 }}>
        <Shapes.BottomRightSecondary width={{ base: "3.8125rem", md: "6.5rem" }} />
      </Stack>

      <Stack alignItems="center" paddingTop={{ base: 94, md: 62 }} spacing={{ base: 5, md: 7 }} zIndex={5}>
        <Text
          as="h1"
          color="brand.darkRed"
          fontSize={{ base: 24, md: 40 }}
          fontWeight={500}
          lineHeight={{ base: "2rem", md: "3.5rem" }}
          maxWidth={{ base: 240, md: 846 }}
        >
          The missing tool to work with icons for{" "}
          <Text as="b" fontWeight={700}>
            Developers and Designers
          </Text>
        </Text>

        <Text
          as="h2"
          color="brand.warmBlack"
          fontSize={{ base: 14, md: 18 }}
          fontWeight="medium"
          maxWidth={{ base: 270, md: 518 }}
          lineHeight={{ base: "1.5rem", md: "2rem" }}
        >
          Stop wasting time comparing shapes and begin improving your UI with some beautiful icons
        </Text>
      </Stack>

      <DropZone />
    </Stack>
  );
}
