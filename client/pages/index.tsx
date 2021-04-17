import Head from 'next/head';
import { md5 } from 'pure-md5';
import Lottie from 'react-lottie';
import { FaGithubAlt } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import { Fragment, useState, useEffect } from 'react';
import {
  Tag,
  Text,
  Input,
  Stack,
  Center,
  HStack,
  Tooltip,
  TagLabel,
  SlideFade,
  Link,
  TagRightIcon,
  useToast,
  Icon,
} from '@chakra-ui/react';

// components
import { ICONS_LOGOS } from 'components/icons';

// assets
import * as animationData from 'assets/loading.json';

// helpers
const createHash = (value: string): string => md5(value.replace(/\s/g, ''));

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// constants
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
};

export default function Home() {
  // chakra hooks
  const toast = useToast();

  // react hooks
  const [foundIcon, setFoundIcon] = useState(null);
  const [status, setStatus] = useState<'idle' | 'pending' | 'rejected'>('idle');

  // effects
  useEffect(() => {
    if (foundIcon?.success === false) {
      toast({ title: `We couldn't find your icon`, status: 'error' });
    }
  }, [foundIcon]);

  useEffect(() => {
    const isError = status === 'rejected';

    if (isError) {
      toast({ title: `Ups! Something happened, please try again`, status: 'error' });
    }
  }, [status]);

  // helpers
  async function fetchIcon(svg: string) {
    try {
      const hash = createHash(svg);

      setFoundIcon(null);
      setStatus('pending');

      const response = await fetch(`${API_URL}/icon`, { method: 'POST', body: JSON.stringify({ hash }) });
      const data = await response.json();

      await delay(800);
      setFoundIcon(data);
    } catch {
      setStatus('rejected');
    } finally {
      setStatus('idle');
    }
  }

  // handlers
  function onDrop(acceptedFiles) {
    const [file] = acceptedFiles;

    if (file.type !== 'image/svg+xml') {
      return toast({ title: `Only SVG files are supported`, status: 'error' });
    }

    const reader = new FileReader();

    reader.onabort = () => toast({ title: 'File reading was aborted', status: 'warning' });
    reader.onerror = () => toast({ title: 'File reading has failed', status: 'error' });
    reader.onload = () => fetchIcon(reader.result as string);

    reader.readAsText(file);
  }

  // dropzone hooks
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // constants
  const isLoading = status === 'pending';

  return (
    <Center
      as='main'
      height='100vh'
      flexDirection='column'
      bgGradient='linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)'
    >
      <Head>
        <title>Which Icon Is That</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Stack width={320}>
        <Center
          {...getRootProps()}
          p={4}
          mb={4}
          height={320}
          flexDirection='column'
          textAlign='center'
          cursor='pointer'
          background='rgba( 255, 255, 255, 0.25 )'
          boxShadow='md'
          style={{ backdropFilter: 'blur(6px)' }}
          borderRadius='2xl'
          willChange={'transform'}
          transition='all ease-in-out 400ms'
          transformOrigin='center center'
          position='relative'
          transform={isDragActive ? 'scale(1.025)' : 'none'}
          _hover={{ boxShadow: 'lg', transform: 'scale(1.025)' }}
          _focus={{ boxShadow: 'lg', transform: 'scale(1.025)', outline: 'none' }}
        >
          <Input {...getInputProps()} />

          {isLoading ? (
            <Fragment>
              <Text fontSize='sm'>Uploading and detecting your icon pack</Text>
              <Stack position='absolute' bottom={1.5} right={3} opacity={0.6}>
                <Lottie options={lottieOptions} height={24} width={24} isStopped={!isLoading} />
              </Stack>
            </Fragment>
          ) : (
            <Text fontSize='sm'>Click or drag your SVG to this area</Text>
          )}
        </Center>

        <SlideFade in={foundIcon?.success} offsetY='10px'>
          <HStack height={34}>
            <Tooltip label={foundIcon?.data?.svg?.fileName} aria-label={`${foundIcon?.data?.svg?.name} icon file name`}>
              <Link href={foundIcon?.data?.links?.icon} isExternal>
                <Tag size='lg' borderRadius='full' colorScheme='blackAlpha' fontSize='sm' maxWidth={122}>
                  <TagLabel mr={1.5}>{foundIcon?.data?.svg?.name}</TagLabel>
                  <TagRightIcon as={() => <div dangerouslySetInnerHTML={{ __html: foundIcon?.data?.svg?.svg }} />} />
                </Tag>
              </Link>
            </Tooltip>

            <Tooltip label='Icon pack' aria-label={`Icon pack`}>
              <Link href={foundIcon?.data?.links?.pack} isExternal>
                <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha'>
                  <TagLabel mr={1.5}>{foundIcon?.data?.svg?.pack}</TagLabel>
                  <TagRightIcon maxW={4} as={ICONS_LOGOS[foundIcon?.data?.svg?.pack]} />
                </Tag>
              </Link>
            </Tooltip>

            <Tooltip label='Source code' aria-label={`Source code`}>
              <Link href={foundIcon?.data?.links?.source} isExternal>
                <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha'>
                  <TagLabel mr={1.5}>{foundIcon?.data?.svg?.bytes}</TagLabel>
                  <TagRightIcon as={() => <Icon as={FaGithubAlt} w={5} h={5} />} />
                </Tag>
              </Link>
            </Tooltip>
          </HStack>
        </SlideFade>
      </Stack>
    </Center>
  );
}
