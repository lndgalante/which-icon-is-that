import { Stack, Text, Wrap } from "@chakra-ui/react";
import Fade from "react-reveal/Fade";

// types
import { Stats as StatsType } from "@modules/common/utils/types";

// components
import { Serve, Libraries, Styles } from "@modules/home/components/Shapes";

type StatsProps = StatsType;

type StatBoxProps = {
  shape: JSX.Element;
  title: string;
  subtitle: string;
};

function StatBox({ shape, title, subtitle }: StatBoxProps) {
  return (
    <Stack
      minWidth={{ base: 280, md: 328 }}
      minHeight={{ base: 284, md: 332 }}
      borderRadius={24}
      bg="brand.lightOrange"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      spacing={{ base: 10, md: 2 }}
      textAlign="center"
      as="article"
    >
      {shape}
      <Stack>
        <Text fontSize={18} textTransform="uppercase" color="brand.darkRed">
          {title}
        </Text>
        <Text fontSize={28} fontWeight={800} color="brand.lightRed">
          {subtitle}
        </Text>
      </Stack>
    </Stack>
  );
}

export function Stats({ totalIcons, totalLibraries, totalStyles }: StatsProps) {
  return (
    <Stack paddingBottom={{ base: "1.25rem", md: "8.75rem" }} as="section" alignItems="center" zIndex={1}>
      <Text
        textAlign="center"
        as="h2"
        mb={{ base: "0.7rem", md: "3.1rem" }}
        fontSize={{ base: 24, md: 40 }}
        fontWeight={800}
        color="brand.lightRed"
      >
        Our Product in Numbers
      </Text>

      <Wrap spacing={{ base: 5, md: 10 }} justify="center" align="center" shouldWrapChildren>
        <Fade bottom distance="100px" delay={200}>
          <StatBox
            shape={
              <Stack height={140} pt={3}>
                <Serve />
              </Stack>
            }
            title="we serve"
            subtitle={`+${totalIcons} icons`}
          />
        </Fade>
        <Fade bottom distance="100px" delay={400}>
          <StatBox
            shape={
              <Stack height={140}>
                <Libraries />
              </Stack>
            }
            title="from"
            subtitle={`+${totalLibraries - 1} libraries`}
          />
        </Fade>

        <Fade bottom distance="100px" delay={600}>
          <StatBox
            shape={
              <Stack height={140}>
                <Styles />
              </Stack>
            }
            title="in"
            subtitle={`${totalStyles} styles`}
          />
        </Fade>
      </Wrap>
    </Stack>
  );
}
