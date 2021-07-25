import React from "react";
import { Center } from "@chakra-ui/react";

// components
import { Info } from "components/Info";

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <Center
      as="main"
      bgGradient="linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)"
      flexDirection="column"
      height="100vh"
    >
      {children}
      <Info />
    </Center>
  );
}
