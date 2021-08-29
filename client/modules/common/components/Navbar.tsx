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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Text,
  ModalBody,
  ModalCloseButton,
  ListItem,
  UnorderedList,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  VisuallyHidden,
  useDisclosure,
} from "@chakra-ui/react";
import { z } from "zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiMenu, FiX, FiGithub, FiTwitter } from "react-icons/fi";

// helpers
import { api } from "@modules/common/utils/api";

// hooks
import { useToast } from "@modules/common/hooks/useToast";

// components
import { HorizontalLogo } from "@modules/common/components/HorizontalLogo";

const NAVBAR_LINKS = [
  { route: "/gallery", label: "Icon Gallery" },
  { route: "/pricing", label: "Pricing" },
  { route: "/contact", label: "Contact" },
];

const BASE_PADDINGS_PER_PAGE = {
  ["/"]: 10,
  ["/not-found"]: 4,
  ["/gallery"]: 4,
  ["/contact"]: 4,
  ["/[packName]/[iconType]/[iconName]"]: 10,
};

const VALIDATION_SCHEMA = z.object({ email: z.string().email() });

export function Navbar() {
  // next hooks
  const { pathname } = useRouter();

  // chakra hooks
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();

  // form hooks
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(VALIDATION_SCHEMA) });

  // custom hooks
  const { displayToast } = useToast();

  // constants
  const isNotFoundPage = pathname === "/not-found";
  const paddingBase = BASE_PADDINGS_PER_PAGE[pathname] as string;

  // handlers
  async function onSubmit(values) {
    try {
      await api.postContact(values.email);
      displayToast(`Email sent to ${values.email}`);
    } catch (error) {
      console.log(`Error saving contact`, error)
    } finally {
      onModalClose();
    }
  }

  return (
    <Stack
      alignItems="center"
      as="nav"
      flexDirection="row"
      justifyContent="space-between"
      paddingX={{ base: 4, md: 12 }}
      paddingY={{ base: 6, md: 4 }}
      paddingBottom={{ base: paddingBase, md: isNotFoundPage ? 4 : "4.38rem" }}
      spacing={0}
    >
      <NextLink passHref href="/">
        <Link>
          <HorizontalLogo cursor="pointer" marginLeft={{ base: -6, md: -4 }} maxHeight={{ base: 9, md: 10 }} />
        </Link>
      </NextLink>

      <HStack alignItems="center" display={{ base: "none", md: "flex" }} fontSize="sm" fontWeight={500} spacing={10}>
        {NAVBAR_LINKS.map(({ route, label }) => {
          if (route === "/pricing") {
            return (
              <Link
                color={isModalOpen ? "brand.orange" : "brand.warmBlack"}
                _hover={{ color: "brand.orange" }}
                transition="all 400ms ease-in-out"
                onClick={onModalOpen}
                key={route}
              >
                {label}
              </Link>
            );
          }

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

      <Icon as={FiMenu} cursor="pointer" display={{ base: "block", md: "none" }} h={6} w={6} onClick={onDrawerOpen} />

      <Drawer isOpen={isDrawerOpen} size="full" onClose={onDrawerClose}>
        <DrawerContent backgroundColor="brand.lightRed" paddingY={12}>
          <DrawerHeader>
            <Stack alignItems="flex-end">
              <Icon as={FiX} color="brand.white" cursor="pointer" h={6} w={6} onClick={onDrawerClose} />
            </Stack>
          </DrawerHeader>

          <DrawerBody>
            <Stack alignItems="center" fontSize="xl" fontWeight={600} paddingY={16} spacing={10}>
              {NAVBAR_LINKS.map(({ route, label }) => {
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

      <Modal isOpen={isModalOpen} isCentered onClose={onModalClose}>
        <ModalOverlay backgroundColor="brand.lightOrangeModal" />
        <ModalContent minWidth={468} paddingX={6} paddingBottom={4}>
          <ModalCloseButton />
          <ModalHeader color="brand.lightRed">Pricing</ModalHeader>
          <ModalBody>
            <Stack spacing={4} mb={6}>
              <Text fontWeight={600} fontSize={18} color="brand.darkRed">
                These are some of the new features that we are developing for the pro version.
              </Text>
              <UnorderedList stylePosition="inside" spacing={1}>
                <ListItem>Email support 24/7</ListItem>
                <ListItem>Custom icon library</ListItem>
                <ListItem>Icon comparison tool</ListItem>
                <ListItem>Instant icon libraries updates</ListItem>
                <ListItem>Scene playground to drag and drop icons</ListItem>
                <ListItem>Team project folders for a selection of icons</ListItem>
              </UnorderedList>
            </Stack>
            <Stack>
              <Text fontWeight={600} fontSize={18} color="brand.text">
                Get notified
              </Text>
              <HStack as="form" alignItems="flex-start" height={70} spacing={4} onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email}>
                  <VisuallyHidden>
                    <FormLabel htmlFor="email">Email</FormLabel>
                  </VisuallyHidden>
                  <Input id="email" placeholder="yourmail@here.com" {...register("email")} />
                  <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                <Button variant="brand.solid" fontSize={14} fontWeight={500} isLoading={isSubmitting} type="submit">
                  Send
                </Button>
              </HStack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
