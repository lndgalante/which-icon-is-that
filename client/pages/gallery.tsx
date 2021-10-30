import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { HStack, Stack, Text, SimpleGrid, Image, Button, LinkBox, LinkOverlay } from "@chakra-ui/react";

// utils
import { api } from "@modules/common/utils/api";
import { getIconComponent } from "@modules/common/utils/getIconComponent";

// components
import * as Shapes from "@modules/gallery/components/Shapes";
import { Tag } from "@modules/common/components/Tag";
import { BoxIcon } from "@modules/common/components/BoxIcon";
import { BrokenLogo } from "@modules/common/components/BrokenLogo";
import { MotionFade } from "@modules/common/components/MotionFade";
import { IconNameInput } from "@modules/gallery/components/IconNameInput";
import { BoxIconSkeleton } from "@modules/common/components/BoxIconSkeleton";
import { IconLibrarySelect } from "@modules/gallery/components/IconLibrarySelect";

// hooks
import { useReadIconsByNameAndIconLibrary } from "@modules/gallery/hooks/useReadIconsByNameAndIconLibrary";

// types

import { IconLibraryResponse, IconLibrary } from "@modules/common/utils/types";
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await api.getGalleryIcons();

    const packNames = data.svgs.map(([packName]) => packName);
    const packs = await Promise.all<IconLibraryResponse>(packNames.map((packName) => api.getIconLibrary(packName)));
    const parsedPacks: { [key: string]: IconLibrary } = packs.reduce(
      (accumulator, pack) => ({ ...accumulator, [pack.data.name]: { ...pack.data } }),
      {},
    );
    return { props: { ...data, packs: parsedPacks } };
  } catch (error) {
    console.log("Error on getServerSideProps", error);
  }
};

const ALL_LIBRARIES = { value: "all", label: "All icon libraries" };

const iconLibrariesOptions = [
  ALL_LIBRARIES,
  { value: "bootstrap", label: "Bootstrap Icons" },
  { value: "feather", label: "Feather Icons" },
  { value: "heroicons", label: "Heroicons" },
  { value: "antdesign", label: "Ant Design" },
  { value: "boxicons", label: "Boxicons" },
  { value: "fontawesome", label: "Fontawesome" },
  { value: "flatcoloricons", label: "Icons8" },
];

