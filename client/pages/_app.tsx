import Head from 'next/head';
import { AppProps } from 'next/app';
import { motion } from 'framer-motion';
import PlausibleProvider from 'next-plausible';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';


// constants
const queryClient = new QueryClient();

const meta = {
  image: '/dps.png',
  title: 'Which Icon Is That?!',
  description: 'Find your icon name and pack easily from your SVG',
};

const theme = extendTheme({
  colors: {
    brand: {
      black: '#000000',
      warmBlack: '#201D1D',
      text: '#A7A0A0',
      darkRed: '#813131',
      lightRed: '#C95454',
      orange: '#E95848',
      softOrange: '#F4D0C0',
      lightOrange: '#FFF4EF',
      grey: '#B5A7A7',
      softGrey: '#E8E8E8',
      lightGrey: '#FDFCFC',
      white: '#FFFFFF',
    },
  },
  components: {
    Button: {
      variants: {
        'brand.solid': {
          borderWidth: 1,
          borderRadius: 8,
          paddingX: '26px',
          paddingY: '25px',
          fontWeight: 'bold',
          borderColor: 'brand.warmBlack',
          color: 'brand.white',
          backgroundColor: 'brand.warmBlack',
          _hover: {
            color: 'brand.warmBlack',
            backgroundColor: 'transparent',
          },
        },
        'brand.outline': {
          color: 'brand.warmBlack',
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: 'brand.warmBlack',
        }
      },

    },
  },
});

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <PlausibleProvider domain='whichiconisthat.com'>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Head>
            <meta name='robots' content='follow, index' />
            <meta name='description' content={meta.description} />
            <meta property='og:site_name' content={meta.title} />
            <meta property='og:description' content={meta.description} />
            <meta property='og:title' content={meta.title} />
            <meta property='og:image' content={meta.image} />
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='@lndgalante' />
            <meta name='twitter:title' content={meta.title} />
            <meta name='twitter:description' content={meta.description} />
            <meta name='twitter:image' content={meta.image} />
            <title>{meta.title}</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <motion.div
            key={router.route}
            initial='initial'
            animate='animate'
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
