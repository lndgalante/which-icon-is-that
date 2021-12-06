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

type Props = {
  isOpen: boolean;
  onClose: () => void;
  snippets: IconMetadata["snippets"];
};

export function DeveloperPanel({ snippets, isOpen, onClose }: Props) {
  // react hooks
  const [selectedUse, setSelectedUse] = useState("optimized-svg");
  const [selectedLanguage, setSelectedLanguage] = useState("html");

  // constants
  const languages = Object.keys(snippets);
  const currentSnippet = snippets[selectedLanguage]?.[selectedUse];

  const vueOptions = snippets.vue.options;
  const htmlOptions = snippets.html.options;
  const reactOptions = snippets.react.options;

  // handlers
  function handleTabChange(index: number) {
    const newLanguage = languages[index];
    const [use] = snippets[newLanguage].options;

    setSelectedLanguage(newLanguage);
    setSelectedUse(use.value);
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
                      usesOptions={htmlOptions}
                    />
                  </TabPanel>
                  <TabPanel px={0} py={6}>
                    <LanguageTab
                      currentSnippet={currentSnippet}
                      handleChangeSelectedUse={handleChangeSelectedUse}
                      selectedLanguage={selectedLanguage}
                      selectedUse={selectedUse}
                      usesOptions={reactOptions}
                    />
                  </TabPanel>
                  <TabPanel px={0} py={6}>
                    <LanguageTab
                      currentSnippet={currentSnippet}
                      handleChangeSelectedUse={handleChangeSelectedUse}
                      selectedLanguage={selectedLanguage}
                      selectedUse={selectedUse}
                      usesOptions={vueOptions}
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
