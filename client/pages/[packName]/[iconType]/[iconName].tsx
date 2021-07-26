import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  Tag,
  Icon,
  Link,
  Stack,
  HStack,
  Tooltip,
  TagLabel,
  useToast,
  TagRightIcon,
  useClipboard,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { FaGithubAlt } from "react-icons/fa";
import { RiBrush2Fill, RiBrush2Line } from "react-icons/ri";
import { FiSearch, FiFigma, FiCheckCircle } from "react-icons/fi";

// lib
import { api } from "lib/api";
import { IconResponse, IconMetadata, Svg } from "lib/types";

// hooks
import { useReadFoundTimes } from "hooks/useReadFoundTimes";

// components
import { Main } from "components/Main";
import { ICONS_LOGOS } from "components/icons";
import { LanguageTab } from "components/LanguageTab";
import { NextChakraLink } from "components/NextChakraLink";

// constants
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.5 } },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

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

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  try {
    const { packName, iconType, iconName } = params;
    const encodedPath = encodeURIComponent(
      `/${packName}/${iconType}/${iconName}`
    );

    const { data: initialData } = await api.getHashFromPath(encodedPath);
    const iconHash = initialData.result;

    // const { data: tags } = await api.getIconTags(iconHash);
    const { data: snippets } = await api.getIconSnippets(iconHash);
    const { data: icon }: IconResponse = await api.getIcon(iconHash);

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
  // tags,
  // relatedIcons,
}: IconMetadata) {
  // react hooks
  const [selectedUse, setSelectedUse] = useState("optimizedSvg");
  const [selectedLanguage, setSelectedLanguage] = useState("html");

  // query hooks
  const { data, isLoading } = useReadFoundTimes(svg.hash);

  // chakra hooks
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onCopy: onCopyInstall } = useClipboard(
    snippets[selectedLanguage].install
  );
  const { onCopy: onCopySetup } = useClipboard(
    snippets[selectedLanguage].setup
  );
  const { onCopy: onCopyImport } = useClipboard(
    snippets[selectedLanguage].import
  );
  const { onCopy: onCopyUsage } = useClipboard(
    snippets[selectedLanguage].usage
  );

  // constants
  const languages = Object.keys(snippets);
  const currentSnippet = snippets[selectedLanguage][selectedUse];

  // TODO: Review this array of icon pack names
  const hasIcongramSupport = [
    "clarity",
    "devicon",
    "entypo",
    "feather",
    "font-awesome",
    "jam",
    "material",
    "octicons",
    "simple",
  ];

  // handlers
  function handleTabChange(index: number) {
    const newLanguage = languages[index];
    const [use] = Object.keys(snippets[newLanguage]);

    setSelectedLanguage(newLanguage);
    setSelectedUse(use);
  }

  function handleChangeSelectedUse({ target }) {
    setSelectedUse(target.value);
  }

  function handleCopyInstall() {
    onCopyInstall();
    toast({
      status: "success",
      description: `Icon install copied to your clipboard`,
    });
  }

  function handleCopySetup() {
    onCopySetup();
    toast({
      status: "success",
      description: `Icon setup copied to your clipboard`,
    });
  }

  function handleCopyImport() {
    onCopyImport();
    toast({
      status: "success",
      description: `Icon import copied to your clipboard`,
    });
  }

  function handleCopyUsage() {
    onCopyUsage();
    toast({
      status: "success",
      description: `Icon usage copied to your clipboard`,
    });
  }

  return (
    <Main>
      <HStack animate="show" initial="hidden" mb={4} variants={container}>
        <Tooltip
          aria-label={`${svg.iconName} icon file name`}
          label={svg.iconFileName}
        >
          <Link isExternal href={links.icon}>
            <Tag
              borderRadius="full"
              colorScheme="blackAlpha"
              fontSize="sm"
              size="lg"
              variants={item}
            >
              <TagLabel mr={1.5}>{svg.iconName}</TagLabel>
              <TagRightIcon
                as={() => (
                  <div
                    dangerouslySetInnerHTML={{ __html: svg.svg }}
                    style={{ minWidth: "20px" }}
                  />
                )}
              />
            </Tag>
          </Link>
        </Tooltip>

        <Tooltip aria-label="Icon pack" label="Icon pack">
          <Link isExternal href={links.pack}>
            <Tag
              borderRadius="full"
              colorScheme="blackAlpha"
              fontSize="sm"
              size="lg"
              variants={item}
            >
              <TagLabel mr={1.5}>{svg.packName}</TagLabel>
              <TagRightIcon as={ICONS_LOGOS[svg.packName]} maxW={4} />
            </Tag>
          </Link>
        </Tooltip>

        <Tooltip aria-label="Icon type" label="Icon type">
          <Tag
            borderRadius="full"
            colorScheme="blackAlpha"
            fontSize="sm"
            size="lg"
            variants={item}
          >
            <TagLabel mr={1.5}>{svg.iconType}</TagLabel>
            <TagRightIcon
              as={() => (
                <Icon
                  as={svg.iconType === "solid" ? RiBrush2Fill : RiBrush2Line}
                  h={5}
                  w={5}
                />
              )}
            />
          </Tag>
        </Tooltip>

        <Tooltip aria-label="Figma file" label="Figma file">
          <Link isExternal href={links.figma}>
            <Tag
              borderRadius="full"
              colorScheme="blackAlpha"
              fontSize="sm"
              size="lg"
              variants={item}
            >
              <TagLabel mr={1.5}>Figma</TagLabel>
              <TagRightIcon as={() => <Icon as={FiFigma} h={5} w={5} />} />
            </Tag>
          </Link>
        </Tooltip>

        <Tooltip aria-label="Source code" label="Source code">
          <Link isExternal href={links.source}>
            <Tag
              borderRadius="full"
              colorScheme="blackAlpha"
              fontSize="sm"
              size="lg"
              variants={item}
            >
              <TagLabel mr={1.5}>{svg.bytes}</TagLabel>
              <TagRightIcon as={() => <Icon as={FaGithubAlt} h={5} w={5} />} />
            </Tag>
          </Link>
        </Tooltip>

        <Tooltip aria-label="Found times" label="Found times">
          <Tag
            borderRadius="full"
            colorScheme="blackAlpha"
            fontSize="sm"
            size="lg"
            variants={item}
          >
            <TagLabel mr={1.5}>
              {isLoading
                ? "Loading..."
                : `Found ${data.data.found} time${data.data.found > 1 ? "s" : ""
                }`}
            </TagLabel>
            <TagRightIcon as={() => <Icon as={FiCheckCircle} h={5} w={5} />} />
          </Tag>
        </Tooltip>

        <NextChakraLink href="/">
          <Tag
            borderRadius="full"
            colorScheme="blackAlpha"
            fontSize="sm"
            size="lg"
            variants={item}
          >
            <TagLabel mr={1.5}>Find another icon</TagLabel>
            <TagRightIcon as={() => <Icon as={FiSearch} h={5} w={5} />} />
          </Tag>
        </NextChakraLink>
      </HStack>

      {/* <HStack animate="show" initial="hidden" mb={4} variants={container}>
        <Text fontWeight={600}>Tags</Text>
        <HStack spacing={2}>
          {tags?.map((tag) => (
            <Tag
              key={tag.tag_id}
              borderRadius="full"
              colorScheme="blackAlpha"
              fontSize="sm"
              size="lg"
              variants={item}
            >
              <TagLabel mr={1.5}>{tag.name}</TagLabel>
            </Tag>
          ))}
        </HStack>
      </HStack> */}

      {/*   <HStack animate="show" initial="hidden" mb={4} variants={container}>
        <Text fontWeight={600}>Related icons</Text>
        <HStack spacing={2}>
          {relatedIcons.map(({ packName, iconType, iconName, svg, hash }) => (
            <NextChakraLink

              key={hash}
              href={
                {
                  pathname: "/[packName]/[iconType]/[iconName]",
                  query: { packName, iconType, iconName },
                //   eslint-disable-next-line
                } as any
              }
            >
              <Tag
                borderRadius="full"
                colorScheme="blackAlpha"
                fontSize="sm"
                size="lg"
                variants={item}
              >
                <TagLabel mr={1.5}>{iconName}</TagLabel>
                <TagRightIcon
                  as={() => (
                    <div
                      dangerouslySetInnerHTML={{ __html: svg }}
                      style={{ minWidth: "20px" }}
                    />
                  )}
                />
              </Tag>
            </NextChakraLink>
          ))}
        </HStack>
      </HStack>
    */}

      <Button
        colorScheme="blackAlpha"
        position="absolute"
        right={4}
        top={4}
        onClick={onOpen}
      >
        Dev Panel
      </Button>

      <Drawer isOpen={isOpen} placement="right" size="xl" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody background="black" p={0}>
            <HStack
              alignItems="flex-start"
              background="blackAlpha.900"
              color="white"
              flex-direction="row"
              pb={12}
              position="relative"
              pt={4}
              px={6}
              spacing={12}
            >
              <Stack flex={1} pt={6}>
                <Tabs onChange={handleTabChange}>
                  <TabList
                    bg="black"
                    left={0}
                    position="fixed"
                    top={0}
                    width="100%"
                    zIndex={5}
                  >
                    <Tab>HTML</Tab>
                    <Tab>React</Tab>
                    <Tab>Vue</Tab>
                    <Tab>React Native</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <LanguageTab
                        currentSnippet={currentSnippet}
                        handleChangeSelectedUse={handleChangeSelectedUse}
                        handleCopyImport={handleCopyImport}
                        handleCopyInstall={handleCopyInstall}
                        handleCopySetup={handleCopySetup}
                        handleCopyUsage={handleCopyUsage}
                        selectedLanguage={selectedLanguage}
                        selectedUse={selectedUse}
                        usesOptions={[
                          { label: "Optimized SVG", value: "optimizedSvg" },
                          { label: "Font (CDN)", value: "font" },
                          { label: "Script", value: "script" },
                          hasIcongramSupport.includes(svg.packName)
                            ? { label: "Icongram", value: "icongram" }
                            : null,
                        ]}
                      />
                    </TabPanel>
                    <TabPanel>
                      <LanguageTab
                        currentSnippet={currentSnippet}
                        handleChangeSelectedUse={handleChangeSelectedUse}
                        handleCopyImport={handleCopyImport}
                        handleCopyInstall={handleCopyInstall}
                        handleCopySetup={handleCopySetup}
                        handleCopyUsage={handleCopyUsage}
                        selectedLanguage={selectedLanguage}
                        selectedUse={selectedUse}
                        usesOptions={[
                          {
                            label: "React Component (JavaScript)",
                            value: "react-component-js",
                          },
                          {
                            label: "React Component (TypeScript)",
                            value: "react-component-ts",
                          },
                          { label: "React-icons", value: "react-icons" },
                          { label: "React-feather", value: "react-feather" },
                          { label: "Chakra UI", value: "chakra-ui" },
                          {
                            label: "Styled Component (JavaScript)",
                            value: "styled-component-js",
                          },
                          {
                            label: "Styled Component (TypeScript)",
                            value: "styled-component-ts",
                          },
                          {
                            label: "Emotion Component (JavaScript)",
                            value: "emotion-component-js",
                          },
                          {
                            label: "Emotion Component (JavaScript)",
                            value: "emotion-component-js",
                          },
                        ]}
                      />
                    </TabPanel>
                    <TabPanel>
                      <LanguageTab
                        currentSnippet={currentSnippet}
                        handleChangeSelectedUse={handleChangeSelectedUse}
                        handleCopyImport={handleCopyImport}
                        handleCopyInstall={handleCopyInstall}
                        handleCopySetup={handleCopySetup}
                        handleCopyUsage={handleCopyUsage}
                        selectedLanguage={selectedLanguage}
                        selectedUse={selectedUse}
                        usesOptions={[
                          { label: "Vue Template", value: "vue-template" },
                          { label: "Vue-feather", value: "vue-feather" },
                        ]}
                      />
                    </TabPanel>
                    <TabPanel>
                      <LanguageTab
                        currentSnippet={currentSnippet}
                        handleChangeSelectedUse={handleChangeSelectedUse}
                        handleCopyImport={handleCopyImport}
                        handleCopyInstall={handleCopyInstall}
                        handleCopySetup={handleCopySetup}
                        handleCopyUsage={handleCopyUsage}
                        selectedLanguage={selectedLanguage}
                        selectedUse={selectedUse}
                        usesOptions={[
                          {
                            label: "React Component (JavaScript)",
                            value: "react-native-component-js",
                          },
                          {
                            label: "React Component (TypeScript)",
                            value: "react-native-component-ts",
                          },
                        ]}
                      />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Stack>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Main>
  );
}
