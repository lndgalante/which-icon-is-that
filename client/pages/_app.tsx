import Head from 'next/head';
import { AppProps } from 'next/app';
import PlausibleProvider from 'next-plausible';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

// constants
const queryClient = new QueryClient();

const meta = {
  image: '/dps.png',
  title: 'Which Icon Is That?!',
  description: 'Find your icon name and pack easily from your SVG',
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain='whichiconisthat.com'>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
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
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </PlausibleProvider>
  );
}
