import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import { Text, Input, Stack, Center, useToast } from '@chakra-ui/react';

// lib
import { createHash } from '@lib/hash';

// components
import { Main } from 'components/Main';

export default function Home() {
  // chakra hooks
  const toast = useToast();

  // next hooks
  const router = useRouter();

  // dropzone hooks
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // handlers
  function onDrop([file]) {
    if (file.type !== 'image/svg+xml') {
      return toast({ title: `Only SVG files are supported`, status: 'error' });
    }

    const reader = new FileReader();

    reader.onabort = () => toast({ title: 'File reading was aborted', status: 'warning' });
    reader.onerror = () => toast({ title: 'File reading has failed', status: 'error' });
    reader.onload = () => router.push(`/${createHash(reader.result as string)}`, undefined, { shallow: true });

    reader.readAsText(file);
  }

  return (
    <Main>
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
          {/* @ts-expect-error */}
          <Input {...getInputProps()} />

          <Text fontSize='sm'>Click or drag your SVG to this area</Text>
        </Center>
      </Stack>
    </Main>
  );
}
