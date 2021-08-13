import NextLink from "next/link";
import { useEffect } from "react";
import { FaEnvelope, FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import { Stack, HStack, Text, Link, LinkBox, LinkOverlay, Icon, useClipboard, As } from "@chakra-ui/react";

// components
import { useToast } from "@modules/common/hooks/useToast";

type FooterIconProps = {
  icon: As;
  href: string;
  label: string;
  isEmail?: boolean;
  onClick?: () => void;
};

function FooterIcon({ icon, href, label, isEmail, onClick }: FooterIconProps) {
  if (isEmail) {
    return (
      <Icon
        onClick={isEmail ? onClick : null}
        as={icon}
        cursor="pointer"
        color="brand.white"
        h={5}
        sx={{ ".footer-link:hover &": { color: "brand.softOrange" } }}
        transition="all 400ms ease-in-out"
        w={5}
      />
    );
  }

  return (
    <LinkBox cursor="pointer">
      <LinkOverlay isExternal aria-label={label} className="footer-link" href={href}>
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
  const { displayToast } = useToast();
  const { hasCopied, onCopy } = useClipboard("whichiconisthat@gmail.com");

  useEffect(() => {
    if (hasCopied) {
      displayToast("Email copied to your clipboard.");
    }
  }, [hasCopied]);

  return (
    <Stack
      as="footer"
      backgroundColor="brand.darkRed"
      color="brand.white"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-between"
      paddingX={{ base: 4, md: 12 }}
      paddingY={{ base: 8, md: 6 }}
    >
      <HStack
        alignItems={{ base: "flex-start", md: "center" }}
        flexDirection={{ base: "column", md: "row" }}
        order={{ base: 1, md: 0 }}
        spacing={{ base: 0, md: 8 }}
      >
        <Text marginBottom={{ base: 4, md: 0 }}
          fontWeight={700}>Copyright &copy; 2021 WIIT. All rights reserved.</Text>
        <HStack alignItems="center" spacing={4}>
          <FooterIcon href="whichiconisthat@gmail.com" label="Email" icon={FaEnvelope} onClick={onCopy} isEmail />
          <FooterIcon href="https://discord.gg/xTpegNF9bj" label="Discord" icon={FaDiscord} />
          <FooterIcon href="https://twitter.com/whichiconisthat" label="Twitter" icon={FaTwitter} />
          <FooterIcon href="https://github.com/lndgalante/which-icon-is-that" label="GitHub" icon={FaGithub} />
        </HStack>
      </HStack>

      <HStack
        alignItems="flex-start"
        flexDirection={{ base: "column", md: "row" }}
        paddingBottom={{ base: 10, md: 0 }}
        spacing={{ base: 0, md: 10 }}
        fontWeight={700}
      >
        <NextLink passHref href="/privacy">
          <Link>Privacy Policy</Link>
        </NextLink>
        <NextLink passHref href="/terms">
          <Link>Terms and Conditions</Link>
        </NextLink>
      </HStack>
    </Stack>
  );
}
