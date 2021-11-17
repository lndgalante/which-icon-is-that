import NextLink from "next/link";
import { Stack, Text, HStack, Button } from "@chakra-ui/react";
import { FiHome, FiSearch, FiClock, FiStar } from "react-icons/fi";

// components
import { BoxIcon } from "@modules/common/components/BoxIcon";
import * as Shapes from "@modules/not-found/components/Shapes";

function NotFound() {
  return (
    <Stack
      backgroundColor="brand.lightOrange"
      minHeight={{ base: 574, md: 852 }}
      position="relative"
      justifyContent="center"
      alignItems="center"
      spacing={6}
      marginX={{ base: -4, md: -12 }}
      overflow="hidden"
    >
      <Stack spacing={{ base: 6, md: 6 }} textAlign="center" alignItems="center">
        <Text color="brand.darkRed" fontWeight={800} fontSize={{ base: 24, md: 40 }}>
          The icon was not found!
        </Text>
        <Text color="brand.text" fontSize={{ base: "sm", md: "lg" }} maxWidth={{ base: 235, md: "inherit" }}>
          We are analyzing your icon to support it in our system
        </Text>
        <Text color="brand.orange" fontWeight={600}>
          Maybe any of these would be useful?
        </Text>
      </Stack>

      <Stack paddingBottom={4} spacing={6} alignItems="center">
        <HStack alignItems="center" justifyContent="center" spacing={4}>
          <BoxIcon withShadow href="/feather/regular/home" icon={FiHome} displayLabel label="Home" simpleHover />
          <BoxIcon withShadow href="/feather/regular/search" icon={FiSearch} displayLabel label="Search" simpleHover />
          <BoxIcon withShadow href="/feather/regular/clock" icon={FiClock} displayLabel label="Clock" simpleHover />
          <BoxIcon withShadow href="/feather/regular/star" icon={FiStar} displayLabel label="Star" simpleHover />
        </HStack>
      </Stack>

      <NextLink href="/">
        <Button variant="brand.outline">Back to the Homepage</Button>
      </NextLink>

      <Stack top={{ base: 4, md: 95 }} left={{ base: 0, md: 90 }} position="absolute">
        <Shapes.LeftMiddleTop width={{ base: "92px", md: "216px" }} />
      </Stack>

      <Stack
        top={{ base: 56, md: 320 }}
        left={{ base: -6, md: -1 }}
        display={{ base: "none", md: "flex" }}
        position="absolute"
      >
        <Shapes.LeftMiddle width={{ base: "70px", md: "130px" }} />
      </Stack>

      <Stack bottom={{ base: "1.4rem", md: 148 }} left={{ base: -1, md: 180 }} position="absolute">
        <Shapes.LeftMiddleBottom width={{ base: "24px", md: "50px" }} />
      </Stack>

      <Stack bottom={{ base: "-1.45rem", md: -2 }} left={{ base: "6.45rem", md: 340 }} position="absolute">
        <Shapes.LeftBottom width={{ base: "64px", md: "124px" }} />
      </Stack>

      <Stack top={{ base: "-1.45rem", md: 4 }} right={{ base: "7.7rem", md: 280 }} position="absolute">
        <Shapes.RightTop width={{ base: "70px", md: "124px" }} />
      </Stack>

      <Stack top={{ base: "-0.6rem", md: 81 }} right={{ base: -4, md: 20 }} position="absolute">
        <Shapes.RightTopSecondary width={{ base: "70px", md: "114px" }} />
      </Stack>

      <Stack
        bottom={{ base: 56, md: 390 }}
        right={{ base: -6, md: 20 }}
        display={{ base: "none", md: "flex" }}
        position="absolute"
      >
        <Shapes.RightMiddle width={{ base: "70px", md: "66px" }} />
      </Stack>

      <Stack bottom={{ base: "0.1rem", md: 10 }} right={{ base: "-1.14rem", md: 0 }} position="absolute">
        <Shapes.RightBottom width={{ base: "70px", md: "90px" }} />
      </Stack>
    </Stack>
  );
}

export default NotFound;
