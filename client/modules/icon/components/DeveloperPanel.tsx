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
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useClipboard,
} from "@chakra-ui/react";

// types
import { IconMetadata } from "@modules/common/utils/types";

// hooks
import { useToast } from "@modules/common/hooks/useToast";

// components
import { LanguageTab } from "components/LanguageTab";

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

  // custom hooks
  const { displayToast } = useToast();

  // chakra hooks
  const { onCopy: onCopyInstall } = useClipboard(snippets[selectedLanguage].install);
  const { onCopy: onCopySetup } = useClipboard(snippets[selectedLanguage].setup);
  const { onCopy: onCopyImport } = useClipboard(snippets[selectedLanguage].import);
  const { onCopy: onCopyUsage } = useClipboard(snippets[selectedLanguage].usage);

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
    displayToast("Icon install copied to your clipboard");
  }

  function handleCopySetup() {
    onCopySetup();
    displayToast("Icon setup copied to your clipboard");
  }

  function handleCopyImport() {
    onCopyImport();
    displayToast("Icon import copied to your clipboard");
  }

  function handleCopyUsage() {
    onCopyUsage();
    displayToast("Icon usage copied to your clipboard");
  }

  return (
    <Drawer isOpen={isOpen} placement="right" size="lg" onClose={onClose}>
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
                <TabList bg="black" left={0} position="fixed" top={0} width="100%" zIndex={5}>
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
                        hasIcongramSupport.includes(packName) ? { label: "Icongram", value: "icongram" } : null,
                      ].filter(Boolean)}
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
                          label: "Emotion Component (TypeScript)",
                          value: "emotion-component-ts",
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
  );
}
