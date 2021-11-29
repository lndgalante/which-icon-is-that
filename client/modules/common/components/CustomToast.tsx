import { Stack, Text, Icon } from "@chakra-ui/react";
import { HiOutlineInformationCircle } from "react-icons/hi";

type CustomToastProps = {
  message: string;
};

export function CustomToast({ message }: CustomToastProps) {
  return (
    <Stack
      padding={4}
      backgroundColor="brand.warmBlack"
      flexDirection="row"
      spacing={0}
      alignItems="center"
      color="brand.white"
      borderRadius={16}
      shadow={6}
    >
      <Icon
        as={HiOutlineInformationCircle}
        color="brand.grey"
        h={5}
        sx={{
          ".footer-link:hover &": {
            color: "brand.softOrange",
          },
        }}
        transition="all 200ms ease-in-out"
        w={5}
        marginRight={2}
      />
      <Text>{message}</Text>
    </Stack>
  );
}
