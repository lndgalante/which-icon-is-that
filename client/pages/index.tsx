import isUrl from 'is-url';
import isSvg from 'is-svg';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import {
  Text,
  Input,
  Stack,
  Button,
  HStack,
  Center,
  Spinner,
  Textarea,
  FormLabel,
  InputGroup,
  FormControl,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';

// lib
import { api } from '@lib/api';
import { createHash } from '@lib/hash';
import { getInnerHTMLFromSvgText } from '@lib/dom';

// components
import { Main } from '@components/Main';
import { RadioGroup } from '@components/RadioGroup';

// constants
const SVG_PLACEHOLDER = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
  <path
    d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
</svg>`;

type InputTypes = 'File' | 'URL' | 'Text';

const INPUT_TYPES: InputTypes[] = ['File', 'URL', 'Text'];

export default function Home() {
  // react hooks
  const [hash, setHash] = useState('');
  const [svgUrl, setSvgUrl] = useState('');
  const [svgCode, setSvgCode] = useState('');
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadingFile, setIsDownloadingFile] = useState(false);
  const [inputType, setInputType] = useState<InputTypes>(INPUT_TYPES[0]);

  // chakra hooks
  const toast = useToast();

  // next hooks
  const router = useRouter();

  // dropzone hooks
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

  // helpers
  async function moveToHashPage(hash: string) {
    try {
      setIsLoading(true);
      const { data, success } = await api.getPathFromHash(hash);

      if (!success) {
        return toast({ title: 'Icon not found on our database', status: 'error' });
      }

      await api.putIconIncrement(hash);
      router.push(`/${decodeURIComponent(data.result)}`, undefined, { shallow: true });
    } catch (error) {
      console.log('Error on moveToHashPage', error);
    } finally {
      setIsLoading(false);
    }
  }

  // handlers
  function handleInputTypeChange(value: string) {
    setInputType(value as InputTypes);
  }

  function handleUrlChange({ target }) {
    setSvgUrl(target.value);
  }

  function handleCodeChange({ target }) {
    setSvgCode(target.value);
  }

  function handleDrop([file]) {
    const { name, type } = file;

    if (type !== 'image/svg+xml') {
      return toast({ title: `Only SVG files are supported`, status: 'error' });
    }

    setFileName(name);

    const reader = new FileReader();

    reader.onabort = () => toast({ title: 'File reading was aborted', status: 'error' });
    reader.onerror = () => toast({ title: 'File reading has failed', status: 'error' });
    reader.onload = () => {
      const svgInnerHtml = getInnerHTMLFromSvgText(reader.result as string);
      const hash = createHash(svgInnerHtml);
      setHash(hash);
    };

    reader.readAsText(file);
  }

  // helpers
  async function searchIconByUrlInput() {
    if (!svgUrl) {
      return toast({ title: 'Insert a URL first', status: 'error' });
    }

    const isValidUrl = isUrl(svgUrl);
    const isSvgUrl = svgUrl.endsWith('.svg');

    if (!isValidUrl) {
      return toast({ title: 'Inserted URL is not valid', status: 'error' });
    }

    if (!isSvgUrl) {
      return toast({ title: 'Inserted URL should contain an SVG', status: 'error' });
    }

    try {
      setIsDownloadingFile(true);

      const svg = await fetch(svgUrl).then((response) => response.text());
      const svgInnerHtml = getInnerHTMLFromSvgText(svg);

      moveToHashPage(createHash(svgInnerHtml));
    } catch (error) {
      console.log('Error on searchIconByUrlInput', error);
    } finally {
      setIsDownloadingFile(false);
    }
  }

  function searchIconByCodeInput() {
    if (!isSvg(svgCode)) {
      return toast({ title: 'HTML inserted is not an SVG', status: 'error' });
    }

    const svgInnerHtml = getInnerHTMLFromSvgText(svgCode);
    moveToHashPage(createHash(svgInnerHtml));
  }

  function searchIconByFileInput() {
    if (!hash) {
      return toast({ title: `Insert a file first`, status: 'warning' });
    }

    moveToHashPage(hash);
  }

  function getFindIconFunction() {
    const inputFunctions = {
      ['URL']: searchIconByUrlInput,
      ['File']: searchIconByFileInput,
      ['Text']: searchIconByCodeInput,
    };
    const inputFunction = inputFunctions[inputType];

    return inputFunction;
  }

  // constants
  const isUrlSelected = inputType === 'URL';
  const isFileSelected = inputType === 'File';
  const isTextSelected = inputType === 'Text';

  const handleFindIconButton = getFindIconFunction();
  const isFindIconButtonEnabled = hash || svgUrl || svgCode;

  return (
    <Main>
      <Stack width='full' maxWidth={640} height={460} spacing={3}>
        <HStack justifyContent='space-between' alignItems='flex-end'>
          <FormControl>
            <FormLabel color='gray.800'>Select your input type</FormLabel>
            <RadioGroup name='Input type' options={INPUT_TYPES} onChange={handleInputTypeChange} />
          </FormControl>

          <Button
            isLoading={isLoading}
            colorScheme='blackAlpha'
            onClick={handleFindIconButton}
            isDisabled={!isFindIconButtonEnabled}
          >
            {isLoading ? 'Finding Icon...' : 'Find Icon!'}
          </Button>
        </HStack>

        <Stack>
          {isFileSelected && (
            <FormControl>
              <FormLabel color='gray.800'>Insert your SVG file</FormLabel>
              <Center
                {...getRootProps()}
                p={4}
                mb={4}
                minHeight={380}
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
                <Text fontSize='sm'>{fileName ? fileName : 'Click or drag your SVG file'}</Text>
              </Center>
            </FormControl>
          )}

          {isUrlSelected && (
            <FormControl>
              <FormLabel color='gray.800'>Insert your SVG url</FormLabel>
              <InputGroup size='md'>
                <Input
                  focusBorderColor='gray.600'
                  bg='white'
                  type='text'
                  borderRadius='2xl'
                  placeholder='https://icons.getbootstrap.com/assets/icons/archive.svg'
                  onChange={handleUrlChange}
                  value={svgUrl}
                />
                <InputRightElement>
                  {isDownloadingFile && <Spinner size='xs' colorScheme='blackAlpha' />}
                </InputRightElement>
              </InputGroup>
            </FormControl>
          )}

          {isTextSelected && (
            <FormControl>
              <FormLabel color='gray.800'>Insert your SVG code</FormLabel>
              <Textarea
                resize='none'
                background='rgba( 255, 255, 255, 0.25 )'
                boxShadow='md'
                style={{ backdropFilter: 'blur(6px)' }}
                borderRadius='2xl'
                minHeight={380}
                fontSize='sm'
                focusBorderColor='blackAlpha.600'
                value={svgCode}
                placeholder={SVG_PLACEHOLDER}
                onChange={handleCodeChange}
                _placeholder={{ color: 'blackAlpha.600' }}
              />
            </FormControl>
          )}
        </Stack>
      </Stack>
    </Main>
  );
}
