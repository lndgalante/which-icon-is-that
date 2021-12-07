import { NextSeo } from "next-seo";
import { AppProps } from "next/app";
import PlausibleProvider from "next-plausible";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

// components
import { Fonts } from "@modules/common/components/Fonts";
import { MainLayout } from "@modules/common/components/MainLayout";
import { MotionFade } from "@modules/common/components/MotionFade";

// hooks
import { useHotjar } from "@modules/common/hooks/useHotjar";

// theme
import { theme } from "@modules/common/theme";

// constants
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps, router }: AppProps) {
  // custom hooks
  useHotjar();

  return (
    <PlausibleProvider domain="whichiconisthat.com">
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <NextSeo
            title="Which Icon Is That?"
            description="The missing tool to work with icons for developers and designers"
            twitter={{ handle: "@whichiconisthat", site: "@whichiconisthat", cardType: "/images/dps.png" }}
          />
          <Fonts />
          <MainLayout>
            <MotionFade as="main" key={router.route} withPadding>
              <Component {...pageProps} />
            </MotionFade>
          </MainLayout>
        </ChakraProvider>
      </QueryClientProvider>
    </PlausibleProvider>
  );
}
