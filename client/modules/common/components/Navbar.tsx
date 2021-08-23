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
import { useRouter } from "next/router";

// components
import { HorizontalLogo } from "@modules/common/components/HorizontalLogo";

export function Navbar() {
  // next hooks
  const { pathname } = useRouter();
  console.log("\n ~ Navbar ~ pathname", pathname);

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
      paddingY={{ base: 6, md: 3 }}
      paddingBottom={{ base: 12, md: 16 }}
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

      <Icon as={FaBars} cursor="pointer" display={{ base: "block", md: "none" }} h={6} w={6} onClick={onOpen} />

      <Drawer isOpen={isOpen} size="full" onClose={onClose}>
        <DrawerContent backgroundColor="brand.lightRed" paddingY={12}>
          <DrawerHeader>
            <Stack alignItems="flex-end">
              <Icon as={FaTimes} color="brand.white" cursor="pointer" h={6} w={6} onClick={onClose} />
            </Stack>
          </DrawerHeader>

          <DrawerBody>
            <Stack alignItems="center" fontSize="xl" fontWeight={700} paddingY={16} spacing={10}>
              {navbarLinks.map(({ route, label }) => {
                return (
                  <NextLink passHref href={route} key={route}>
                    <Link color={route === pathname ? "brand.softOrange" : "brand.white"}>{label}</Link>
                  </NextLink>
                );
              })}
            </Stack>
          </DrawerBody>

          <DrawerFooter alignItems="center" justifyContent="center">
            <LinkBox>
              <LinkOverlay isExternal href="https://twitter.com/whichiconisthat">
                <Icon as={FaTwitter} color="brand.white" h={6} w={6} />
              </LinkOverlay>
            </LinkBox>
            <LinkBox>
              <LinkOverlay isExternal href="https://github.com/lndgalante/which-icon-is-that">
                <Icon as={FaGithub} color="brand.white" h={6} ml={2} w={6} />
              </LinkOverlay>
            </LinkBox>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
}
