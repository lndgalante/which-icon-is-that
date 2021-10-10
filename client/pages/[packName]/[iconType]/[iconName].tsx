import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { SimpleGrid, Stack, useDisclosure } from "@chakra-ui/react";

// utils
import { api } from "@modules/common/utils/api";
import { IconMetadata, Svg } from "@modules/common/utils/types";
import { getIconComponent } from "@modules/common/utils/getIconComponent";

// components
import { Header } from "@modules/icon/components/Header";
import { IconLibrary } from "@modules/icon/components/IconLibrary";
import { IconRelated } from "@modules/icon/components/IconRelated";
import { IconExamples } from "@modules/icon/components/IconExamples";
import { IconPlayground } from "@modules/icon/components/IconPlayground";
import { DeveloperPanel } from "@modules/icon/components/DeveloperPanel";

// types
type Props = IconMetadata;
type Params = Pick<Svg, "packName" | "iconType" | "iconName">;

// next lifecycle hooks
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data } = await api.getPaths();
    return { paths: data.paths, fallback: false };
  } catch (error) {
    console.log("Error on getStaticPaths", error);
  }
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  try {
    const { packName, iconType, iconName } = params;
    const encodedPath = encodeURIComponent(`/${packName}/${iconType}/${iconName}`);

    const { data: initialData } = await api.getHashFromPath(encodedPath);
    const iconHash = initialData.result;

    // const { data: tags } = await api.getIconTags(iconHash);
    const { data: snippets } = await api.getIconSnippets(iconHash);
    console.log("\n ~ constgetStaticProps:GetStaticProps<Props,Params>= ~ snippets", snippets);
    const { data: icon } = await api.getIcon(iconHash);
    console.log("\n ~ constgetStaticProps:GetStaticProps<Props,Params>= ~ icon", icon);
    const { data: iconLibrary } = await api.getIconLibrary(packName);
    console.log("\n ~ constgetStaticProps:GetStaticProps<Props,Params>= ~ iconLibrary", iconLibrary);
    const { data: iconTypesData } = await api.getIconTypes(iconName, packName);

    return {
      props: {
        icon,
        snippets,
        iconLibrary,
        iconTypes: iconTypesData.iconTypes,
      },
      revalidate: 86400,
    };
  } catch (err) {
    console.log("Error on getStaticProps", err);
  }
};

export default function IconPage({ icon, snippets, iconLibrary, iconTypes }: IconMetadata) {
  console.log("\n ~ IconPage ~ icon", icon);
  console.log("\n ~ iconLibrary", iconLibrary);

  // constants
  const { svg, links } = icon;
  const { figma } = links
  const { iconName, packName, reactIconName, parsedIconName, hash, bytes } = svg
  const { license, totalIcons, version, website, downloadLink } = iconLibrary;

  // next hooks
  const { query } = useRouter();

  // chakra hooks
  const { isOpen, onOpen, onClose } = useDisclosure();

  // constants
  const { iconType: iconTypeCurrentUrl } = query;
  const reactIcon = getIconComponent(packName, reactIconName);

  const selectedTabIndex =
    iconTypes
      .map((iconType) => iconType.split(" ").join(""))
      .findIndex((iconType) => iconType === iconTypeCurrentUrl) ?? 0;

  return (
    <Stack paddingBottom={32} spacing={10}>
      <Header iconName={parsedIconName} onOpen={onOpen} />

      <DeveloperPanel packName={packName} snippets={snippets} onClose={onClose} isOpen={isOpen} />

      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} rowGap={{ base: 10, md: 8 }} columnGap={67} as="section">
        <IconPlayground
          hash={hash}
          selectedTabIndex={selectedTabIndex}
          reactIcon={reactIcon}
          iconTypes={iconTypes}
          iconSize={bytes}
        />
        <IconLibrary
          website={website}
          version={version}
          license={license}
          packName={packName}
          totalIcons={totalIcons}
          figmaLink={figma}
          downloadLink={downloadLink}
        />
        <IconExamples reactIcon={reactIcon} iconName={iconName} />
        <IconRelated />
      </SimpleGrid>
    </Stack>
  );
}
