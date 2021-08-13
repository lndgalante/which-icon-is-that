import NextLink from "next/link";
import { Stack, Text, Icon, HStack, Link } from "@chakra-ui/react";
import { FiHome, FiSearch, FiClock, FiStar, FiArrowRight } from "react-icons/fi";

// components
import { BoxIcon } from "@modules/common/components/BoxIcon";

export function ExampleIcons() {
  return (
    <Stack
      alignItems="center"
      as="section"
      paddingBottom={{ base: 12, md: 98 }}
      paddingTop={{ base: 146, md: 154 }}
      spacing={{ base: 8, md: 10 }}
    >
      <HStack
        alignItems="center"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        spacing={{ base: 0, md: 5 }}
      >
        <Text color="brand.darkRed" fontSize="sm" fontWeight={700} mb={{ base: 3, md: 0 }}>
          Try one of these:
        </Text>
        <HStack alignItems="center" justifyContent="center" spacing={2}>
          <BoxIcon href="/feather/regular/home" icon={<FiHome />} primary label="Home" />
          <BoxIcon href="/feather/regular/search" icon={<FiSearch />} primary label="Search" />
          <BoxIcon href="/feather/regular/clock" icon={<FiClock />} primary label="Clock" />
          <BoxIcon href="/feather/regular/star" icon={<FiStar />} primary label="Star" />
        </HStack>
      </HStack>

      <NextLink passHref href="/gallery">
        <Link className="gallery-link" textDecoration="underline">
          or find your icon in the gallery
          <Icon
            as={FiArrowRight}
            ml={1}
            sx={{ ".gallery-link:hover &": { transform: "translateX(1px) scaleX(1.2)" } }}
            transition="all ease-in-out 400ms"
            willChange="transform"
          />
        </Link>
      </NextLink>
    </Stack>
  );
}
