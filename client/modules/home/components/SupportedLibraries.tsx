import NextLink from "next/link";
import { Stack, Text, Link, Image, SimpleGrid } from "@chakra-ui/react";
import Fade from "react-reveal/Fade";

// components
import { LinkButton } from "@modules/common/components/LinkButton";

export function SupportedLibraries() {
  return (
    <Stack alignItems="center" as="section" paddingBottom={{ base: "1.7rem", md: 150 }} spacing={0}>
      <Text color="brand.darkRed" fontSize={{ base: 16, md: 40 }} as="h2" fontWeight={700}>
        +6 Supported Icon Libraries
      </Text>

      <SimpleGrid
        alignItems="center"
        justifyContent="center"
        columns={{ base: 2, md: 5 }}
        paddingBottom={{ base: 9, md: 12 }}
        paddingTop={{ base: 5, md: 12 }}
        paddingX={{ base: 10, md: 4 }}
        spacing={{ base: 12, md: 8 }}
        maxWidth={1064}
      >
        <NextLink passHref href="/gallery?iconLibrary=antdesign&iconName=%20">
          <Link aria-label="Ant Design Icons">
            <Fade bottom delay={0}>
              <Image
                alt="Ant Design Icons"
                _hover={{ opacity: 0.6 }}
                src="/images/antdesign.png"
                transition="all ease-in-out 200ms"
              />
            </Fade>
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?iconLibrary=bootstrap&iconName=%20">
          <Link aria-label="Bootstrap Icons">
            <Fade bottom delay={200}>
              <Image
                alt="Bootstrap Icons"
                _hover={{ opacity: 0.6 }}
                src="/images/bootstrap.png"
                transition="all ease-in-out 200ms"
              />
            </Fade>
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?iconLibrary=heroicons&iconName=%20">
          <Link aria-label="Heroicons">
            <Fade bottom delay={400}>
              <Image
                alt="Heroicons"
                _hover={{ opacity: 0.6 }}
                src="/images/heroicons.png"
                transition="all ease-in-out 200ms"
              />
            </Fade>
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?iconLibrary=feather&iconName=%20">
          <Link aria-label="Feather Icons">
            <Fade bottom delay={600}>
              <Image
                alt="Feather Icons"
                _hover={{ opacity: 0.6 }}
                src="/images/feather.png"
                transition="all ease-in-out 200ms"
              />
            </Fade>
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?iconLibrary=fontawesome&iconName=%20">
          <Link aria-label="Font Awesome" display={{ base: "none", md: "inherit" }}>
            <Fade bottom delay={800}>
              <Image
                alt="Font Awesome"
                _hover={{ opacity: 0.6 }}
                src="/images/fontawesome.png"
                transition="all ease-in-out 200ms"
              />
            </Fade>
          </Link>
        </NextLink>
      </SimpleGrid>

      <LinkButton href="/supported-libraries" variant="brand.outline" text="See all the libraries" />
    </Stack>
  );
}
