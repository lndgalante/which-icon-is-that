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

// utils
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

const MD_PADDINGS_PER_PAGE = {
  ["/contact"]: 4,
  ["/not-found"]: 4,
  ["/"]: "4.38rem",
  ["/gallery"]: "4.38rem",
  ["/[packName]/[iconType]/[iconName]"]: "4.38rem",
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
  const mdPadding = MD_PADDINGS_PER_PAGE[pathname] as string;
  const basePadding = BASE_PADDINGS_PER_PAGE[pathname] as string;

  // handlers
  async function onSubmit(values) {
    try {
      await api.postContact(values.email);
      displayToast(`Thanks to get in touch!`);
    } catch (error) {
      console.log(`Error saving contact`, error);
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
      paddingBottom={{ base: basePadding, md: mdPadding }}
      spacing={0}
    >
      <NextLink passHref href="/">
        <Link>
          <HorizontalLogo
            _hover={{ backgroundColor: "brand.lightOrange" }}
            transition="all 400ms ease-in-out"
            cursor="pointer"
            padding={1}
            borderRadius={4}
          />
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
                if (route === "/pricing") {
                  return (
                    <Link color={isModalOpen ? "brand.softOrange" : "brand.white"} onClick={onModalOpen} key={route}>
                      {label}
                    </Link>
                  );
                }

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
        <ModalOverlay />
        <ModalContent minWidth={{ base: "auto", md: 468 }} paddingX={{ base: 2, md: 6 }} paddingBottom={4}>
          <ModalCloseButton />
          <ModalHeader color="brand.lightRed" fontWeight={800}>
            Pricing
          </ModalHeader>
          <ModalBody>
            <Stack spacing={4} mb={6}>
              <Text fontWeight={700} fontSize={18} color="brand.darkRed">
                We&apos;re working on tons of new features for our free version!
              </Text>
              <UnorderedList stylePosition="inside" spacing={1}>
                <ListItem>New supported icon libraries</ListItem>
                <ListItem>Sliders to modify SVG stroke width</ListItem>
                <ListItem>Picker to modify SVG colors</ListItem>
                <ListItem>Tags to identify groups of icons</ListItem>
                <ListItem>Advanced filters in gallery page</ListItem>
                <ListItem>Sponsoring popular icon libraries</ListItem>
                <ListItem>Support for new frameworks</ListItem>
                <ListItem>Tons of feedback, speed and usability improvements!</ListItem>
                <ListItem>PNG/JPG to SVG conversor</ListItem>
                <ListItem>Google Chrome Extension</ListItem>
                <ListItem>Bitmap support for drag and drop</ListItem>
              </UnorderedList>

              <Text>But we&apos;re also developing some great PRO ones, such as</Text>
              <UnorderedList stylePosition="inside" spacing={1}>
                <ListItem>Support for paid libraries</ListItem>
                <ListItem>Project folders for teams</ListItem>
                <ListItem>Icon comparison tool</ListItem>
                <ListItem>Comment, rate and favorite icons</ListItem>
                <ListItem>Drag and Drop icon playground</ListItem>
                <ListItem>Custom WIIT icon library</ListItem>
                <ListItem>Instant library updates</ListItem>
                <ListItem>Enhanced support</ListItem>
                <ListItem>+ many more!</ListItem>
              </UnorderedList>
            </Stack>
            <Stack>
              <Text fontWeight={600} fontSize={18} color="brand.text">
                Get notified
              </Text>
              <HStack as="form" alignItems="flex-start" height={70} spacing={4} onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={Boolean(errors.email)}>
                  <VisuallyHidden>
                    <FormLabel htmlFor="email">Email</FormLabel>
                  </VisuallyHidden>
                  <Input
                    focusBorderColor="brand.softOrange"
                    id="email"
                    placeholder="yourmail@here.com"
                    {...register("email")}
                  />
                  <FormErrorMessage color="brand.lightRed">{errors.email && errors.email.message}</FormErrorMessage>
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
