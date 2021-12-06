import NextLink from "next/link";
import { Stack, Text, Icon, HStack, Link } from "@chakra-ui/react";

// icons
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineHome, HiOutlineSearch, HiOutlineClock, HiOutlineStar } from "react-icons/hi";

// components
import { BoxIcon } from "@modules/common/components/BoxIcon";

export function ExampleIcons() {
  return (
    <Stack
      alignItems="center"
      as="section"
      paddingBottom={{ base: 8, md: 107 }}
      paddingTop={{ base: 114, md: 166 }}
      spacing={{ base: 8, md: 8 }}
    >
      <HStack
        alignItems="center"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        spacing={{ base: 0, md: 6 }}
      >
        <Text color="brand.darkRed" fontSize={16} fontWeight={700} mb={{ base: "1.3rem", md: 0 }}>
          Try one of these:
        </Text>
        <HStack alignItems="center" justifyContent="center" spacing={4}>
          <BoxIcon href="/heroicons/outlined/home" icon={HiOutlineHome} primary label="Home" />
          <BoxIcon href="/heroicons/outlined/search" icon={HiOutlineSearch} primary label="Search" />
          <BoxIcon href="/heroicons/outlined/clock" icon={HiOutlineClock} primary label="Clock" />
          <BoxIcon href="/heroicons/outlined/star" icon={HiOutlineStar} primary label="Star" />
        </HStack>
      </HStack>

      <NextLink passHref href="/gallery">
        <Link
          className="gallery-link"
          textDecoration="underline"
          fontSize="md"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Text>or find your icon in the gallery</Text>
          <Icon
            as={FiArrowRight}
            ml={1.5}
            sx={{ ".gallery-link:hover &": { transform: "translateX(1px) scaleX(1.25)" } }}
            transition="all ease-in-out 200ms"
            willChange="transform"
          />
        </Link>
      </NextLink>
    </Stack>
  );
}
