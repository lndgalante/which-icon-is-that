import { FiShare2, FiDownload, FiFigma } from "react-icons/fi";
import { Icon, Link, Stack, Text, Tag, HStack, Image, useClipboard } from "@chakra-ui/react";

// hooks
import { useToast } from "@modules/common/hooks/useToast";

type IconLibraryProps = {
  website: string;
  packName: string;
  version: string;
  totalIcons: number;
  license: string;
  downloadLink: string;
  figmaLink: string;
};

export function IconLibrary({
  website,
  version,
  license,
  packName,
  totalIcons,
  figmaLink,
  downloadLink,
}: IconLibraryProps) {
  // custom hooks
  const { displayToast } = useToast();

  // chakra hooks
  const { onCopy: onCopyWebsite } = useClipboard(typeof window !== "undefined" ? window?.location?.href : "");

  // helpers
  function shareUrl() {
    onCopyWebsite();
    displayToast("Icon url copied to your clipboard.");
  }

  return (
    <Stack as="article" paddingTop={{ base: 0, md: 0, lg: 10 }} spacing={4} order={{ base: 2, md: 2, lg: 'inherit' }}>
      <Text fontWeight={800} fontSize="lg" color="brand.darkRed">
        Icon Library
      </Text>

      <Link width="fit-content" href={website} aria-label="Heroicons" isExternal>
        <Image paddingLeft={1} maxWidth={188} alt={packName} src={`/images/${packName}.png`} />
      </Link>

      <HStack>
        <Tag backgroundColor="brand.lightGrey" borderRadius={8} paddingX={4} paddingY={2}>
          <Text color="brand.warmBlack" opacity={0.5}>
            V{version}
          </Text>
        </Tag>
        <Tag backgroundColor="brand.lightGrey" borderRadius={8} paddingX={4} paddingY={2}>
          <Text color="brand.warmBlack" opacity={0.5}>
            {totalIcons} Icons
          </Text>
        </Tag>
        <Tag backgroundColor="brand.lightGrey" borderRadius={8} paddingX={4} paddingY={2}>
          <Text color="brand.warmBlack" opacity={0.5}>
            {license} License
          </Text>
        </Tag>
      </HStack>

      <HStack spacing={5} paddingTop={4}>
        <Text variant="brand.underline" onClick={shareUrl} cursor="pointer">
          <Icon as={FiShare2} mr={1.5} />
          Share
        </Text>

        <Link variant="brand.underline" href={downloadLink} download>
          <Icon as={FiDownload} mr={1.5} />
          Download iconset
        </Link>

        <Link variant="brand.underline" href={figmaLink} isExternal>
          <Icon as={FiFigma} mr={1.5} />
          Figma
        </Link>
      </HStack>
    </Stack>
  );
}
