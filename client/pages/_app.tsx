import { NextSeo } from "next-seo";
import { AppProps } from "next/app";
import { motion, isValidMotionProp } from "framer-motion";
import { QueryClient, QueryClientProvider } from "react-query";
import { Stack, forwardRef, ChakraProvider } from "@chakra-ui/react";

// components
import { Fonts } from '@modules/common/components/Fonts';
import { Navbar } from "@modules/common/components/Navbar";
import { Footer } from "@modules/common/components/Footer";

// theme
import { theme } from "@modules/common/theme";

// constants
const queryClient = new QueryClient();

const MotionStack = motion(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(Object.entries(props).filter(([key]) => !isValidMotionProp(key)));
    return <Stack ref={ref} {...chakraProps} />;
  }),
);

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
  );
}
