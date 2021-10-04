import { Stack, Text } from "@chakra-ui/react";

// components
import { NotFound } from "@modules/common/components/NotFound";
import { LinkButton } from "@modules/common/components/LinkButton";

function NotFoundPage() {
  return (
    <Stack
      paddingTop={{ base: 50, md: 58 }}
      paddingBottom={{ base: 119, md: 261 }}
      spacing={{ base: 10, md: 4 }}
      justifyContent="center"
      alignItems="center"
      as="section"
    >
      <NotFound maxWidth={{ base: 335, md: 548 }} maxHeight={{ base: 140, md: 260 }} />
      <Stack spacing={5} alignItems="center">
        <Text maxWidth={{ base: 335, md: 441 }} fontSize={{ base: 16, md: 20 }} textAlign="center">
          We&apos;re sorry, we couldn&apos;t find that page. Please check for spelling mistakes, or
        </Text>
        <LinkButton href="/" variant="brand.outline" text="Go back to the homepage" />
      </Stack>
    </Stack>
  );
}

export default NotFoundPage;
