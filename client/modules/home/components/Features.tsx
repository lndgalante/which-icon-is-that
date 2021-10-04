import { Stack, Text, Image } from "@chakra-ui/react";

// components
import * as Shapes from "@modules/home/components/Shapes";

export function Features() {
  return (
    <Stack paddingBottom={{ base: "3.75rem", md: "3.75rem" }} as="section" alignItems="center">
      <Text
        textAlign="center"
        as="h2"
        mb={{ base: "0.7rem", md: "3.1rem" }}
        fontSize={{ base: 24, md: 40 }}
        fontWeight={800}
        color="brand.orange"
      >
        Know our features
      </Text>

      <Stack spacing={{ base: 10, md: 28 }} >
        <Stack flexDirection={{ base: "column", md: "row" }} alignItems="center" as="article">
          <Stack
            width={{ base: 335, md: 720 }}
            height={{ base: 240, md: 900 }}
            backgroundColor="brand.softOrange"
            borderRadius={24}
            overflow="hidden"
            position="relative"
          >
            <Shapes.EasyTopRight position="absolute" top={20} right={85} width={{ base: "2.0625rem", md: "6.4375rem" }} />
            <Shapes.EasyBottomLeft
              position="absolute"
              bottom={{ base: 28, md: 14 }}
              left={{ base: 2, md: -2 }}
              width={{ base: "3rem", md: "9.75rem" }}
              transform={{ base: "rotate(260deg)", md: "none" }}
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
            spacing={{ base: "0.63rem", md: 6 }}
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

        <Stack
          flexDirection="column"
          alignItems={{ base: "flex-start", md: "center" }}
          as="article"
          spacing={{ base: "0.63rem", md: 6 }}
        >
          <Text as="h3" fontSize={{ base: 24, md: 40 }} fontWeight={800} color="brand.darkRed">
            Rich Icon Data
          </Text>

          <Stack alignItems="center" spacing={{ base: 4, md: "3.65rem" }}>
            <Text maxWidth={452} textAlign={{ base: "left", md: "center" }} fontSize={{ base: 14, md: 18 }}>
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
              <Shapes.RichTopRight
                position="absolute"
                top={{ base: 2, md: 40 }}
                right={{ base: 4, md: 12 }}
                width={{ base: "2.5rem", md: "6.625rem" }}
              />
              <Shapes.RichBottomLeft
                position="absolute"
                bottom={{ base: -36, md: -28 }}
                left={{ base: 2, md: 10 }}
                width={{ base: "1.875rem", md: "5.875rem" }}
              />
              <Stack
                width={{ base: 302, md: 878 }}
                height={{ base: 215, md: 624 }}
                top={{ base: 1, md: 9 }}
                left={{ base: 4, md: "5.8rem" }}
                position="absolute"
              >
                <Image alt="Rich Icon data" src="/images/rich-icon-data.png" shadow="7" />
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Stack flexDirection={{ base: "column", md: "row" }} alignItems="center" as="article">
          <Stack
            paddingRight={{ base: 0, md: 20 }}
            paddingBottom={{ base: 8, md: 0 }}
            order={{ base: -1, md: 0 }}
            spacing={{ base: "0.63rem", md: 6 }}
          >
            <Text as="h3" fontSize={{ base: 24, md: 40 }} fontWeight={800} color="brand.darkRed">
              Developer Panel
            </Text>
            <Text maxWidth={452} fontSize={{ base: 14, md: 18 }}>
              Find out how to {" "}
              <Text as="span" fontWeight={700}>
                integrate any icon
              </Text>{" "}
              into your existing codebase supporting all major technologies: From HTML to Vue or React.
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
            <Shapes.DeveloperBottomRight position="absolute" bottom={{ base: -28, md: -10 }} right={{ base: 1.5, md: "9.15rem" }} width={{ base: "2.0625rem", md: "6.4375rem" }} />
            <Shapes.DeveloperTopLeft
              position="absolute"
              top={{ base: 12, md: "5.4rem" }}
              left={{ base: 10, md: "3.7rem" }}
              width={{ base: "3rem", md: "9.75rem" }}
              transform={{ base: "rotate(180deg)", md: "none" }}
            />

            <Stack
              width={{ base: 302, md: 876 }}
              height={{ base: 215, md: 622 }}
              top={{ base: 1, md: "8.2rem" }}
              right={{ base: 4, md: 20 }}
              position="absolute"
            >
              <Image
                alt="Developer panel"
                src="/images/developer-panel.png"
                shadow="7"
                borderRadius={{ base: 8, md: 16 }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
