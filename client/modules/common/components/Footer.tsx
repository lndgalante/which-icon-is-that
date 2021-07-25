import NextLink from "next/link";
import { useEffect } from "react";
import { FaEnvelope, FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import {
  Stack,
  HStack,
  Text,
  Link,
  LinkBox,
  LinkOverlay,
  Icon,
  useClipboard,
  useToast,
  As,
} from "@chakra-ui/react";

type FooterIconProps = {
  icon: As;
  href: string;
  onClick?: () => void;
  isEmail?: boolean;
};

function FooterIcon({ icon, href, onClick, isEmail }: FooterIconProps) {
  return (
    <LinkBox cursor="pointer" onClick={isEmail ? onClick : null}>
      <LinkOverlay
        isExternal
        className="footer-link"
        href={isEmail ? null : href}
      >
        <Icon
          as={icon}
          color="brand.white"
          h={5}
          sx={{
            ".footer-link:hover &": {
              color: "brand.softOrange",
            },
          }}
          transition="all 400ms ease-in-out"
          w={5}
        />
      </LinkOverlay>
    </LinkBox>
  );
}

export function Footer() {
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard("whichiconisthat@gmail.com");

  useEffect(() => {
    if (hasCopied) {
      toast({
        description: "Email copied to your clipboard.",
        status: "info",
      });
    }
  }, [hasCopied]);

  return (
    <Stack
      as="footer"
      backgroundColor="brand.darkRed"
      color="brand.white"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-between"
      paddingX={{ base: 5, md: 20 }}
      paddingY={{ base: 8, md: 6 }}
    >
      <HStack
        alignItems={{ base: "flex-start", md: "center" }}
        flexDirection={{ base: "column", md: "row" }}
        order={{ base: 1, md: 0 }}
        spacing={{ base: 0, md: 8 }}
      >
        <Text marginBottom={{ base: 4, md: 0 }}>
          Copyright &copy; 2021 WIIT. All rights reserved.
        </Text>
        <HStack alignItems="center" spacing={4}>
          <FooterIcon
            isEmail
            href="whichiconisthat@gmail.com"
            icon={FaEnvelope}
            onClick={onCopy}
          />
          <FooterIcon href="https://discord.gg/xTpegNF9bj" icon={FaDiscord} />
          <FooterIcon
            href="https://twitter.com/whichiconisthat"
            icon={FaTwitter}
          />
          <FooterIcon
            href="https://github.com/lndgalante/which-icon-is-that"
            icon={FaGithub}
          />
        </HStack>
      </HStack>

      <HStack
        alignItems="flex-start"
        flexDirection={{ base: "column", md: "row" }}
        paddingBottom={{ base: 10, md: 0 }}
        spacing={{ base: 0, md: 10 }}
      >
        <NextLink passHref href="/privacy">
          <Link isExternal>Privacy Policy</Link>
        </NextLink>
        <NextLink passHref href="/terms">
          <Link isExternal>Terms and Conditions</Link>
        </NextLink>
      </HStack>
    </Stack>
  );
}
