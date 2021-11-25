import { NextSeo } from "next-seo";
import { AppProps } from "next/app";
import PlausibleProvider from "next-plausible";
import { Stack, ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

// components
import { Fonts } from "@modules/common/components/Fonts";
import { Navbar } from "@modules/common/components/Navbar";
import { Footer } from "@modules/common/components/Footer";
import { MotionFade } from "@modules/common/components/MotionFade";

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
            additionalMetaTags={[
              {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
              },
            ]}
            description="The missing tool to work with icons for developers and designers"
            twitter={{ handle: "@whichiconisthat", site: "@whichiconisthat", cardType: "/images/dps.png" }}
          />
          <Fonts />
          <Layout>
            <MotionFade as="main" key={router.route} withPadding>
              <Component {...pageProps} />
            </MotionFade>
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </PlausibleProvider>
  );
}
