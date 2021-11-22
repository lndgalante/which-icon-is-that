
import { HStack, Text, Button } from "@chakra-ui/react";



function SupportedLibraries() {

  return (

    <HStack
      alignItems="center"
      backgroundColor="brand.lightOrange"
      borderRadius={24}
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="center"
      paddingX={8}
      paddingY={4}
      spacing={{ base: 0, md: 8 }}
    >
      <Text color="brand.darkRed" fontSize="md" fontWeight={600} marginBottom={{ base: 5, md: 0 }}>
        Is your icon library missing?
      </Text>
      <Button variant="brand.outline">Send request</Button>
    </HStack>
  )
}

export default SupportedLibraries;
