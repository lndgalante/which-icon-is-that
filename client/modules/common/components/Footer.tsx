import NextLink from "next/link";
import { useEffect } from "react";
import { Stack, HStack, Text, Link, LinkBox, LinkOverlay, Icon, useClipboard, As } from "@chakra-ui/react";

// icons
import { FaDiscord, FaEnvelope, FaTwitter } from "react-icons/fa";

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
      paddingY={{ base: "2.07rem", md: 6 }}
      spacing={{ base: 20, md: 0 }}
    >
      <HStack
        alignItems={{ base: "center", md: "center" }}
        flexDirection={{ base: "column", md: "row" }}
        spacing={{ base: 0, md: 8 }}
      >
        <Text marginBottom={{ base: 4, md: 0 }} fontWeight={500}>
          Copyright &copy; 2021 WIIT. All rights reserved.
        </Text>
        <HStack alignItems="center" spacing={4}>
          <FooterIcon href="whichiconisthat@gmail.com" label="Email" icon={FaEnvelope} onClick={onCopy} isEmail />
          <FooterIcon href="https://twitter.com/whichiconisthat" label="Twitter" icon={FaTwitter} />
          <FooterIcon href="https://discord.gg/xTpegNF9bj" label="Discord" icon={FaDiscord} />
        </HStack>
      </HStack>

      <HStack
        alignItems={{ base: "center", md: "flex-start" }}
        flexDirection={{ base: "column", md: "row" }}
        spacing={{ base: 0, md: 10 }}
        fontWeight={500}
      >
        <NextLink passHref href="/privacy">
          <Link mb={{ base: "0.95rem", md: 0 }}>Privacy Policy</Link>
        </NextLink>
        <NextLink passHref href="/terms">
          <Link>Terms and Conditions</Link>
        </NextLink>
      </HStack>
    </Stack>
  );
}
