import NextLink from "next/link";
import Fade from "react-reveal/Fade";
import { Stack, Text, Link, Icon, SimpleGrid } from "@chakra-ui/react";

// components
import { LOGOS } from "@modules/common/components/Logos";
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
        maxHeight={180}
      >
        <NextLink passHref href="/gallery?iconLibrary=antdesign&iconName=%20">
          <Link aria-label="Ant Design Icons">
            <Fade bottom delay={0}>
              <Icon
                w={181}
                height={14}
                _hover={{ filter: "grayscale(0) contrast(1)" }}
                filter="grayscale(1) contrast(0.6)"
                transition="all ease-in-out 200ms"
                as={LOGOS.antdesign}
              />
            </Fade>
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?iconLibrary=bootstrap&iconName=%20">
          <Link aria-label="Bootstrap Icons">
            <Fade bottom delay={200}>
              <Icon
                w={177}
                height={14}
                _hover={{ filter: "grayscale(0) contrast(1)" }}
                filter="grayscale(1) contrast(0.7)"
                transition="all ease-in-out 200ms"
                as={LOGOS.bootstrap}
              />
            </Fade>
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?iconLibrary=heroicons&iconName=%20">
          <Link aria-label="Heroicons">
            <Fade bottom delay={400}>
              <Icon
                w={187}
                height={14}
                _hover={{ filter: "grayscale(0) contrast(1)" }}
                filter="grayscale(1) contrast(0.8)"
                transition="all ease-in-out 200ms"
                as={LOGOS.heroicons}
              />
            </Fade>
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?iconLibrary=feather&iconName=%20">
          <Link aria-label="Feather Icons">
            <Fade bottom delay={600}>
              <Icon
                w={170}
                height={12}
                _hover={{ filter: "grayscale(0) contrast(1)" }}
                filter="grayscale(1) contrast(0.4)"
                transition="all ease-in-out 200ms"
                as={LOGOS.feather}
              />
            </Fade>
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?iconLibrary=fontawesome&iconName=%20">
          <Link aria-label="Font Awesome" display={{ base: "none", md: "inherit" }}>
            <Fade bottom delay={800}>
              <Icon
                w={220}
                height={8}
                _hover={{ filter: "grayscale(0) contrast(1)" }}
                filter="grayscale(1) contrast(0.8)"
                transition="all ease-in-out 200ms"
                as={LOGOS.fontawesome}
              />
            </Fade>
          </Link>
        </NextLink>
      </SimpleGrid>

      <Stack pt={8}>
        <LinkButton href="/supported-libraries" variant="brand.outline" text="See all the libraries" />
      </Stack>
    </Stack>
  );
}
