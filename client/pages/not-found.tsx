import NextLink from 'next/link'
import { Stack, Text, HStack, Button } from "@chakra-ui/react";
import { FiHome, FiSearch, FiClock, FiStar } from "react-icons/fi";

// components
import { ExampleIcon } from "@modules/home/components/ExampleIcon";

function NotFound() {
  return (
    <Stack backgroundColor="brand.lightOrange" paddingY={54} marginBottom={{ base: 24, md: 64 }} alignItems="center" borderRadius={{ base: 0, md: 24 }} spacing={6}>
      <Stack spacing={0} textAlign="center">
        <Text color="brand.darkRed" fontWeight={800} fontSize={{ base: 24, md: 40 }}>
          The icon was not found!
        </Text>
        <Text color="brand.text" fontSize={{ base: "sm", md: "lg" }}>We are analyzing your icon to support it in our system</Text>
      </Stack>

      <Stack paddingBottom={4}>
        <Text color="brand.orange" fontWeight={700}>Maybe any of these would be useful?</Text>
        <HStack alignItems="center" justifyContent="center" spacing={2}>
          <ExampleIcon href="/feather/regular/home" icon={<FiHome />} bgColor="brand.white" label="Home" />
          <ExampleIcon href="/feather/regular/search" icon={<FiSearch />} bgColor="brand.white" label="Search" />
          <ExampleIcon href="/feather/regular/clock" icon={<FiClock />} bgColor="brand.white" label="Clock" />
          <ExampleIcon href="/feather/regular/star" icon={<FiStar />} bgColor="brand.white" label="Star" />
        </HStack>
      </Stack>

      <NextLink href='/'>
        <Button variant="brand.outline">
          Back to the Homepage
        </Button>
      </NextLink>
    </Stack>
  );
}

export default NotFound;
