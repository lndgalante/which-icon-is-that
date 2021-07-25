import { Stack } from "@chakra-ui/react";

// components
import { Navbar } from "@modules/common/components/Navbar";
import { Footer } from "@modules/common/components/Footer";

import { Header } from "@modules/home/components/Header";
import { ExampleIcons } from "@modules/home/components/ExampleIcons";
import { SupportedLibraries } from "@modules/home/components/SupportedLibraries";

export default function Home() {
  return (
    <Stack backgroundColor="brand.white">
      <Stack as="main" paddingX={{ base: 0, md: 12 }}>
        <Navbar />
        <Header />
        <ExampleIcons />
        <SupportedLibraries />
      </Stack>
      <Footer />
    </Stack>
  );
}
