import { Stack, Text } from "@chakra-ui/react";

import { DropZone } from "@modules/home/components/DropZone";
import {
  TopLeft,
  MiddleLeft,
  BottomLeft,
  TopRight,
  BottomRight,
  BottomRightSecondary,
  TopRightSecondary,
} from "@modules/home/components/Shapes";

export function Header() {
  return (
    <Stack
      alignItems="center"
      as="header"
      backgroundColor="brand.lightOrange"
      borderRadius={{ base: 0, md: 24 }}
      minHeight={{ base: 448, md: 435 }}
      position="relative"
      textAlign="center"
    >
      <Stack
        left={{ base: 6, md: 2 }}
        position="absolute"
        top={{ base: -10, md: 14 }}
      >
        <TopLeft width={{ base: "40px", md: "87px" }} />
      </Stack>
      <Stack
        bottom={{ base: 56, md: 8 }}
        left={{ base: -6, md: -4 }}
        position="absolute"
      >
        <BottomLeft width={{ base: "70px", md: "120px" }} />
      </Stack>
      <Stack
        left={{ base: 16, md: 28 }}
        position="absolute"
        top={{ base: -4, md: 40 }}
      >
        <MiddleLeft width={{ base: "51px", md: "120px" }} />
      </Stack>
      <Stack
        position="absolute"
        right={{ base: 28, md: 16 }}
        top={{ base: -10, md: 16 }}
        zIndex={2}
      >
        <TopRight width={{ base: "32px", md: "120px" }} />
      </Stack>
      <Stack
        position="absolute"
        right={{ base: 14, md: -7 }}
        top={{ base: -12, md: 16 }}
      >
        <TopRightSecondary width={{ base: "61px", md: "120px" }} />
      </Stack>
      <Stack
        bottom={{ base: -24, md: -24 }}
        position="absolute"
        right={{ base: 20, md: 48 }}
      >
        <BottomRight width={{ base: "61px", md: "95px" }} />
      </Stack>
      <Stack
        bottom={{ base: 10, md: 12 }}
        position="absolute"
        right={{ base: 2, md: 16 }}
      >
        <BottomRightSecondary width={{ base: "61px", md: "104px" }} />
      </Stack>

      <Stack
        alignItems="center"
        paddingTop={{ base: 66, md: 42 }}
        spacing={10}
        zIndex={5}
      >
        <Text
          color="brand.darkRed"
          fontSize={{ base: 24, md: 40 }}
          fontWeight={500}
          lineHeight="initial"
          maxWidth={{ base: 240, md: 846 }}
        >
          The missing tool to work with icons for{" "}
          <Text as="span" fontWeight={800}>
            Developers
          </Text>{" "}
          and{" "}
          <Text as="span" fontWeight={800}>
            Designers
          </Text>
        </Text>
        <Text
          color="brand.warmBlack"
          fontSize={{ base: 14, md: 18 }}
          fontWeight="medium"
          maxWidth={{ base: 248, md: 478 }}
        >
          Stop wasting time comparing shapes and begin improving your UI with
          some beautiful icons
        </Text>
      </Stack>

      <DropZone />
    </Stack>
  );
}
