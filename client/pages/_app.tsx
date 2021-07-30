import { NextSeo } from "next-seo";
import { AppProps } from "next/app";
import { motion } from "framer-motion";
import { Stack, ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

// components
import { Navbar } from "@modules/common/components/Navbar";
import { Footer } from "@modules/common/components/Footer";

// theme
import { theme } from "@modules/common/theme";

// constants
const queryClient = new QueryClient();

function Layout({ children }) {
  return (
    <Stack backgroundColor="brand.white">
      <Stack as="main" paddingX={{ base: 0, md: 12 }}>
        <Navbar />
        {children}
      </Stack>
      <Footer />
    </Stack>
  );
}

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <NextSeo
          description="Find your icon name and pack easily from your SVG"
          title="Which Icon Is That?"
          twitter={{ handle: "@whichiconisthat", site: "@whichiconisthat", cardType: "/dps.png" }}
        />
        <Layout>
          <motion.div
            key={router.route}
            animate="animate"
            initial="initial"
            variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
          >
            <Component {...pageProps} />
          </motion.div>
        </Layout>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
