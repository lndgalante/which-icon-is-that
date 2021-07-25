import NextLink from "next/link";
import {
  Icon,
  Stack,
  LinkOverlay,
  HStack,
  Link,
  LinkBox,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBars, FaTimes, FaGithub, FaTwitter } from "react-icons/fa";

// components
import { HorizontalLogo } from "@modules/common/components/HorizontalLogo";

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack
      alignItems="center"
      as="nav"
      flexDirection="row"
      justifyContent="space-between"
      paddingX={{ base: 4, md: 0 }}
      paddingY={{ base: 6, md: 4 }}
    >
      <HorizontalLogo marginLeft={-2} maxHeight={{ base: 10, md: 12 }} />

      <HStack
        alignItems="center"
        display={{ base: "none", md: "flex" }}
        fontSize="sm"
        fontWeight={600}
        spacing={10}
      >
        <NextLink passHref href={"/libraries"}>
          <Link>Icon Libraries</Link>
        </NextLink>
        <NextLink passHref href={"/pricing"}>
          <Link>Pricing</Link>
        </NextLink>
        <NextLink passHref href={"/contact"}>
          <Link>Contact</Link>
        </NextLink>
      </HStack>

      <Icon
        as={FaBars}
        cursor="pointer"
        display={{ base: "block", md: "none" }}
        h={6}
        w={6}
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} size="full" onClose={onClose}>
        <DrawerContent backgroundColor="brand.lightRed" paddingY={12}>
          <DrawerHeader>
            <Stack alignItems="flex-end">
              <Icon
                as={FaTimes}
                color="brand.white"
                cursor="pointer"
                h={6}
                w={6}
                onClick={onClose}
              />
            </Stack>
          </DrawerHeader>

          <DrawerBody>
            <Stack
              alignItems="center"
              color="brand.white"
              fontSize="xl"
              fontWeight={700}
              paddingY={16}
              spacing={10}
            >
              <NextLink passHref href="/libraries">
                <Link>Icon Libraries</Link>
              </NextLink>
              <NextLink passHref href="/pricing">
                <Link>Pricing</Link>
              </NextLink>
              <NextLink passHref href="/contact">
                <Link>Contact</Link>
              </NextLink>
            </Stack>
          </DrawerBody>

          <DrawerFooter alignItems="center" justifyContent="center">
            <LinkBox>
              <LinkOverlay
                isExternal
                href="https://twitter.com/whichiconisthat"
              >
                <Icon as={FaTwitter} color="brand.white" h={6} w={6} />
              </LinkOverlay>
            </LinkBox>
            <LinkBox>
              <LinkOverlay
                isExternal
                href="https://github.com/lndgalante/which-icon-is-that"
              >
                <Icon as={FaGithub} color="brand.white" h={6} ml={2} w={6} />
              </LinkOverlay>
            </LinkBox>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
}
