import { Stack } from "@chakra-ui/react";

// components
import { Navbar } from "@modules/common/components/Navbar";
import { Footer } from "@modules/common/components/Footer";

type Props = {
  children: React.ReactNode;
};

export function MainLayout({ children }: Props) {
  return (
    <Stack backgroundColor="brand.white" spacing={0}>
      <Navbar />
      {children}
      <Footer />
    </Stack>
  );
}
