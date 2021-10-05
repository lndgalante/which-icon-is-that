// import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { HStack, Stack, Text, SimpleGrid, Image, Button, Link, LinkBox, LinkOverlay } from "@chakra-ui/react";

// utils
import { api } from "@modules/common/utils/api";
import { getIconComponent } from "@modules/common/utils/getIconComponent";

// components
import * as Shapes from "@modules/gallery/components/Shapes";
import { Tag } from "@modules/common/components/Tag";
import { BoxIcon } from "@modules/common/components/BoxIcon";
// import { BoxIconSkeleton } from "@modules/common/components/BoxIconSkeleton";
import { IconNameInput } from "@modules/gallery/components/IconNameInput";
import { IconLibrarySelect } from "@modules/gallery/components/IconLibrarySelect";

// hooks
import { useReadIconsByNameAndIconLibrary } from "@modules/gallery/hooks/useReadIconsByNameAndIconLibrary";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await api.getGalleryIcons();

    const packNames = data.svgs.map(([packName]) => packName);
    const packs = await Promise.all(packNames.map((packName) => api.getIconLibrary(packName)));
    const parsedPacks = packs.reduce(
      (accumulator, pack) => ({ ...accumulator, [pack.data.name]: { ...pack.data } }),
      {},
    );
    return { props: { ...data, packs: parsedPacks } };
  } catch (error) {
    console.log("Error on getServerSideProps", error);
  }
};

/*
TODO:
  - [BE] Get icon_libraries options from API (value: name, label: parsed_name)
  - [FE] Add empty state when no icon is found
  - [FE] Improve mobile support
*/

/* const iconsSkeletons = [
  ["feather", Array.from({ length: 20 }, () => ({ key: nanoid() }))],
]; */

const iconLibrariesOptions = [
  { value: "all", label: "All icon libraries" },
  { value: "feather", label: "Feather Icons" },
  { value: "heroicons", label: "Heroicons" },
].map((option) => ({ ...option, id: option.value }));

function Gallery({ svgs, packs }) {
  // next hooks
  const { push, query } = useRouter();

  // constants
  const decodedIconNameQuery = decodeURI((query.iconName ?? "") as string);
  const decodedIconLibraryQuery = decodeURI((query.iconLibrary ?? "all") as string);
  const defaultIconLibrary = iconLibrariesOptions.find(({ value }) => value === decodedIconLibraryQuery);

  // react hooks
  const [iconNameQuery, setIconNameQuery] = useState(decodedIconNameQuery);
  const [iconLibraryQuery, setIconLibraryQuery] = useState(defaultIconLibrary);

  // debounce hooks
  const [iconNameQueryDebounced] = useDebounce(iconNameQuery, 1000);

  // query hooks
  const { data: foundIcons, isFetching } = useReadIconsByNameAndIconLibrary(
    iconNameQueryDebounced,
    iconLibraryQuery.value,
  );

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

  // handlers
  function handleLibraryViewAll(iconLibrary: string) {
    const selectedIconlibrary = iconLibrariesOptions.find(({ value }) => value === iconLibrary);
    setIconLibraryQuery(selectedIconlibrary);
  }

  // constants
  const iconsToRender = foundIcons?.data?.svgs ?? svgs;

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
              label={iconLibraryQuery.label}
              value={iconLibraryQuery.value}
              onChange={setIconLibraryQuery}
              options={iconLibrariesOptions}
            />
            <IconNameInput value={iconNameQuery} onChange={setIconNameQuery} isFetching={isFetching} />
          </Stack>
        </Stack>
      </Stack>

      <Stack as="section" px={2}>
        <Stack maxWidth={1064} width="90%" m="0 auto" defaultIndex={[0, 1, 2, 3, 4, 5]} allowToggle allowMultiple>
          {/*  {isFetching &&
            iconsSkeletons.map(([iconLibrary, icons]) => {
              console.log("\n ~ iconsSkeletons.map ~ icons", icons);
              console.log("\n ~ iconsSkeletons.map ~ iconLibrary", iconLibrary);
              return (
                <Stack>
                  <HStack justifyContent="space-between" alignItems="center">
                    <HStack spacing={8}>
                      <Image paddingLeft={1} maxWidth={120} alt={iconLibrary} src={`/images/${iconLibrary}.png`} />
                      <HStack>
                        <Tag>V1.1.1</Tag>
                        <Tag>124 icons</Tag>
                        <Tag>Outline</Tag>
                      </HStack>
                    </HStack>
                    <Button variant="brand.ghost" fontSize={14} fontWeight={500}>
                      View all
                    </Button>
                  </HStack>
                  <Stack py={6}>
                    <SimpleGrid minChildWidth="80px" spacing="28px">
                      {icons.map((icon) => {
                        return <BoxIconSkeleton key={icon.key} displayLabel primary withShadow />;
                      })}
                    </SimpleGrid>
                  </Stack>
                </Stack>
              );
            })} */}

          {iconsToRender.map(([iconLibrary, icons]) => {
            const packMetadata = packs[iconLibrary];

            return (
              <Stack key={iconLibrary}>
                <HStack
                  transform="all 400ms ease-in-out"
                  position="sticky"
                  zIndex={5}
                  top={2}
                  justifyContent="space-between"
                  alignItems="center"
                  backgroundColor="brand.white"
                  py={2}
                >
                  <HStack spacing={8}>
                    <Stack width={130}>
                      <LinkBox>
                        <LinkOverlay isExternal href={packMetadata.website}>
                          <Image paddingLeft={1} maxWidth={120} alt={iconLibrary} src={`/images/${iconLibrary}.png`} />
                        </LinkOverlay>
                      </LinkBox>
                    </Stack>
                    <HStack>
                      <Tag>V{packMetadata.version}</Tag>
                      <Tag>{packMetadata.totalIcons} icons</Tag>
                      {packMetadata.iconTypes.map((iconType) => (
                        <Tag>{iconType}</Tag>
                      ))}
                    </HStack>
                  </HStack>
                  <Button
                    variant="brand.ghost"
                    fontSize={14}
                    fontWeight={500}
                    onClick={() => handleLibraryViewAll(iconLibrary)}
                  >
                    View all
                  </Button>
                </HStack>
                <Stack py={6}>
                  <SimpleGrid gridTemplateColumns="repeat(auto-fit, 80px)" spacing="28px">
                    {icons.map((icon) => {
                      const { iconType, iconName, reactIconName } = icon;
                      const reactIcon = getIconComponent(iconLibrary, reactIconName);

                      if (!reactIcon) return null;
                      return (
                        <Stack width="80px" key={reactIconName}>
                          <BoxIcon
                            href={`/${iconLibrary}/${iconType}/${iconName}`}
                            icon={reactIcon}
                            label={iconName}
                            displayLabel
                          />
                        </Stack>
                      );
                    })}
                  </SimpleGrid>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Gallery;
