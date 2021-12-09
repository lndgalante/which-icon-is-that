import Fade from "react-reveal/Fade";
import { useTransform, useViewportScroll } from "framer-motion";
import { Stack, Text, Image, usePrefersReducedMotion } from "@chakra-ui/react";

// components
import * as Shapes from "@modules/home/components/Shapes";
import { MotionBox } from "@modules/common/components/MotionBox";

export function Features() {
  // chakra hooks
  const prefersReducedMotion = usePrefersReducedMotion();

  // motion hooks
  const { scrollYProgress } = useViewportScroll();
  const yShapes = useTransform(scrollYProgress, [0, 1], [-250, 250]);
  const yImages = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const xImages = useTransform(scrollYProgress, [0, 1], [-300, 0]);

  return (
    <Stack paddingBottom={{ base: "3.75rem", md: "7.3rem" }} as="section" alignItems="center">
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

      <Stack spacing={{ base: 10, md: 28 }} maxWidth="1440px">
        <Stack flexDirection={{ base: "column", md: "row" }} alignItems="center" as="article">
          <Stack
            width={{ base: "100%", md: "50%" }}
            maxWidth={{ base: 452, md: "100%" }}
            py={{ base: "5%", md: "10%" }}
            px={{ base: "5%", md: "0" }}
            backgroundColor="brand.softOrange"
            borderRadius={24}
            overflow="hidden"
            position="relative"
          >
            <MotionBox
              style={{ y: prefersReducedMotion ? 0 : yShapes }}
              position="absolute"
              width={{ base: "12%", md: "18%" }}
              top={{ base: "50%", md: "20%" }}
              right={{ base: "2%", md: "10%" }}
            >
              <Shapes.EasyTopRight width="100%" height="auto" />
            </MotionBox>
            <MotionBox
              style={{ y: prefersReducedMotion ? 0 : yShapes }}
              position="absolute"
              width={{ base: "10%", md: "20%" }}
              bottom={{ base: "65%", md: "0%" }}
              left={{ base: "2%", md: "0%" }}
            >
              <Shapes.EasyBottomLeft transform={{ base: "rotate(230deg)", md: "none" }} height="auto" />
            </MotionBox>
            <MotionBox
              style={{ x: prefersReducedMotion ? 0 : yImages }}
              width={{ base: "100%", md: "140%" }}
              pl={{ base: 0, md: "10%" }}
              margin={{ base: "0 !important", md: 0 }}
              pos="relative"
            >
              <Fade
                duration={prefersReducedMotion ? 0 : 1000}
                fraction={prefersReducedMotion ? 0 : 0.2}
                right
                distance="6.25rem"
              >
                <Image
                  alt="Easy to find"
                  src="/images/features/icon-gallery.png"
                  borderRadius={{ base: 8, md: 16 }}
                  width={{ base: "auto", md: "auto" }}
                  height={{ base: "auto", md: "auto" }}
                  objectFit="cover"
                  objectPosition={{ base: "center", md: "left" }}
                  boxShadow="9"
                />
              </Fade>
            </MotionBox>
          </Stack>

          <Stack
            paddingLeft={{ base: 0, md: 20 }}
            paddingBottom={{ base: 8, md: 0 }}
            order={{ base: -1, md: 0 }}
            spacing={{ base: "0.63rem", md: 6 }}
          >
            <Text as="h3" fontSize={{ base: 24, md: 40 }} fontWeight={800} color="brand.darkRed">
              <Fade duration={prefersReducedMotion ? 0 : 1000} bottom>
                Easy To Find
              </Fade>
            </Text>

            <Fade
              duration={prefersReducedMotion ? 0 : 1000}
              bottom
              delay={prefersReducedMotion ? 0 : 500}
              distance="0.625rem"
            >
              <Text maxWidth={452} fontSize={{ base: 14, md: 18 }}>
                Just{" "}
                <Text as="span" fontWeight={700}>
                  drag and drop
                </Text>{" "}
                your icon, and we will find it for you! Or use our Icon Gallery to find it visually or by the icon name.
              </Text>
            </Fade>
          </Stack>
        </Stack>

        <Stack
          flexDirection="column"
          alignItems={{ base: "flex-start", md: "center" }}
          as="article"
          spacing={{ base: "0.63rem", md: 6 }}
        >
          <Text as="h3" fontSize={{ base: 24, md: 40 }} fontWeight={800} color="brand.darkRed">
            <Fade duration={prefersReducedMotion ? 0 : 1000} bottom>
              Rich Icon Data
            </Fade>
          </Text>

          <Stack alignItems="center" spacing={{ base: 4, md: "3.65rem" }} width="100%">
            <Fade
              duration={prefersReducedMotion ? 0 : 1000}
              bottom
              delay={prefersReducedMotion ? 0 : 500}
              distance="0.625rem"
            >
              <Text maxWidth={452} textAlign={{ base: "left", md: "center" }} fontSize={{ base: 14, md: 18 }}>
                All you need to know about your icon: Size, Weight,{" "}
                <Text as="span" fontWeight={700}>
                  UI examples,
                </Text>{" "}
                related icons, plus all the data from its library.
              </Text>
            </Fade>

            <Stack
              backgroundColor="brand.softGrey"
              position="relative"
              borderRadius={24}
              width={{ base: "100%", md: "80%" }}
              maxWidth={{ base: 452, md: 1064 }}
              height={{ base: "auto", md: "40vw" }}
              maxHeight={{ base: "auto", md: 560 }}
              padding={{ base: "5%", md: "0" }}
              alignItems="center"
              overflow="hidden"
            >
              <MotionBox
                style={{ y: prefersReducedMotion ? 0 : yShapes }}
                position="absolute"
                width={{ base: "13%", md: "10%" }}
                top={{ base: "20%", md: "30%" }}
                right={{ base: "2%", md: "5%" }}
              >
                <Shapes.RichTopRight height="auto" />
              </MotionBox>

              <MotionBox
                style={{ y: prefersReducedMotion ? 0 : yShapes }}
                position="absolute"
                width={{ base: "10%", md: "12%" }}
                bottom={{ base: "15%", md: "10%" }}
                left={{ base: "2%", md: "5%" }}
              >
                <Shapes.RichBottomLeft height="auto" />
              </MotionBox>

              <MotionBox
                style={{ y: prefersReducedMotion ? 0 : yImages }}
                width={{ base: "100%", md: "80%" }}
                height="auto"
                marginTop={{ base: "0 !important", md: "10% !important" }}
                marginBottom={{ md: "-5% !important" }}
                zIndex={1}
              >
                <Fade
                  duration={prefersReducedMotion ? 0 : 1000}
                  fraction={prefersReducedMotion ? 0 : 0.2}
                  bottom
                  distance="6.25rem"
                >
                  <Image
                    alt="Rich Icon data"
                    src="/images/features/icon-page.png"
                    borderRadius={{ base: 8, md: 16 }}
                    objectFit="cover"
                    objectPosition="left"
                    boxShadow="9"
                    width={{ base: "auto", md: "auto" }}
                    height={{ base: "auto", md: "auto" }}
                  />
                </Fade>
              </MotionBox>
            </Stack>
          </Stack>
        </Stack>

        <Stack flexDirection={{ base: "column", md: "row" }} alignItems="center" as="article" justifyContent="flex-end">
          <Stack
            paddingRight={{ base: 0, md: 20 }}
            paddingBottom={{ base: 8, md: 0 }}
            order={{ base: -1, md: 0 }}
            spacing={{ base: "0.63rem", md: 6 }}
          >
            <Text as="h3" fontSize={{ base: 24, md: 40 }} fontWeight={800} color="brand.darkRed">
              <Fade duration={prefersReducedMotion ? 0 : 1000} bottom>
                Developer Panel
              </Fade>
            </Text>
            <Fade
              duration={prefersReducedMotion ? 0 : 1000}
              bottom
              delay={prefersReducedMotion ? 0 : 500}
              distance="0.625rem"
            >
              <Text maxWidth={452} fontSize={{ base: 14, md: 18 }}>
                Find out how to{" "}
                <Text as="span" fontWeight={700}>
                  integrate any icon
                </Text>{" "}
                into your existing codebase supporting all major technologies: From HTML to Vue or React.
              </Text>
            </Fade>
          </Stack>

          <Stack
            width={{ base: "100%", md: "50%" }}
            maxWidth={{ base: 452, md: "100%" }}
            py={{ base: "5%", md: "10%" }}
            px={{ base: "5%", md: "0" }}
            backgroundColor="brand.text"
            borderRadius={24}
            overflow="hidden"
            position="relative"
          >
            <MotionBox
              style={{ y: prefersReducedMotion ? 0 : yShapes }}
              position="absolute"
              top={{ base: 12, md: "-5%" }}
              left={{ base: 10, md: "10%" }}
              width={{ base: "3rem", md: "22%" }}
            >
              <Shapes.DeveloperTopLeft height="auto" transform={{ base: "rotate(180deg)", md: "none" }} />
            </MotionBox>

            <MotionBox
              style={{ y: prefersReducedMotion ? 0 : yShapes }}
              position="absolute"
              bottom={{ base: "15%", md: "26%" }}
              right={{ base: 1.5, md: "20%" }}
              width={{ base: "2.0625rem", md: "18%" }}
            >
              <Shapes.DeveloperBottomRight height="auto" />
            </MotionBox>

            <MotionBox
              style={{ x: prefersReducedMotion ? 0 : xImages }}
              width={{ base: "100%", md: "120%" }}
              height="auto"
              shadow="7"
              borderRadius={{ base: 8, md: 16 }}
              marginTop={{ base: "0 !important" }}
              marginLeft={{ base: 0, md: "-30% !important" }}
              zIndex={1}
            >
              <Fade duration={prefersReducedMotion ? 0 : 1000} fraction={prefersReducedMotion ? 0 : 0.2} left>
                <Image
                  alt="Developer panel"
                  src="/images/features/developer-panel.png"
                  borderRadius={{ base: 8, md: 16 }}
                  objectFit="cover"
                  objectPosition="right"
                  boxShadow="9"
                  width={{ base: "auto", md: "auto" }}
                  height={{ base: "auto", md: "auto" }}
                />
              </Fade>
            </MotionBox>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
