import { Stack, Text } from "@chakra-ui/react";

// components
import { LinkButton } from "@modules/common/components/LinkButton";
import { ServerError } from "@modules/common/components/ServerError";

function ServerErrorPage() {
  return (
    <Stack
      paddingTop={{ base: 50, md: 58 }}
      paddingBottom={{ base: 119, md: 261 }}
      spacing={{ base: 2, md: 4 }}
      justifyContent="center"
      alignItems="center"
      as="section"
    >
      <ServerError maxWidth={{ base: 335, md: 548 }} maxHeight={{ base: 140, md: 260 }} />
      <Stack spacing={5} alignItems="center">
        <Text maxWidth={{ base: 360, md: 441 }} fontSize={{ base: 16, md: 20 }} textAlign="center">
          We're sorry, an unexpected error happened. We're fixing it, please come back later, or
        </Text>
        <LinkButton href="/" variant="brand.outline" text="Go back to the homepage" />
      </Stack>
    </Stack>
  );
}

export default ServerErrorPage;
