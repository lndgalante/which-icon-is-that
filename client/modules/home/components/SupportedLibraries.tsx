import NextLink from "next/link";
import { Stack, Text, Link, Image, Button, SimpleGrid } from "@chakra-ui/react";
import React from "react";

export function SupportedLibraries() {
  return (
    <Stack alignItems="center" as="section" paddingBottom={{ base: "1.7rem", md: 150 }} spacing={0}>
      <Text color="brand.darkRed" fontSize={{ base: 16, md: 24 }} as="h2" fontWeight={600}>
        Supported Icon Libraries
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
        <NextLink passHref href="/gallery?library=antd">
          <Link aria-label="Ant Design Icons">
            <Image
              alt="Ant Design Icons"
              _hover={{ opacity: 0.6 }}
              src="/images/antd.png"
              transition="all ease-in-out 400ms"
            />
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?library=bootstrap">
          <Link aria-label="Bootstrap Icons">
            <Image
              alt="Bootstrap Icons"
              _hover={{ opacity: 0.6 }}
              src="/images/bootstrap.png"
              transition="all ease-in-out 400ms"
            />
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?library=heroicons">
          <Link aria-label="Heroicons">
            <Image
              alt="Heroicons"
              _hover={{ opacity: 0.6 }}
              src="/images/heroicons.png"
              transition="all ease-in-out 400ms"
            />
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?library=feather">
          <Link aria-label="Feather Icons">
            <Image
              alt="Feather Icons"
              _hover={{ opacity: 0.6 }}
              src="/images/feather.png"
              transition="all ease-in-out 400ms"
            />
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?library=fontawesome">
          <Link aria-label="Font Awesome" display={{ base: 'none', md: 'inherit' }}>
            <Image
              alt="Font Awesome"
              _hover={{ opacity: 0.6 }}
              src="/images/font-awesome.png"
              transition="all ease-in-out 400ms"
            />
          </Link>
        </NextLink>
      </SimpleGrid>

      <NextLink passHref href="/supported-libraries">
        <Button variant="brand.outline">
          See all the libraries
        </Button>
      </NextLink>
    </Stack>
  );
}
