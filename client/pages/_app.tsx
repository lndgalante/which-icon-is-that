import { NextSeo } from "next-seo";
import { AppProps } from "next/app";
import { motion } from "framer-motion";
import PlausibleProvider from "next-plausible";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

// theme
import { theme } from "@modules/common/theme";

// constants
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <PlausibleProvider domain="whichiconisthat.com">
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <NextSeo
            description="Find your icon name and pack easily from your SVG"
            title="Which Icon Is That?"
            twitter={{
              handle: "@whichiconisthat",
              site: "@whichiconisthat",
              cardType: "/dps.png",
            }}
          />
          <motion.div
            key={router.route}
            animate="animate"
            initial="initial"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1 },
            }}
          >
            <Component {...pageProps} />
          </motion.div>
        </ChakraProvider>
      </QueryClientProvider>
    </PlausibleProvider>
  );
}
