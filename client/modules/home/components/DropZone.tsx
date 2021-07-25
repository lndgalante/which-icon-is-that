import { Stack, Text, Button } from "@chakra-ui/react";

export function DropZone() {
  return (
    <Stack
      _hover={{ transform: "scale(1.025)", boxShadow: "xl" }}
      backgroundColor="white"
      borderRadius={24}
      bottom={-122}
      boxShadow="lg"
      minHeight={{ base: 208, md: 262 }}
      minWidth={{ base: 335, md: 454 }}
      padding={6}
      position="absolute"
      transition="all 400ms ease"
      willChange="transform"
    >
      <Stack
        alignItems="center"
        borderColor="brand.grey"
        borderRadius={18}
        borderStyle="dashed"
        borderWidth={2}
        flex={1}
        justifyContent="center"
        paddingTop={{ base: 0, md: 12 }}
        spacing={4}
      >
        <Button paddingX={"26px"} paddingY={"25px"} variant="brand.solid">
          Upload Icon
        </Button>
        <Text
          display={{ base: "none", md: "block" }}
          fontSize="sm"
          maxWidth={204}
        >
          Drag &amp; Drop the SVG file, paste the SVG code or the icon URL
        </Text>
      </Stack>
    </Stack>
  );
}
