import NextLink from "next/link";
import { Stack, Text, Icon, IconButton, HStack, Link } from "@chakra-ui/react";
import {
  FiHome,
  FiSearch,
  FiClock,
  FiStar,
  FiArrowRight,
} from "react-icons/fi";

function ExampleIcon({ icon, label, href }) {
  return (
    <NextLink passHref href={href}>
      <Link>
        <IconButton
          _hover={{
            transform: "translateY(-1px)",
            backgroundColor: "brand.softOrange",
          }}
          aria-label={label}
          backgroundColor="brand.lightOrange"
          color="brand.darkRed"
          icon={icon}
        />
      </Link>
    </NextLink>
  );
}
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
        <Text
          color="brand.darkRed"
          fontSize="sm"
          fontWeight={700}
          mb={{ base: 3, md: 0 }}
        >
          Try one of these:
        </Text>
        <HStack alignItems="center" justifyContent="center" spacing={2}>
          <ExampleIcon
            href="/feather/regular/home"
            icon={<FiHome />}
            label="Home"
          />
          <ExampleIcon
            href="/feather/regular/search"
            icon={<FiSearch />}
            label="Search"
          />
          <ExampleIcon
            href="/feather/regular/clock"
            icon={<FiClock />}
            label="Clock"
          />
          <ExampleIcon
            href="/feather/regular/star"
            icon={<FiStar />}
            label="Star"
          />
        </HStack>
      </HStack>

      <NextLink passHref href="/gallery">
        <Link className="gallery-link" textDecoration="underline">
          or find your icon in the gallery
          <Icon
            as={FiArrowRight}
            ml={1}
            sx={{
              ".gallery-link:hover &": {
                transform: "translateX(1px) scaleX(1.2)",
              },
            }}
            transition="all ease-in-out 400ms"
            willChange="transform"
          />
        </Link>
      </NextLink>
    </Stack>
  );
}