function Gallery({ svgs, packs }) {
  // next hooks
  const { push, query } = useRouter();

  // constants
  const decodedIconNameQuery = decodeURI((query.iconName ?? "") as string);
  const decodedIconLibraryQuery = decodeURI((query.iconLibrary ?? "all") as string);
  const defaultIconLibrary = iconLibrariesOptions.find(({ value }) => value === decodedIconLibraryQuery);

  // react hooks
  const [viewAllIconLibrary, setViewAllIconLibrary] = useState("");
  const [iconNameQuery, setIconNameQuery] = useState(decodedIconNameQuery);
  const [iconLibraryQuery, setIconLibraryQuery] = useState(defaultIconLibrary);

  // debounce hooks
  const [iconNameQueryDebounced] = useDebounce(iconNameQuery, 1000);

  // query hooks
  const {
    error,
    isFetching,
    data: foundIcons,
  } = useReadIconsByNameAndIconLibrary(iconNameQueryDebounced, iconLibraryQuery.value, viewAllIconLibrary);

  // effects
  useEffect(
    function updateQueryParams() {
      push(
        {
          query: {
            iconLibrary: encodeURI(iconLibraryQuery.value),
            ...(iconNameQueryDebounced && { iconName: encodeURI(iconNameQueryDebounced) }),
          },
        },
        undefined,
        { shallow: true },
      );
    },
    [iconLibraryQuery, iconNameQueryDebounced],
  );

  useEffect(
    function cleanViewAllOnNameQueryChange() {
      if (iconNameQuery) {
        handleClearLibrarySelection();
      }
    },
    [iconNameQuery],
  );

  // handlers
  function handleChangeIconName(value) {
    setIconNameQuery(value);
  }

  function handleLibraryViewAll(iconLibrary: string) {
    setViewAllIconLibrary(iconLibrary);
  }

  function handleClearLibrarySelection() {
    setViewAllIconLibrary("");
  }

  function handleClearAllFilters() {
    setIconNameQuery("");
    setIconLibraryQuery(ALL_LIBRARIES);
  }

  // constants
  const isIconLibrarySelected = iconLibraryQuery.value !== "all";

  const hasFiltersActive = Boolean(iconNameQuery || isIconLibrarySelected);

  const iconsToRender = foundIcons?.data?.svgs ?? svgs;

  const parsedIconsToRender = viewAllIconLibrary
    ? iconsToRender.filter(([iconLibrary]) => iconLibrary === viewAllIconLibrary)
    : iconsToRender;


  return (
    <Stack pb={{ base: 9, md: 240 }}>
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

        <Stack top={{ base: "0.55em", md: "2.25rem" }} right={{ base: 0, md: 0 }} position="absolute">
          <Shapes.TopRight width={{ base: "7.06rem", md: "11.19rem" }} height={{ base: "3rem", md: "5.21rem" }} />
        </Stack>

        <Text
          as="h1"
          maxWidth={{ base: 241, md: "inherit" }}
          fontSize={{ base: 24, md: 40 }}
          mixBlendMode="multiply"
          color="brand.darkRed"
        >
          All library icons{" "}
          <Text as="b" fontWeight={700}>
            in one place
          </Text>
        </Text>
        <Text as="h2" fontSize={{ base: 14, md: 18 }} color="brand.warmBlack">
          One finder to rule them all
        </Text>

        <Stack position="absolute" bottom={-4} left={0} right={0}>
          <Stack
            maxWidth={1064}
            width="90%"
            spacing={0}
            flexDirection={{ base: "column", md: "row" }}
            margin="0 auto"
            borderRadius={8}
            shadow="6"
            transition="all 200ms ease-in-out"
            _hover={{ shadow: "7" }}
            backgroundColor="brand.white"
            alignItems="center"
            justifyContent="center"
            p={2}
            position="relative"
          >
            <IconLibrarySelect
              label={iconLibraryQuery.label}
              value={iconLibraryQuery.value}
              onChange={setIconLibraryQuery}
              options={iconLibrariesOptions}
            />
            <IconNameInput
              value={iconNameQuery}
              onChange={setIconNameQuery}
              shouldDisplayCross={hasFiltersActive}
              onCrossClick={handleClearAllFilters}
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack as="section" px={2}>
        <Stack maxWidth={1064} width="100%" m="0 auto" paddingTop={{ base: 4, md: 0 }}>
          <MotionFade>
            {error && (
              <Stack alignItems="center" minHeight={320} mt={{ base: 45, md: 0 }}>
                <Stack
                  maxWidth={{ base: 284, md: 360 }}
                  spacing={4}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                >
                  <BrokenLogo />
                  <Text>
                    Sorry, we did not find any icon, you can try looking for another icon or in another library.
                  </Text>
                </Stack>
              </Stack>
            )}

            {!error &&
              parsedIconsToRender.map(([iconLibrary, icons]) => {
                const packMetadata = packs[iconLibrary];

                return (
                  <Stack key={iconLibrary} className="icon-library-container">
                    <HStack
                      transform="all 200ms ease-in-out"
                      position="sticky"
                      zIndex={5}
                      top={2}
                      justifyContent="space-between"
                      alignItems="center"
                      backgroundColor="brand.white"
                      p={2}
                    >
                      <HStack spacing={{ base: 4, md: 8 }}>
                        <Stack width={140}>
                          <LinkBox>
                            <LinkOverlay isExternal href={packMetadata.website}>
                              <Image
                                paddingLeft={1}
                                alt={iconLibrary}
                                filter="grayscale(1)"
                                opacity={0.6}
                                transition="all 200ms ease-in-out"
                                src={`/images/${iconLibrary}-color.png`}
                                sx={{ ".icon-library-container:hover &": { filter: "grayscale(0)", opacity: 1 } }}
                              />
                            </LinkOverlay>
                          </LinkBox>
                        </Stack>
                        <HStack display={{ base: "none", md: "inherit" }}>
                          <Tag>V{packMetadata.version}</Tag>
                          <Tag display={{ base: "none", md: "inherit" }}>{packMetadata.totalIcons} icons</Tag>
                          {packMetadata.iconTypes.map((iconType) => (
                            <Tag key={`${iconLibrary}-${iconType}`} display={{ base: "none", md: "inherit" }}>
                              {iconType}
                            </Tag>
                          ))}
                        </HStack>
                      </HStack>
                      <Button
                        variant="brand.ghost"
                        fontSize={14}
                        fontWeight={500}
                        display={iconNameQueryDebounced ? "none" : "inherit"}
                        onClick={() =>
                          iconLibrary === viewAllIconLibrary
                            ? handleClearLibrarySelection()
                            : handleLibraryViewAll(iconLibrary)
                        }
                      >
                        {`View ${iconLibrary === viewAllIconLibrary ? "less" : "all"}`}
                      </Button>
                    </HStack>
                    <Stack py={6}>
                      <SimpleGrid gridTemplateColumns="repeat(auto-fit, 80px)" spacing={{ base: "14px", md: "28px" }}>
                        {icons.map((icon) => {
                          const { iconType, iconName, reactIconName } = icon;
                          const isTwoTone = iconType === 'twotone';
                          const reactIcon = getIconComponent(iconLibrary, reactIconName);

                          if (!reactIcon) return null;

                          return (
                            <Stack width="80px" key={reactIconName}>
                              {isFetching ? (
                                <BoxIconSkeleton primary displayLabel withShadow />
                              ) : (
                                <BoxIcon
                                  href={`/${iconLibrary}/${iconType}/${iconName}`}
                                  icon={reactIcon}
                                  label={iconName}
                                  isTwoTone={isTwoTone}
                                  displayLabel
                                />
                              )}
                            </Stack>
                          );
                        })}
                      </SimpleGrid>
                    </Stack>
                  </Stack>
                );
              })}
          </MotionFade>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Gallery;
