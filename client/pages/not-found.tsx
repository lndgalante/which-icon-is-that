import NextLink from "next/link";
import { Stack, Text, HStack, Button } from "@chakra-ui/react";
import { FiHome, FiSearch, FiClock, FiStar } from "react-icons/fi";

// components
import { BoxIcon } from "@modules/common/components/BoxIcon";
import {
  LeftMiddle,
  LeftBottom,
  LeftMiddleTop,
  LeftMiddleBottom,
  RightTop,
  RightMiddle,
  RightBottom,
  RightTopSecondary,
} from "@modules/not-found/components/Shapes";

function NotFound() {
  return (
    <Stack
      backgroundColor="brand.lightOrange"
      height="80vh"
      position="relative"
      justifyContent="center"
      alignItems="center"
      spacing={6}
    >
      <Stack spacing={0} textAlign="center">
        <Text color="brand.darkRed" fontWeight={800} fontSize={{ base: 24, md: 40 }}>
          The icon was not found!
        </Text>
        <Text color="brand.text" fontSize={{ base: "sm", md: "lg" }}>
          We are analyzing your icon to support it in our system
        </Text>
      </Stack>

      <Stack paddingBottom={4} spacing={6} alignItems="center">
        <Text color="brand.orange" fontWeight={700}>
          Maybe any of these would be useful?
        </Text>
        <HStack alignItems="center" justifyContent="center" spacing={2}>
          <BoxIcon withShadow href="/feather/regular/home" icon={<FiHome />} displayLabel label="Home" />
          <BoxIcon withShadow href="/feather/regular/search" icon={<FiSearch />} displayLabel label="Search" />
          <BoxIcon withShadow href="/feather/regular/clock" icon={<FiClock />} displayLabel label="Clock" />
          <BoxIcon withShadow href="/feather/regular/star" icon={<FiStar />} displayLabel label="Star" />
        </HStack>
      </Stack>

      <NextLink href="/">
        <Button variant="brand.outline">Back to the Homepage</Button>
      </NextLink>

      <Stack top={{ base: 56, md: 95 }} left={{ base: -6, md: 90 }} position="absolute">
        <LeftMiddleTop width={{ base: "70px", md: "216px" }} />
      </Stack>

      <Stack top={{ base: 56, md: 320 }} left={{ base: -6, md: -1 }} position="absolute">
        <LeftMiddle width={{ base: "70px", md: "130px" }} />
      </Stack>

      <Stack bottom={{ base: 56, md: 148 }} left={{ base: -6, md: 180 }} position="absolute">
        <LeftMiddleBottom width={{ base: "70px", md: "50px" }} />
      </Stack>

      <Stack bottom={{ base: 56, md: -2 }} left={{ base: -6, md: 340 }} position="absolute">
        <LeftBottom width={{ base: "70px", md: "124px" }} />
      </Stack>

      <Stack top={{ base: 56, md: 4 }} right={{ base: -6, md: 280 }} position="absolute">
        <RightTop width={{ base: "70px", md: "124px" }} />
      </Stack>

      <Stack top={{ base: 56, md: 81 }} right={{ base: -6, md: 20 }} position="absolute">
        <RightTopSecondary width={{ base: "70px", md: "114px" }} />
      </Stack>

      <Stack bottom={{ base: 56, md: 390 }} right={{ base: -6, md: 20 }} position="absolute">
        <RightMiddle width={{ base: "70px", md: "66px" }} />
      </Stack>

      <Stack bottom={{ base: 56, md: 10 }} right={{ base: -6, md: 0 }} position="absolute">
        <RightBottom width={{ base: "70px", md: "90px" }} />
      </Stack>
    </Stack>
  );
}

export default NotFound;
