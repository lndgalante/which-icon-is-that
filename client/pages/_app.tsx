import Head from 'next/head';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>Which Icon Is That</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Component {...pageProps} />
    </ChakraProvider>
  );
}
