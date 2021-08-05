import { FaInfoCircle } from "react-icons/fa";
import { Stack, Text, Icon } from "@chakra-ui/react";

type CustomToastProps = {
  message: string
}

export function CustomToast({ message }: CustomToastProps) {
  return (
    <Stack
      padding={4}
      backgroundColor="brand.lightRed"
      flexDirection="row"
      spacing={0}
      alignItems="center"
      color="brand.white"
      borderRadius={16}
      boxShadow="sm"
    >
      <Icon
        as={FaInfoCircle}
        color="brand.white"
        h={5}
        sx={{
          ".footer-link:hover &": {
            color: "brand.softOrange",
          },
        }}
        transition="all 400ms ease-in-out"
        w={5}
        marginRight={2}
      />
      <Text>{message}</Text>
    </Stack>
  );
}
