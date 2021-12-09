import NextLink from "next/link";
import { Icon, Link, Stack, Text, HStack, useClipboard } from "@chakra-ui/react";

// icons
import { FiShare2, FiExternalLink, FiLayout } from "react-icons/fi";

// components
import { Tag } from "@modules/common/components/Tag";
import { LOGOS, LOGOS_SIZES_HOME_PAGE } from "@modules/common/components/Logos";

// hooks
import { useToast } from "@modules/common/hooks/useToast";

type IconLibraryProps = {
  website: string;
  packName: string;
  packParsedName: string;
  version: string;
  totalIcons: number;
  license: string;
};

export function IconLibrary({ website, version, license, packName, packParsedName, totalIcons }: IconLibraryProps) {
  // custom hooks
  const { displayToast } = useToast();

  // chakra hooks
  const { onCopy: onCopyWebsite } = useClipboard(typeof window !== "undefined" ? window?.location?.href : "");

  // utils
  function shareUrl() {
    onCopyWebsite();
    displayToast("Icon url copied to your clipboard.");
  }

  return (
    <Stack as="article" paddingTop={{ base: 0, md: 0, lg: 10 }} spacing={4} order={{ base: 2, md: 2, lg: "inherit" }}>
      <Text fontWeight={700} fontSize="lg" color="brand.darkRed">
        Icon Library
      </Text>

      <Icon
        width={LOGOS_SIZES_HOME_PAGE[packName].width}
        height={LOGOS_SIZES_HOME_PAGE[packName].height}
        filter="grayscale(0) contrast(1)"
        as={LOGOS[packName]}
      />

      <HStack>
        <Tag>V{version}</Tag>
        <Tag>{totalIcons} Icons</Tag>
        <Tag>{license} License</Tag>
      </HStack>

      <HStack spacing={5} paddingTop={4}>
        <Text variant="brand.underline" alignItems="center" display="flex" onClick={shareUrl} cursor="pointer">
          <Icon as={FiShare2} mr={1.5} />
          Share
        </Text>

        <NextLink passHref href={`/gallery?iconLibrary=${packName}&iconName=%20`}>
          <Link aria-label={packParsedName} variant="brand.underline" alignItems="center" display="flex">
            <Icon as={FiLayout} mr={1.5} />
            Go to gallery
          </Link>
        </NextLink>

        <Link variant="brand.underline" alignItems="center" display="flex" href={website} isExternal>
          <Icon as={FiExternalLink} mr={1.5} />
          Website
        </Link>
      </HStack>
    </Stack>
  );
}
