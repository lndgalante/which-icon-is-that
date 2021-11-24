import { Stack, Text, HStack, Avatar } from "@chakra-ui/react";

type TestimonialCardProps = {
  name: string;
  imageUrl: string;
  testimony: string;
  job: string;
};

function TestimonialCard({ name, imageUrl, testimony, job }: TestimonialCardProps) {
  return (
    <HStack
      flex={{ base: "0 0 323px", md: "0 0 630px" }}
      spacing={{ base: 0, md: 9 }}
      height={{ base: 500, md: 344 }}
      paddingX={10}
      paddingY={8}
      borderRadius={24}
      align="stretch"
      backgroundColor="brand.white"
      scrollSnapAlign="start"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Avatar name={name} size="xl" src={imageUrl} />
      <Stack flex={1} justifyContent="space-between">
        <Text color="brand.text" mt={{ base: 4, md: 0 }} lineHeight={2}>
          {testimony}
        </Text>

        <Stack spacing={2}>
          <Text color="brand.warmBlack" fontWeight={800}>
            {name}
          </Text>
          <Text color="brand.grey">{job}</Text>
        </Stack>
      </Stack>
    </HStack>
  );
}

export function Testimonials() {
  return (
    <Stack paddingBottom={{ base: "3.75rem", md: "8.75rem" }} as="section" alignItems="center" position="relative">
      <Stack
        backgroundColor="brand.softOrange"
        width="100vw"
        height={{ base: 924, md: 978 }}
        position="absolute"
        zIndex={0}
        top={{ base: -160, md: -320 }}
      />

      <Stack zIndex={1} spacing={{ base: 6, md: 14 }}>
        <Stack textAlign="center">
          <Text as="h2" fontSize={{ base: 24, md: 40 }} fontWeight={800} color="brand.orange">
            Dev&apos;s & Designers love us
          </Text>
          <Text as="h3" fontSize={{ base: 18, md: 18 }} color="brand.warmBlack">
            Some nice opinions we get!
          </Text>
        </Stack>

        <HStack
          scrollSnapType="x mandatory"
          overflowX="auto"
          scrollBehaviour="smooth"
          spacing={{ base: 5, md: 10 }}
          width="100vw"
          paddingX={{ base: 5, md: 10 }}
        >
          <TestimonialCard
            name="Dan Abramov"
            imageUrl="https://bit.ly/dan-abramov"
            job="Frontend Developer"
            testimony="Donec sed erat ut magna suscipit mattis. Aliquam erat volutpat. Morbi in orci risus. Donec pretium
                fringilla blandit. Etiam ut accumsan leo. Aliquam id mi quam."
          />
          <TestimonialCard
            name="Christian Nwamba"
            imageUrl="https://bit.ly/code-beast"
            job="Frontend Developer"
            testimony="Donec sed erat ut magna suscipit mattis. Aliquam erat volutpat. Morbi in orci risus. Donec pretium
                fringilla blandit. Etiam ut accumsan leo. Aliquam id mi quam."
          />
          <TestimonialCard
            name="Kent Dodds"
            imageUrl="https://bit.ly/kent-c-dodds"
            job="Frontend Developer"
            testimony="Donec sed erat ut magna suscipit mattis. Aliquam erat volutpat. Morbi in orci risus. Donec pretium
                fringilla blandit. Etiam ut accumsan leo. Aliquam id mi quam."
          />
          <TestimonialCard
            name="Ryan Florence"
            imageUrl="https://bit.ly/ryan-florence"
            job="Frontend Developer"
            testimony="Donec sed erat ut magna suscipit mattis. Aliquam erat volutpat. Morbi in orci risus. Donec pretium
                fringilla blandit. Etiam ut accumsan leo. Aliquam id mi quam."
          />
        </HStack>
      </Stack>
    </Stack>
  );
}
