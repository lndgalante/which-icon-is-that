import { useState } from "react";
import {
  Stack,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  HStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

// types
import { IconMetadata } from "@modules/common/utils/types";

// components
import { LanguageTab } from "@modules/icon/components/LanguageTab";

type DeveloperPanelProps = {
  isOpen: boolean;
  packName: string;
  onClose: () => void;
  snippets: IconMetadata["snippets"];
};

export function DeveloperPanel({ packName, snippets, isOpen, onClose }: DeveloperPanelProps) {
  // react hooks
  const [selectedUse, setSelectedUse] = useState("optimizedSvg");
  const [selectedLanguage, setSelectedLanguage] = useState("html");

  // constants
  const languages = Object.keys(snippets);
  const currentSnippet = snippets[selectedLanguage]?.[selectedUse];

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

  return (
    <Drawer isOpen={isOpen} placement="right" size="md" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent background="brand.warmBlack">
        <DrawerCloseButton color="brand.white" />
        <DrawerHeader color="brand.white" fontSize={24} fontWeight={800}>
          Developer Panel
        </DrawerHeader>

        <DrawerBody p={0}>
          <HStack alignItems="flex-start" color="white" flex-direction="row" pb={12} pt={2} px={6} spacing={12}>
            <Stack>
              <Tabs onChange={handleTabChange}>
                <TabList borderBottomColor="brand.grey">
                  <Tab
                    transition="border-bottom-color 200ms ease-in-out"
                    borderBottomWidth={2}
                    _focus={{ boxShadow: "none" }}
                    _selected={{
                      fontWeight: 700,
                      borderBottomColor: "brand.white",
                    }}
                    borderBottomColor="brand.grey"
                    borderTopLeftRadius={4}
                    borderTopRightRadius={4}
                    fontSize={14}
                    backgroundColor="brand.text"
                    px={4}
                    py={1}
                    pt={1.5}
                  >
                    HTML
                  </Tab>
                  <Tab
                    transition="border-bottom-color 200ms ease-in-out"
                    borderBottomWidth={2}
                    _focus={{ boxShadow: "none" }}
                    _selected={{
                      fontWeight: 700,
                      borderBottomColor: "brand.white",
                    }}
                    borderBottomColor="brand.grey"
                    borderTopLeftRadius={4}
                    borderTopRightRadius={4}
                    fontSize={14}
                    backgroundColor="brand.text"
                    px={4}
                    py={1}
                    pt={1.5}
                    ml={4}
                  >
                    React
                  </Tab>
                  <Tab
                    transition="border-bottom-color 200ms ease-in-out"
                    borderBottomWidth={2}
                    _focus={{ boxShadow: "none" }}
                    _selected={{
                      fontWeight: 700,
                      borderBottomColor: "brand.white",
                    }}
                    borderBottomColor="brand.grey"
                    borderTopLeftRadius={4}
                    borderTopRightRadius={4}
                    fontSize={14}
                    backgroundColor="brand.text"
                    px={4}
                    py={1}
                    pt={1.5}
                    ml={4}
                  >
                    Vue
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel px={0} py={6}>
                    <LanguageTab
                      currentSnippet={currentSnippet}
                      handleChangeSelectedUse={handleChangeSelectedUse}
                      selectedLanguage={selectedLanguage}
                      selectedUse={selectedUse}
                      usesOptions={[
                        { label: "Optimized SVG", value: "optimizedSvg" },
                        { label: "Font (CDN)", value: "font" },
                        { label: "Script", value: "script" },
                        hasIcongramSupport.includes(packName) ? { label: "Icongram", value: "icongram" } : null,
                      ].filter(Boolean)}
                    />
                  </TabPanel>
                  <TabPanel px={0} py={6}>
                    <LanguageTab
                      currentSnippet={currentSnippet}
                      handleChangeSelectedUse={handleChangeSelectedUse}
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
                        {
                          label: "React Native Component (JavaScript)",
                          value: "react-native-component-js",
                        },
                        {
                          label: "React Native Component (TypeScript)",
                          value: "react-native-component-ts",
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
                          label: "Emotion Component (TypeScript)",
                          value: "emotion-component-ts",
                        },
                      ]}
                    />
                  </TabPanel>
                  <TabPanel px={0} py={6}>
                    <LanguageTab
                      currentSnippet={currentSnippet}
                      handleChangeSelectedUse={handleChangeSelectedUse}
                      selectedLanguage={selectedLanguage}
                      selectedUse={selectedUse}
                      usesOptions={[
                        { label: "Vue Template", value: "vue-template" },
                        { label: "Vue-feather", value: "vue-feather" },
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
  );
}
