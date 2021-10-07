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
    const { data: icon } = await api.getIcon(iconHash);
    const { data: iconLibrary } = await api.getIconLibrary(packName);

    // const relatedIcons = [];
    // try {
    //   for await (const tag of tags.tags) {
    //     const { data: similarIcons } = await api.getSimilarIcons(
    //       iconHash,
    //       tag.tag_id
    //     );
    //     relatedIcons.push(...similarIcons.icons);
    //   }
    // } catch (error) {
    //   console.log(
    //     "\n ~ constgetStaticProps:GetStaticProps<Props,Params>= ~ error",
    //     error
    //   );
    // }

    // const parsedRelatedIcons = relatedIcons.map(
    //   ({
    //     pack_id,
    //     pack_name,
    //     icon_name,
    //     icon_type,
    //     icon_file_name,
    //     ...otherKeys
    //   }) => ({
    //     packId: pack_id,
    //     packName: pack_name,
    //     iconName: icon_name,
    //     iconType: icon_type,
    //     iconFileName: icon_file_name,
    //     ...otherKeys,
    //   })
    // );

    return {
      props: {
        ...icon,
        ...snippets,
        ...iconLibrary,
        // ...tags,
        // relatedIcons: parsedRelatedIcons,
      },
      revalidate: 86400,
    };
  } catch (err) {
    console.log("Error on getStaticProps", err);
  }
};

export default function IconPage({
  svg,
  links,
  snippets,
  license,
  totalIcons,
  version,
  iconTypes,
  website,
  downloadLink,
}: // tags,
// relatedIcons,
IconMetadata) {
  // next hooks
  const { query } = useRouter();

  // chakra hooks
  const { isOpen, onOpen, onClose } = useDisclosure();

  // constants
  const { iconType: iconTypeCurrentUrl } = query;
  console.log("\n ~ iconTypeCurrentUrl", iconTypeCurrentUrl);
  const reactIcon = getIconComponent(svg.packName, svg.reactIconName);

  const selectedTabIndex =
    iconTypes
      .map((iconType) => iconType.toLowerCase().split(" ").join(""))
      .findIndex((iconType) => iconType === iconTypeCurrentUrl) ?? 0;

  return (
    <Stack paddingBottom={32} spacing={10}>
      <Header iconName={svg.parsedIconName} onOpen={onOpen} />

      <DeveloperPanel packName={svg.packName} snippets={snippets} onClose={onClose} isOpen={isOpen} />

      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} rowGap={{ base: 10, md: 8 }} columnGap={67} as="section">
        <IconPlayground
          hash={svg.hash}
          selectedTabIndex={selectedTabIndex}
          reactIcon={reactIcon}
          iconTypes={iconTypes}
          iconSize={svg.bytes}
        />
        <IconLibrary
          website={website}
          version={version}
          license={license}
          packName={svg.packName}
          totalIcons={totalIcons}
          figmaLink={links.figma}
          downloadLink={downloadLink}
        />
        <IconExamples reactIcon={reactIcon} iconName={svg.iconName} />
        <IconRelated />
      </SimpleGrid>
    </Stack>
  );
}
