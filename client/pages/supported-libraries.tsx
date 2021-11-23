import {
  Text,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";

// icons
import { FiCheck, FiX, FiMoreVertical, FiLayout, FiDownload, FiExternalLink, FiFigma, FiGithub } from "react-icons/fi";

// utils
import { api } from "@modules/common/utils/api";

// components
import { ISOLOGOUS } from "@modules/common/components/Isologous";
import * as Shapes from "@modules/supported-libraries/components/Shapes";

// types
import { IconLibrariesResponse } from "@modules/common/utils/types";

type Props = {
  iconLibraries: IconLibrariesResponse["data"]["iconLibraries"];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const { data } = await api.getIconLibraries();

    return {
      props: { iconLibraries: data.iconLibraries },
      revalidate: false,
    };
  } catch (error) {
    console.log("Error on Gallery page | getStaticProps", error);
    return { props: {} };
  }
};

function SupportedLibraries({ iconLibraries }: Props) {
  return (
    <Stack pb={{ base: 9, md: 240 }} position="relative">
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
        mb={10}
      >
        <Stack left={{ base: "4.5rem", md: "13.3rem" }} bottom={{ base: 0, md: 0 }} position="absolute">
          <Shapes.BottomLeft width={{ base: "5.25rem", md: "7.94rem" }} height={{ base: "1.875rem", md: "2.75rem" }} />
        </Stack>

        <Stack left={{ base: 0, md: 0 }} top={{ base: "3.5rem", md: "3.93rem" }} position="absolute">
          <Shapes.MiddleLeft width={{ base: "3.75rem", md: "5.625rem" }} height={{ base: "2.5rem", md: "3.75rem" }} />
        </Stack>

        <Stack top={{ base: "-0.95rem", md: "-0.75rem" }} right={{ base: "4.75rem", md: "13rem" }} position="absolute">
          <Shapes.TopRight width={{ base: "5.5rem", md: "7.93rem" }} height={{ base: "1.375rem", md: "2rem" }} />
        </Stack>

        <Stack bottom={{ base: "3rem", md: "3.75rem" }} right={{ base: "-0.3rem", md: 0 }} position="absolute">
          <Shapes.MiddleRight width={{ base: "6.875rem", md: "11rem" }} height={{ base: "1.5rem", md: "1rem" }} />
        </Stack>

        <Text
          as="h1"
          maxWidth={{ base: 180, md: "inherit" }}
          fontSize={{ base: 24, md: 40 }}
          mixBlendMode="multiply"
          color="brand.darkRed"
        >
          Supported{" "}
          <Text as="b" fontWeight={700}>
            Icon Libraries
          </Text>
        </Text>
        <Text as="h2" fontSize={{ base: 14, md: 18 }} color="brand.warmBlack">
          There are some of the most popular
        </Text>
      </Stack>

      <Stack px={{ base: 0, md: 8, lg: 16 }}>
        <Table variant="simple">
          <Thead backgroundColor="brand.lightGrey">
            <Tr>
              <Th width={{ base: "100%", md: "initial" }} borderRadius={8} color="brand.warmBlack">
                Library
              </Th>
              <Th display={{ base: "none", md: "table-cell" }} color="brand.warmBlack">
                Version
              </Th>
              <Th display={{ base: "none", md: "table-cell" }} color="brand.warmBlack">
                Quantity
              </Th>
              <Th display={{ base: "none", md: "table-cell" }} color="brand.warmBlack">
                Outline
              </Th>
              <Th display={{ base: "none", md: "table-cell" }} color="brand.warmBlack">
                Solid
              </Th>
              <Th display={{ base: "none", md: "table-cell" }} color="brand.warmBlack">
                Other
              </Th>
              <Th display={{ base: "none", md: "table-cell" }} color="brand.warmBlack">
                License
              </Th>
              <Th display={{ base: "none", md: "table-cell" }} color="brand.warmBlack">
                GitHub
              </Th>
              <Th borderRadius={8}></Th>
            </Tr>
          </Thead>
          <Tbody color="brand.tableGrey" fontSize={14}>
            {iconLibraries?.map((iconLibrary) => {
              const {
                name,
                parsedName,
                version,
                totalIcons,
                iconTypes,
                stars,
                license,
                website,
                downloadLink,
                figmaLink,
                githubLink,
                contributors,
              } = iconLibrary;

              const isSolid = iconTypes.includes("Solid");
              const isOutlined = iconTypes.includes("Outlined");
              const otherTypes = iconTypes.filter((iconType) => !["Outlined", "Solid"].includes(iconType));

              return (
                <Tr key={name}>
                  <Td>
                    <Stack flexDirection="row" alignItems="center">
                      <Icon
                        w={name === "fontawesome" ? 6 : 8}
                        h={name === "fontawesome" ? 6 : 8}
                        mr={5}
                        as={ISOLOGOUS[name]}
                      />
                      <Text color="brand.warmBlack">{parsedName}</Text>
                    </Stack>
                  </Td>
                  <Td display={{ base: "none", md: "table-cell" }}>v{version}</Td>
                  <Td display={{ base: "none", md: "table-cell" }}>{totalIcons} icons</Td>
                  <Td display={{ base: "none", md: "table-cell" }}>
                    <Icon as={isOutlined ? FiCheck : FiX} />
                  </Td>
                  <Td display={{ base: "none", md: "table-cell" }}>
                    <Icon as={isSolid ? FiCheck : FiX} />
                  </Td>
                  <Td display={{ base: "none", md: "table-cell" }}>
                    <Stack spacing={0}>
                      {otherTypes.length ? (
                        otherTypes.map((otherType) => <Text key={`${name}-${otherType}`}>{otherType}</Text>)
                      ) : (
                        <Text>-</Text>
                      )}
                    </Stack>
                  </Td>
                  <Td display={{ base: "none", md: "table-cell" }}>{license}</Td>
                  <Td display={{ base: "none", md: "table-cell" }}>
                    <Stack spacing={0}>
                      <Text>{stars} stars</Text>
                      <Text>{contributors} contributors</Text>
                    </Stack>
                  </Td>
                  <Td>
                    <Menu autoSelect={false}>
                      <MenuButton
                        as={IconButton}
                        icon={<FiMoreVertical />}
                        aria-label="Options"
                        variant="brand.ghost"
                      />
                      <MenuList color="brand.text">
                        <LinkBox
                          transition="all 200ms ease-in-out"
                          _hover={{ color: "brand.lightRed", backgroundColor: "brand.lightGrey" }}
                        >
                          <LinkOverlay isExternal href={website}>
                            <MenuItem _hover={null} icon={<Icon d="flex" as={FiLayout} w={4} h={4} />}>
                              <Text>Go to gallery page</Text>
                            </MenuItem>
                          </LinkOverlay>
                        </LinkBox>

                        <LinkBox
                          transition="all 200ms ease-in-out"
                          _hover={{ color: "brand.lightRed", backgroundColor: "brand.lightGrey" }}
                        >
                          <LinkOverlay isExternal href={downloadLink}>
                            <MenuItem _hover={null} icon={<Icon d="flex" as={FiDownload} w={4} h={4} />}>
                              Download iconset
                            </MenuItem>
                          </LinkOverlay>
                        </LinkBox>

                        <LinkBox
                          transition="all 200ms ease-in-out"
                          _hover={{ color: "brand.lightRed", backgroundColor: "brand.lightGrey" }}
                        >
                          <LinkOverlay isExternal href={website}>
                            <MenuItem _hover={null} icon={<Icon d="flex" as={FiExternalLink} w={4} h={4} />}>
                              Website
                            </MenuItem>
                          </LinkOverlay>
                        </LinkBox>

                        <LinkBox
                          transition="all 200ms ease-in-out"
                          _hover={{ color: "brand.lightRed", backgroundColor: "brand.lightGrey" }}
                        >
                          <LinkOverlay isExternal href={figmaLink}>
                            <MenuItem _hover={null} icon={<Icon d="flex" as={FiFigma} w={4} h={4} />}>
                              Figma
                            </MenuItem>
                          </LinkOverlay>
                        </LinkBox>

                        <LinkBox
                          transition="all 200ms ease-in-out"
                          _hover={{ color: "brand.lightRed", backgroundColor: "brand.lightGrey" }}
                        >
                          <LinkOverlay isExternal href={githubLink}>
                            <MenuItem _hover={null} icon={<Icon d="flex" as={FiGithub} w={4} h={4} />}>
                              GitHub
                            </MenuItem>
                          </LinkOverlay>
                        </LinkBox>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Stack>
    </Stack>
  );
}

export default SupportedLibraries;
