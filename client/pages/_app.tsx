import { NextSeo } from "next-seo";
import { AppProps } from "next/app";
import PlausibleProvider from "next-plausible";
import { Stack, ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

// components
import { Fonts } from "@modules/common/components/Fonts";
import { Navbar } from "@modules/common/components/Navbar";
import { Footer } from "@modules/common/components/Footer";
import { MotionStack } from "@modules/common/components/MotionStack";

// theme
import { theme } from "@modules/common/theme";

// constants
const queryClient = new QueryClient();

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <Stack backgroundColor="brand.white" spacing={0}>
      <Navbar />
      {children}
      <Footer />
    </Stack>
  );
}

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <PlausibleProvider domain="whichiconisthat.com">
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <NextSeo
            title="Which Icon Is That?"
            description="Find your icon name and pack easily from your SVG"
            twitter={{ handle: "@whichiconisthat", site: "@whichiconisthat", cardType: "/images/dps.png" }}
          />
          <Fonts />
          <Layout>
            <MotionStack
              as="main"
              animate="animate"
              initial="initial"
              key={router.route}
              paddingX={{ base: 4, md: 12 }}
              variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
            >
              <Component {...pageProps} />
            </MotionStack>
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </PlausibleProvider>
  );
}
