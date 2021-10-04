import {
  Stack,
  Text,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// icons
import { FiMail } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";

// utils
import { api } from "@modules/common/utils/api";

// hooks
import { useToast } from "@modules/common/hooks/useToast";

// components
import * as Shapes from "@modules/contact/components/Shapes";

// constants
const VALIDATION_SCHEMA = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  message: z.string().optional(),
});

function Contact() {
  // form hooks
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(VALIDATION_SCHEMA) });

  // custom hooks
  const { displayToast } = useToast();

  // handlers
  async function onSubmit(values) {
    console.log("\n ~ onSubmit ~ values", values);
    try {
      await api.postContact(values.email, values.name, values.message);
      reset();
      displayToast(`Thanks to get in touch!`);
    } catch (error) {
      console.log(`Error saving contact`, error);
    }
  }
  return (
    <Stack
      backgroundColor="brand.lightOrange"
      minHeight={{ base: 574, md: 890 }}
      position="relative"
      justifyContent="center"
      alignItems="center"
      spacing={6}
      marginX={{ base: -4, md: -12 }}
      paddingBottom={{ base: 16, md: 48 }}
      paddingX={{ base: 5, md: 0 }}
      overflow="hidden"
    >
      <Stack spacing={{ base: 6, md: 6 }} textAlign="center" alignItems="center">
        <Text color="brand.darkRed" fontWeight={800} fontSize={{ base: 24, md: 40 }}>
          Get in Touch!
        </Text>
        <Text color="brand.text" fontSize={{ base: "sm", md: "lg" }} maxWidth={{ base: 235, md: "inherit" }}>
          Contact us for quote, help, or to be part of the community.
        </Text>
      </Stack>

      <Stack paddingBottom={4} spacing={6} alignItems="center">
        <HStack alignItems="center" justifyContent="center" spacing={4}>
          <HStack
            borderRadius={{ base: 8, md: 16 }}
            backgroundColor="brand.white"
            paddingX={{ base: 2, md: 6 }}
            paddingY={{ base: 2, md: 6 }}
          >
            <Icon as={FiMail} w={6} h={6} color="brand.orange" />
            <Text color="brand.text">whichiconisthat@gmail.com</Text>
          </HStack>

          <LinkBox cursor="pointer">
            <LinkOverlay isExternal aria-label={"label"} className="footer-link" href="https://discord.gg/xTpegNF9bj">
              <HStack
                borderRadius={{ base: 8, md: 16 }}
                paddingX={{ base: 2, md: 6 }}
                paddingY={{ base: 2, md: 6 }}
                transition='all 400ms ease-in-out'
                sx={{ ".footer-link:hover &": { backgroundColor: "brand.softOrange" } }}
              >
                <Icon as={FaDiscord} w={6} h={6} color="brand.orange" />
                <Text color="brand.text" sx={{ ".footer-link:hover &": { color: "brand.darkRed" } }}
                >Discord Channel</Text>
              </HStack>
            </LinkOverlay>
          </LinkBox>
        </HStack>
      </Stack>

      <Stack
        backgroundColor="brand.white"
        paddingX={{ base: 4, md: 6 }}
        paddingY={{ base: 4, md: "2.15rem" }}
        minWidth={{ base: "100%", md: 650 }}
        borderRadius={16}
        zIndex={2}
      >
        <Stack as="form" spacing={{ base: 6, md: 6 }} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={0}>
            <HStack flexDirection={{ base: "column", md: "row" }} spacing={{ base: 0, md: 6 }}>
              <FormControl minHeight={101} isInvalid={errors.name}>
                <FormLabel color="brand.darkRed" fontWeight={600} htmlFor="name">
                  Name
                </FormLabel>
                <Input focusBorderColor="brand.softOrange" id="name" placeholder="John Doe" {...register("name")} />
                <FormErrorMessage color="brand.lightRed">{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>
              <FormControl minHeight={101} isInvalid={errors.email}>
                <FormLabel color="brand.darkRed" fontWeight={600} htmlFor="email">
                  Email
                </FormLabel>
                <Input
                  focusBorderColor="brand.softOrange"
                  id="email"
                  placeholder="john@doe.com"
                  {...register("email")}
                />
                <FormErrorMessage color="brand.lightRed">{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>
            </HStack>
            <FormControl minHeight={101} isInvalid={errors.message}>
              <FormLabel color="brand.darkRed" fontWeight={600} htmlFor="message">
                Message
              </FormLabel>
              <Textarea
                focusBorderColor="brand.softOrange"
                id="message"
                placeholder="Write your message here"
                {...register("message")}
              />
              <FormErrorMessage color="brand.lightRed">{errors.message && errors.message.message}</FormErrorMessage>
            </FormControl>
          </Stack>

          <Button
            variant="brand.solid"
            alignSelf={{ base: "flex-start", md: "flex-end" }}
            fontSize={14}
            fontWeight={500}
            isLoading={isSubmitting}
            type="submit"
          >
            Send
          </Button>
        </Stack>
      </Stack>

      <Stack top={{ base: -20, md: 100 }} left={{ base: -1, md: -4 }} position="absolute">
        <Shapes.TopLeft width={{ base: "55px", md: "214px" }} />
      </Stack>

      <Stack bottom={{ base: -5, md: 10 }} right={{ base: 20, md: 268 }} position="absolute">
        <Shapes.BottomRight width={{ base: "66px", md: "120px" }} />
      </Stack>

      <Stack
        bottom={{ base: 56, md: 272 }}
        left={{ base: -6, md: 56 }}
        display={{ base: "none", md: "flex" }}
        position="absolute"
      >
        <Shapes.MiddleLeft width={{ base: "70px", md: "130px" }} />
      </Stack>

      <Stack top={{ base: 4, md: 56 }} right={{ base: 0, md: 0 }} position="absolute">
        <Shapes.TopRight width={{ base: "64px", md: "124px" }} />
      </Stack>
    </Stack>
  );
}

export default Contact;
