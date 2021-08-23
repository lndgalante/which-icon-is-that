import { Stack, Text, Image } from "@chakra-ui/react";

// components
import {
  EasyBottomLeft,
  EasyTopRight,
  DeveloperTopLeft,
  DeveloperBottomRight,
  RichTopRight,
  RichBottomLeft,
} from "@modules/home/components/Shapes";

export function Features() {
  return (
    <Stack paddingBottom={14} as="section" alignItems="center">
      <Text textAlign="center" as="h2" mb="3.1rem" fontSize={40} fontWeight={800} color="brand.orange">
        Know our features
      </Text>

      <Stack spacing={28}>
        <Stack flexDirection={{ base: "column", md: "row" }} alignItems="center" as="article">
          <Stack
            width={{ base: 335, md: 720 }}
            height={{ base: 240, md: 900 }}
            backgroundColor="brand.softOrange"
            borderRadius={24}
            overflow="hidden"
            position="relative"
          >
            <EasyTopRight position="absolute" top={20} right={85} width={{ base: "33px", md: "103px" }} />
            <EasyBottomLeft
              position="absolute"
              bottom={{ base: -6, md: 14 }}
              left={{ base: 5, md: -2 }}
              width={{ base: "48px", md: "156px" }}
              transform={{ base: "rotate(180deg)", md: "none" }}
            />
            <Stack
              width={{ base: 302, md: 876 }}
              height={{ base: 215, md: 622 }}
              top={{ base: 1, md: "8.2rem" }}
              left={{ base: 4, md: 20 }}
              position="absolute"
            >
              <Image alt="Easy to find" src="/images/easy-to-find.png" shadow="7" borderRadius={{ base: 8, md: 16 }} />
            </Stack>
          </Stack>
          <Stack
            paddingLeft={{ base: 0, md: 20 }}
            paddingBottom={{ base: 8, md: 0 }}
            order={{ base: -1, md: 0 }}
            spacing={6}
          >
            <Text as="h3" fontSize={{ base: 24, md: 40 }} fontWeight={800} color="brand.darkRed">
              Easy To Find
            </Text>
            <Text maxWidth={452} fontSize={{ base: 14, md: 18 }}>
              Just{" "}
              <Text as="span" fontWeight={700}>
                drag and drop
              </Text>{" "}
              your icon, and we will find it for you! Or use our Icon Gallery to find it visually or by the icon name.
            </Text>
          </Stack>
        </Stack>

        <Stack flexDirection="column" alignItems="center" as="article" spacing={6}>
          <Text as="h3" fontSize={40} fontWeight={800} color="brand.darkRed">
            Rich Icon Data
          </Text>

          <Stack alignItems="center" spacing={"3.65rem"}>
            <Text maxWidth={580} textAlign="center" fontSize={{ base: 14, md: 18 }}>
              All you need to know about your icon: Size, Weight,{" "}
              <Text as="span" fontWeight={700}>
                UI examples,
              </Text>{" "}
              related icons, plus all the data from its library.
            </Text>

            <Stack
              backgroundColor="brand.softGrey"
              position="relative"
              borderRadius={24}
              width={{ base: 335, md: 1064 }}
              height={{ base: 240, md: 576 }}
              overflow="hidden"
            >
              <RichTopRight position="absolute" top={{ base: 2, md: 40 }} right={{ base: 4, md: 14 }}
                width={{ base: "40px", md: "107px" }} />
              <RichBottomLeft position="absolute" bottom={{ base: -36, md: -28 }} left={{ base: 2, md: 10 }} width={{ base: "30px", md: "94px" }} />
              <Stack
                width={{ base: 302, md: 878 }}
                height={{ base: 215, md: 624 }}
                top={{ base: 1, md: "-0.3rem" }}
                left={{ base: 4, md: "0.8rem" }}
                position="absolute"
              >
                <Image
                  alt="Rich Icon data"
                  src="/images/rich-icon-data.png"
                  shadow="7"
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Stack flexDirection={{ base: "column", md: "row" }} alignItems="center" as="article">
          <Stack
            paddingRight={{ base: 0, md: 20 }}
            paddingBottom={{ base: 8, md: 0 }}
            order={{ base: -1, md: 0 }}
            spacing={6}
          >
            <Text as="h3" fontSize={{ base: 24, md: 40 }} fontWeight={800} color="brand.darkRed">
              Developer Panel
            </Text>
            <Text maxWidth={452} fontSize={{ base: 14, md: 18 }}>
              Just{" "}
              <Text as="span" fontWeight={700}>
                drag and drop
              </Text>{" "}
              your icon, and we will find it for you! Or use our Icon Gallery to find it visually or by the icon name.
            </Text>
          </Stack>

          <Stack
            width={{ base: 335, md: 720 }}
            height={{ base: 240, md: 900 }}
            backgroundColor="brand.text"
            borderRadius={24}
            overflow="hidden"
            position="relative"
          >
            <EasyTopRight position="absolute" top={20} right={85} width={{ base: "33px", md: "103px" }} />
            <EasyBottomLeft
              position="absolute"
              bottom={{ base: -6, md: 14 }}
              left={{ base: 5, md: -2 }}
              width={{ base: "48px", md: "156px" }}
              transform={{ base: "rotate(180deg)", md: "none" }}
            />

            <Stack
              width={{ base: 302, md: 876 }}
              height={{ base: 215, md: 622 }}
              top={{ base: 1, md: "8.2rem" }}
              right={{ base: 4, md: 20 }}
              position="absolute"
            >
              <Image alt="Developer panel" src="/images/developer-panel.png" shadow="7" borderRadius={{ base: 8, md: 16 }} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
