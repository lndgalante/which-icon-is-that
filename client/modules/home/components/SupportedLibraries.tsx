import NextLink from "next/link";
import {
  Stack,
  HStack,
  Text,
  Link,
  Image,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";


export function SupportedLibraries() {
  return (
    <Stack
      alignItems="center"
      as="section"
      paddingBottom={{ base: 12, md: 120 }}
    >
      <Text color="brand.darkRed" fontSize="2xl">
        Supported Icon Libraries
      </Text>

      <SimpleGrid
        alignItems="center"
        justifyContent="center"
        minChildWidth="120px"
        paddingBottom={{ base: 6, md: 12 }}
        paddingTop={{ base: 4, md: 8 }}
        paddingX={{ base: 10, md: 4 }}
        spacing={{ base: 12, md: 8 }}
      >
        <NextLink passHref href="/gallery?library=antd">
          <Link aria-label="Ant Design Icons">
            <Image
              alt="Ant Design Icons"
              _hover={{ filter: "none" }}
              filter="grayscale(1) blur(0.1px)"
              src="/antd.png"
              transition="all ease-in-out 400ms"
            />
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?library=boxicons">
          <Link aria-label="Boxicons">
            <Image
              alt="Boxicons"
              _hover={{ filter: "none" }}
              filter="grayscale(1) blur(0.1px)"
              src="/boxicons.png"
              transition="all ease-in-out 400ms"
            />
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?library=bootstrap">
          <Link aria-label="Bootstrap Icons">
            <Image
              alt="Bootstrap Icons"
              _hover={{ filter: "none" }}
              filter="grayscale(1) blur(0.1px)"
              src="/bootstrap.png"
              transition="all ease-in-out 400ms"
            />
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?library=heroicons">
          <Link aria-label="Heroicons">
            <Image
              alt="Heroicons"
              _hover={{ filter: "none" }}
              filter="grayscale(1) blur(0.1px)"
              src="/heroicons.png"
              transition="all ease-in-out 400ms"
            />
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?library=feather">
          <Link aria-label="Feather Icons">
            <Image
              alt="Feather Icons"
              _hover={{ filter: "none" }}
              filter="contrast(0.2) blur(0.1px)"
              src="/feather.png"
              transition="all ease-in-out 400ms"
            />
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?library=devicon">
          <Link aria-label="Devicon">
            <Image
              alt="Devicon"
              _hover={{ filter: "none" }}
              filter="grayscale(1) blur(0.1px)"
              src="/devicon.png"
              transition="all ease-in-out 400ms"
            />
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?library=flatcoloricons">
          <Link aria-label="Icons8">
            <Image
              alt="Icons8"
              _hover={{ filter: "none" }}
              filter="grayscale(1) blur(0.1px)"
              src="/icons8.png"
              transition="all ease-in-out 400ms"
            />
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?library=fontawesome">
          <Link aria-label="Font Awesome">
            <Image
              alt="Font Awesome"
              _hover={{ filter: "none" }}
              filter="contrast(0.2) blur(0.1px)"
              src="/font-awesome.png"
              transition="all ease-in-out 400ms"
            />
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?library=ionicons">
          <Link aria-label="Ionicons">
            <Image
              alt="Ionicons"
              _hover={{ filter: "none" }}
              filter="grayscale(1) blur(0.1px)"
              src="/ionicons.png"
              transition="all ease-in-out 400ms"
            />
          </Link>
        </NextLink>

        <NextLink passHref href="/gallery?library=remix">
          <Link aria-label="Remix Icons">
            <Image
              alt="Remix Icons"
              _hover={{ filter: "none" }}
              filter="grayscale(1) blur(0.1px)"
              src="/remix.png"
              transition="all ease-in-out 400ms"
            />
          </Link>
        </NextLink>
      </SimpleGrid>

      <HStack
        alignItems="center"
        backgroundColor="brand.lightGrey"
        borderRadius={24}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        paddingX={8}
        paddingY={4}
        spacing={{ base: 0, md: 4 }}
      >
        <Text
          color="brand.text"
          fontSize="md"
          fontWeight={600}
          marginBottom={{ base: 5, md: 0 }}
        >
          Is your icon library missing?
        </Text>
        <Button variant="brand.outline">Send request</Button>
      </HStack>
    </Stack>
  );
}
