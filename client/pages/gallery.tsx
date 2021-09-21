import { useState } from "react";
import { GetServerSideProps } from "next";
import { useDebounce } from "use-debounce";
import {
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";

// utils
import { api } from "@modules/common/utils/api";
import { getIconComponent } from "@modules/common/utils/getIconComponent";

// components
import { BoxIcon } from "@modules/common/components/BoxIcon";
import * as Shapes from "@modules/gallery/components/Shapes";
import { IconNameInput } from "@modules/gallery/components/IconNameInput";
import { IconLibrarySelect } from "@modules/gallery/components/IconLibrarySelect";

// hooks
import { useReadIconsByNameAndIconLibrary } from "@modules/gallery/hooks/useReadIconsByNameAndIconLibrary";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await api.getGalleryIcons();
    console.log("\n ~ constgetServerSideProps:GetServerSideProps= ~ data", data);
    return { props: { ...data } };
  } catch (error) {
    console.log("Error on getServerSideProps", error);
  }
};

/*
TODO: 3. When clicking view all trigger programmatically function from useReadIconsByNameAndIconLibrary hook and update "iconLibraryQuery" state / UI

*/

function Gallery({ svgs }) {
  console.log("\n ~ Gallery ~ svgs", svgs);
  // react hooks
  const [iconNameQuery, setIconNameQuery] = useState("");
  const [iconLibraryQuery, setIconLibraryQuery] = useState({ input: "All icon libraries", value: "all" });

  // debounce hooks
  const [iconNameQueryDebounced] = useDebounce(iconNameQuery, 1000);

  // query hooks
  const { data: foundIcons, isFetching } = useReadIconsByNameAndIconLibrary(
    iconNameQueryDebounced,
    iconLibraryQuery.value,
  );

  // constants
  const iconsToRender = foundIcons?.data?.svgs ?? svgs;

  const iconLibrariesOptions = [
    { value: "all", label: "All icon libraries" },
    { value: "feather", label: "Feather Icons" },
    { value: "heroicons", label: "Heroicons" },
  ].map((option) => ({ ...option, id: option.value }));

  return (
    <Stack pb={240}>
      <Stack
        alignItems="center"
        as="header"
        backgroundColor="brand.lightOrange"
        borderRadius={{ base: 0, md: 24 }}
        minHeight={{ base: 275, md: 242 }}
        marginX={-4}
        position="relative"
        textAlign="center"
        spacing={{ base: 4, md: 3 }}
        justifyContent="center"
        mb={20}
      >
        <Stack left={{ base: -3, md: "1.38rem" }} bottom={{ base: 12, md: "3.25rem" }} position="absolute">
          <Shapes.BottomLeft width={{ base: "4.06rem", md: "7.94rem" }} height={{ base: "3.5rem", md: "6.88rem" }} />
        </Stack>

        <Stack top={{ base: "0.55em", md: "2.25rem" }} right={{ base: -6, md: 0 }} position="absolute">
          <Shapes.TopRight width={{ base: "7.06rem", md: "11.19rem" }} height={{ base: "3rem", md: "5.21rem" }} />
        </Stack>

        <Text
          as="h1"
          maxWidth={{ base: 241, md: "inherit" }}
          fontSize={{ base: 24, md: 40 }}
          mixBlendMode="multiply"
          color="brand.darkRed"
        >
          All library icons in one place
        </Text>
        <Text as="h2" fontSize={{ base: 14, md: 18 }} color="brand.warmBlack">
          One finder to rule them all
        </Text>

        <Stack position="absolute" bottom={-4} left={0} right={0}>
          <Stack
            maxWidth={1064}
            width="90%"
            spacing={{ base: 2, md: 0 }}
            flexDirection={{ base: "column", md: "row" }}
            margin="0 auto"
            borderRadius={8}
            shadow="6"
            transition="all 400ms ease-in-out"
            _hover={{ shadow: "7" }}
            backgroundColor="brand.white"
            alignItems="center"
            p={2}
          >
            <IconLibrarySelect
              value={iconLibraryQuery.input}
              onChange={setIconLibraryQuery}
              options={iconLibrariesOptions}
              isFetching={false}
            />
            <IconNameInput value={iconNameQuery} onChange={setIconNameQuery} isFetching={isFetching} />
          </Stack>
        </Stack>
      </Stack>

      <Stack as="section" px={2}>
        <Accordion maxWidth={1064} width="90%" m="0 auto" defaultIndex={[0, 1, 2, 3, 4, 5]} allowToggle allowMultiple>
          {iconsToRender.map(([iconLibrary, icons], index) => {
            return (
              <AccordionItem key={iconLibrary} mt={index === 0 ? 0 : 12}>
                <AccordionButton justifyContent="space-between">
                  <Image paddingLeft={1} maxWidth={120} alt={iconLibrary} src={`/images/${iconLibrary}.png`} />
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel py={6}>
                  <SimpleGrid minChildWidth="80px" spacing="28px">
                    {icons.map((icon) => {
                      const { iconType, iconName, reactIconName } = icon;
                      const reactIcon = getIconComponent(iconLibrary, reactIconName);

                      if (!reactIcon) return null;
                      return (
                        <BoxIcon
                          key={reactIconName}
                          href={`/${iconLibrary}/${iconType}/${iconName}`}
                          icon={reactIcon}
                          label={iconName}
                          displayLabel
                        />
                      );
                    })}
                  </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Stack>
    </Stack>
  );
}

export default Gallery;
