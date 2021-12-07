// import NextLink from "next/link";
// import { Stack, HStack, Text, Link } from "@chakra-ui/react";
import { Stack, HStack, Text } from "@chakra-ui/react";

// icons
import { FiTwitter, FiMail } from "react-icons/fi";

// components
import { Discord } from "@modules/common/components/Discord";
import { FooterIcon } from "@modules/common/components/FooterIcon";

// hooks
import { useCopyEmail } from "@modules/common/hooks/useCopyEmail";

export function Footer() {
  // custom hooks
  const { onCopy } = useCopyEmail();

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
      zIndex={1}
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
          <FooterIcon href="whichiconisthat@gmail.com" label="Email" icon={FiMail} onClick={onCopy} isEmail />
          <FooterIcon href="https://twitter.com/whichiconisthat" label="Twitter" icon={FiTwitter} />
          <FooterIcon href="https://discord.gg/xTpegNF9bj" label="Discord" icon={Discord} />
        </HStack>
      </HStack>

      {/* <HStack
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
      </HStack> */}
    </Stack>
  );
}
