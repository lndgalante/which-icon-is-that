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
import { useRouter } from "next/router";
import { FiMenu, FiX, FiGithub, FiTwitter } from "react-icons/fi";

// components
import { HorizontalLogo } from "@modules/common/components/HorizontalLogo";

export function Navbar() {
  // next hooks
  const { pathname } = useRouter();

  // chakra hooks
  const { isOpen, onOpen, onClose } = useDisclosure();

  // constants
  const navbarLinks = [
    { route: "/gallery", label: "Icon Gallery" },
    { route: "/pricing", label: "Pricing" },
    { route: "/contact", label: "Contact" },
  ];

  return (
    <Stack
      alignItems="center"
      as="nav"
      flexDirection="row"
      justifyContent="space-between"
      paddingX={{ base: 4, md: 12 }}
      paddingY={{ base: 6, md: 4 }}
      paddingBottom={{ base: "2.8rem", md: "4.38rem" }}
      spacing={0}
    >
      <NextLink passHref href="/">
        <Link>
          <HorizontalLogo cursor="pointer" marginLeft={{ base: -6, md: -4 }} maxHeight={{ base: 9, md: 10 }} />
        </Link>
      </NextLink>

      <HStack alignItems="center" display={{ base: "none", md: "flex" }} fontSize="sm" fontWeight={500} spacing={10}>
        {navbarLinks.map(({ route, label }) => {
          return (
            <NextLink passHref href={route} key={route}>
              <Link
                color={route === pathname ? "brand.orange" : "brand.warmBlack"}
                _hover={{ color: "brand.orange" }}
                transition="all 400ms ease-in-out"
              >
                {label}
              </Link>
            </NextLink>
          );
        })}
      </HStack>

      <Icon as={FiMenu} cursor="pointer" display={{ base: "block", md: "none" }} h={6} w={6} onClick={onOpen} />

      <Drawer isOpen={isOpen} size="full" onClose={onClose}>
        <DrawerContent backgroundColor="brand.lightRed" paddingY={12}>
          <DrawerHeader>
            <Stack alignItems="flex-end">
              <Icon as={FiX} color="brand.white" cursor="pointer" h={6} w={6} onClick={onClose} />
            </Stack>
          </DrawerHeader>

          <DrawerBody>
            <Stack alignItems="center" fontSize="xl" fontWeight={600} paddingY={16} spacing={10}>
              {navbarLinks.map(({ route, label }) => {
                return (
                  <NextLink passHref href={route} key={route}>
                    <Link color={route === pathname ? "brand.softOrange" : "brand.white"}>{label}</Link>
                  </NextLink>
                );
              })}
            </Stack>
          </DrawerBody>

          <DrawerFooter alignItems="center" justifyContent="center" >
            <LinkBox>
              <LinkOverlay isExternal href="https://twitter.com/whichiconisthat">
                <Icon as={FiTwitter} color="brand.white" h={6} w={6} />
              </LinkOverlay>
            </LinkBox>
            <LinkBox>
              <LinkOverlay isExternal href="https://github.com/lndgalante/which-icon-is-that">
                <Icon as={FiGithub} color="brand.white" h={6} ml={4} w={6} />
              </LinkOverlay>
            </LinkBox>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
}
