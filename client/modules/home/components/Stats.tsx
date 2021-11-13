import { Stack, Text, Wrap } from "@chakra-ui/react";

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
      spacing={{base:10, md:14}}
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
    <Stack paddingBottom={{ base: "3.75rem", md: "3.75rem" }} as="section" alignItems="center">
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

      <Wrap spacing={{ base: 5, md:10 }} justify="center" align="center" shouldWrapChildren>
        <StatBox shape={<Serve />} title="we serve" subtitle={`+${totalIcons} icons`} />
        <StatBox shape={<Libraries />} title="from" subtitle={`+${totalLibraries - 1} libraries`} />
        <StatBox shape={<Styles />} title="in" subtitle={`${totalStyles} styles`} />
      </Wrap>
    </Stack>
  );
}
