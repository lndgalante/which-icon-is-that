import { Icon, Stack, Text, Tabs, TabList, TabPanels, HStack, As } from "@chakra-ui/react";

// components
import { CustomTab } from "@modules/icon/components/CustomTab";
import { CustomTabPanel } from "@modules/icon/components/CustomTabPanel";

// hooks
import { useReadFoundTimes } from "@modules/icon/hooks/useReadFoundTimes";
import { useGenerateTabUrl } from "@modules/common/hooks/useGenerateTabUrl";

type IconPlaygroundProps = {
  hash: string;
  reactIcon: As;
  iconSize: string;
  iconTypes: string[];
  selectedTabIndex: number;
};

export function IconPlayground({ hash, iconSize, iconTypes, reactIcon, selectedTabIndex }: IconPlaygroundProps) {
  // custom hooks
  const { generateTabUrl } = useGenerateTabUrl();
  const { data, isLoading } = useReadFoundTimes(hash);

  return (
    <Stack as="article">
      <Tabs variant="unstyled" index={selectedTabIndex}>
        <TabList>
          {iconTypes.map((iconType) => (
            <CustomTab key={iconType} href={generateTabUrl(iconType.split(" ").join(""))}>
              {iconType}
            </CustomTab>
          ))}
        </TabList>

        <TabPanels>
          {iconTypes.map((iconType) => (
            <CustomTabPanel key={iconType}>
              <HStack position="relative" justifyContent="space-around" flex={1}>
                <Stack
                  paddingX={2}
                  paddingY={0.5}
                  position="absolute"
                  left={3}
                  bottom={-14}
                  backgroundColor="brand.white"
                >
                  <Text color="brand.warmBlack" fontSize="sm" opacity={0.5}>
                    Size: {iconSize}
                  </Text>
                </Stack>
                <Stack
                  paddingX={2}
                  paddingY={0.5}
                  position="absolute"
                  right={3}
                  bottom={-14}
                  backgroundColor="brand.white"
                >
                  <Text color="brand.warmBlack" fontSize="sm" opacity={0.5}>
                    {isLoading ? "Loading..." : `Found: ${data?.data?.found} times`}
                  </Text>
                </Stack>
                <Stack
                  position="relative"
                  _hover={{ "::before": { opacity: 1 }, "::after": { opacity: 1 } }}
                  _before={{
                    transition: "all 400ms ease-in-out",
                    content: `""`,
                    opacity: 0,
                    position: "absolute",
                    borderWidth: 1,
                    borderColor: "brand.lightRed",

                    width: "100%",
                    height: "100%",
                  }}
                  _after={{
                    transition: "all 400ms ease-in-out",
                    content: `""`,
                    opacity: 0,
                    position: "absolute",
                    top: "-25%",
                    left: "-25%",
                    borderWidth: 1,
                    borderColor: "brand.lightRed",
                    width: "150%",
                    height: "150%",
                  }}
                  className="icon-container"
                >
                  <Icon as={reactIcon} w={6} h={6} opacity={0.3} />

                  <Stack
                    transition="all 400ms ease-in-out"
                    sx={{ ".icon-container:hover &": { opacity: 1 } }}
                    opacity={0}
                    width="fit-content"
                    position="absolute"
                    paddingX={2}
                    fontSize="xs"
                    color="brand.white"
                    bottom={-8}
                    left={-3.5}
                    textAlign="center"
                    backgroundColor="brand.lightRed"
                    borderRadius={4}
                  >
                    <Text>24x24</Text>
                  </Stack>

                  <Stack
                    transition="all 400ms ease-in-out"
                    sx={{
                      ".icon-container:hover &": {
                        opacity: 1,
                      },
                    }}
                    opacity={0}
                    position="absolute"
                    w="7px"
                    h="6px"
                    top="-13px"
                    left="-6px"
                    backgroundColor="brand.lightRed"
                  ></Stack>
                </Stack>

                <Stack
                  position="relative"
                  _hover={{ "::before": { opacity: 1 }, "::after": { opacity: 1 } }}
                  _before={{
                    transition: "all 400ms ease-in-out",
                    content: `""`,
                    opacity: 0,
                    position: "absolute",
                    borderWidth: 1,
                    borderColor: "brand.lightRed",
                    width: "100%",
                    height: "100%",
                  }}
                  _after={{
                    transition: "all 400ms ease-in-out",
                    content: `""`,
                    opacity: 0,
                    position: "absolute",
                    top: "-16%",
                    left: "-16%",
                    borderWidth: 1,
                    borderColor: "brand.lightRed",
                    width: "135%",
                    height: "135%",
                  }}
                  className="icon-container"
                >
                  <Icon as={reactIcon} w={12} h={12} opacity={0.5} />
                  <Stack
                    transition="all 400ms ease-in-out"
                    sx={{ ".icon-container:hover &": { opacity: 1 } }}
                    opacity={0}
                    width="fit-content"
                    position="absolute"
                    paddingX={2}
                    fontSize="xs"
                    color="brand.white"
                    bottom={-8}
                    left={-0.5}
                    textAlign="center"
                    backgroundColor="brand.lightRed"
                    borderRadius={4}
                  >
                    <Text>48x48</Text>
                  </Stack>

                  <Stack
                    transition="all 400ms ease-in-out"
                    sx={{
                      ".icon-container:hover &": {
                        opacity: 1,
                      },
                    }}
                    opacity={0}
                    position="absolute"
                    w="8px"
                    h="9px"
                    top={-4}
                    left="-7px"
                    backgroundColor="brand.lightRed"
                  ></Stack>
                </Stack>

                <Stack
                  position="relative"
                  _hover={{ "::before": { opacity: 1 }, "::after": { opacity: 1 } }}
                  _before={{
                    transition: "all 400ms ease-in-out",
                    content: `""`,
                    opacity: 0,
                    position: "absolute",
                    borderWidth: 1,
                    borderColor: "brand.lightRed",
                    left: "2px",
                    top: "2px",
                    width: "76px",
                    height: "76px",
                  }}
                  _after={{
                    transition: "all 400ms ease-in-out",
                    content: `""`,
                    opacity: 0,
                    position: "absolute",
                    top: "-10%",
                    left: "-10%",
                    borderWidth: 1,
                    borderColor: "brand.lightRed",
                    width: "120%",
                    height: "120%",
                  }}
                  className="icon-container"
                >
                  <Icon as={reactIcon} w={20} h={20} />
                  <Stack
                    transition="all 400ms ease-in-out"
                    sx={{ ".icon-container:hover &": { opacity: 1 } }}
                    opacity={0}
                    width="fit-content"
                    position="absolute"
                    paddingX={2}
                    fontSize="xs"
                    color="brand.white"
                    bottom={-8}
                    left={3.5}
                    textAlign="center"
                    backgroundColor="brand.lightRed"
                    borderRadius={4}
                  >
                    <Text>80x80</Text>
                  </Stack>

                  <Stack
                    transition="all 400ms ease-in-out"
                    sx={{
                      ".icon-container:hover &": {
                        opacity: 1,
                      },
                    }}
                    opacity={0}
                    position="absolute"
                    w="11px"
                    h="10px"
                    top={-4}
                    left={-2}
                    backgroundColor="brand.lightRed"
                  ></Stack>
                </Stack>

                <Stack
                  display={{ base: "none", md: "flex" }}
                  position="relative"
                  _hover={{ "::before": { opacity: 1 }, "::after": { opacity: 1 } }}
                  _before={{
                    transition: "all 400ms ease-in-out",
                    content: `""`,
                    opacity: 0,
                    position: "absolute",
                    borderWidth: 1,
                    borderColor: "brand.lightRed",
                    width: "100%",
                    height: "100%",
                  }}
                  _after={{
                    transition: "all 400ms ease-in-out",
                    content: `""`,
                    opacity: 0,
                    position: "absolute",
                    top: "-16%",
                    left: "-16%",
                    borderWidth: 1,
                    borderColor: "brand.lightRed",
                    width: "135%",
                    height: "135%",
                  }}
                  className="icon-container"
                >
                  <Icon as={reactIcon} w={12} h={12} opacity={0.5} />
                  <Stack
                    transition="all 400ms ease-in-out"
                    sx={{ ".icon-container:hover &": { opacity: 1 } }}
                    opacity={0}
                    width="fit-content"
                    position="absolute"
                    paddingX={2}
                    fontSize="xs"
                    color="brand.white"
                    bottom={-8}
                    left={-0.5}
                    textAlign="center"
                    backgroundColor="brand.lightRed"
                    borderRadius={4}
                  >
                    <Text>48x48</Text>
                  </Stack>

                  <Stack
                    transition="all 400ms ease-in-out"
                    sx={{
                      ".icon-container:hover &": {
                        opacity: 1,
                      },
                    }}
                    opacity={0}
                    position="absolute"
                    w="8px"
                    h="9px"
                    top={-4}
                    left="-7px"
                    backgroundColor="brand.lightRed"
                  ></Stack>
                </Stack>

                <Stack
                  display={{ base: "none", md: "flex" }}
                  position="relative"
                  _hover={{ "::before": { opacity: 1 }, "::after": { opacity: 1 } }}
                  _before={{
                    transition: "all 400ms ease-in-out",
                    content: `""`,
                    opacity: 0,
                    position: "absolute",
                    borderWidth: 1,
                    borderColor: "brand.lightRed",
                    width: "100%",
                    height: "100%",
                  }}
                  _after={{
                    transition: "all 400ms ease-in-out",
                    content: `""`,
                    opacity: 0,
                    position: "absolute",
                    top: "-25%",
                    left: "-25%",
                    borderWidth: 1,
                    borderColor: "brand.lightRed",
                    width: "150%",
                    height: "150%",
                  }}
                  className="icon-container"
                >
                  <Icon as={reactIcon} w={6} h={6} opacity={0.3} />

                  <Stack
                    transition="all 400ms ease-in-out"
                    sx={{
                      ".icon-container:hover &": {
                        opacity: 1,
                      },
                    }}
                    opacity={0}
                    width="fit-content"
                    position="absolute"
                    paddingX={2}
                    fontSize="xs"
                    color="brand.white"
                    bottom={-8}
                    left={-3}
                    textAlign="center"
                    backgroundColor="brand.lightRed"
                    borderRadius={4}
                  >
                    <Text>24x24</Text>
                  </Stack>

                  <Stack
                    transition="all 400ms ease-in-out"
                    sx={{
                      ".icon-container:hover &": {
                        opacity: 1,
                      },
                    }}
                    opacity={0}
                    position="absolute"
                    w="7px"
                    h="6px"
                    top="-13px"
                    left="-6px"
                    backgroundColor="brand.lightRed"
                  ></Stack>
                </Stack>
              </HStack>
            </CustomTabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Stack>
  );
}
