import postgres from 'postgres';
import { useState } from 'react';
import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next';
import {
  Tag,
  Icon,
  Text,
  Link,
  Slide,
  Stack,
  HStack,
  VStack,
  Select,
  Button,
  Tooltip,
  TagLabel,
  IconButton,
  TagRightIcon,
  useClipboard,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import svgr from '@svgr/core';
import { capitalCase } from 'change-case';

import PrismTheme from 'prism-react-renderer/themes/dracula';
import Highlight, { defaultProps } from 'prism-react-renderer';

import { FaGithubAlt } from 'react-icons/fa';
import { RiBrush2Fill, RiBrush2Line } from 'react-icons/ri';
import { FiClipboard, FiSearch, FiFigma } from 'react-icons/fi';

// lib
import { api } from 'lib/api';
import { FoundIcon, Hash } from 'lib/types';
import { getReactIcon, generateReactIconsCodeSnippet } from 'lib/react-icons';

// components
import { Main } from 'components/Main';
import { ICONS_LOGOS } from 'components/icons';
import { NextChakraLink } from 'components/NextChakraLink';

// constants
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.5 } },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function IconPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  // constants
  const data = props?.data;
  const success = props?.success;
  const components = props?.components;

  const reactIconName = data ? getReactIcon(data?.svg?.iconName, data?.svg?.packName) : '';
  const reactIconsImport = reactIconName
    ? generateReactIconsCodeSnippet(reactIconName?.original, data?.svg?.packId)
    : '// Import not found';

  // react hooks
  const [selectedIconLibrary, setSelectedIconLibrary] = useState('react-icons');

  // chakra hooks
  const toast = useToast();
  const { onCopy: onCopyCodeSnippet } = useClipboard(reactIconsImport);
  const { onCopy: onCopyHtmlMarkup } = useClipboard(components.html);
  const { onCopy: onCopyReactComponent } = useClipboard(components.react);

  // handlers
  function handleIconLibraryChange({ target }) {
    setSelectedIconLibrary(target.value);
  }

  function handleCopyHtmlCode() {
    onCopyHtmlMarkup();
    toast({ status: 'success', description: `Icon markup copied to your clipboard` });
  }

  function handleCopyReactCode() {
    onCopyReactComponent();
    toast({ status: 'success', description: `Icon react component copied to your clipboard` });
  }

  function handleCopyImport() {
    onCopyCodeSnippet();
    toast({ status: 'success', description: `Icon import copied to your clipboard` });
  }

  return (
    <Main>
      {success === true && (
        <HStack mb={4} variants={container} initial='hidden' animate='show'>
          <Tooltip label={data?.svg?.iconFileName} aria-label={`${data?.svg?.iconName} icon file name`}>
            <Link href={data?.links?.icon} isExternal>
              <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
                <TagLabel mr={1.5}>{data?.svg?.iconName}</TagLabel>
                <TagRightIcon
                  as={() => <div style={{ minWidth: '20px' }} dangerouslySetInnerHTML={{ __html: data?.svg?.svg }} />}
                />
              </Tag>
            </Link>
          </Tooltip>

          <Tooltip label='Icon pack' aria-label='Icon pack'>
            <Link href={data?.links?.pack} isExternal>
              <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
                <TagLabel mr={1.5}>{data?.svg?.packName}</TagLabel>
                <TagRightIcon maxW={4} as={ICONS_LOGOS[data?.svg?.packName]} />
              </Tag>
            </Link>
          </Tooltip>

          <Tooltip label='Icon type' aria-label='Icon type'>
            <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
              <TagLabel mr={1.5}>{data?.svg?.type}</TagLabel>
              <TagRightIcon
                as={() => <Icon as={data?.svg?.type === 'solid' ? RiBrush2Fill : RiBrush2Line} w={5} h={5} />}
              />
            </Tag>
          </Tooltip>

          <Tooltip label='Figma file' aria-label='Figma file'>
            <Link href={data?.links?.figma} isExternal>
              <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
                <TagLabel mr={1.5}>Figma</TagLabel>
                <TagRightIcon as={() => <Icon as={FiFigma} w={5} h={5} />} />
              </Tag>
            </Link>
          </Tooltip>

          <Tooltip label='Source code' aria-label='Source code'>
            <Link href={data?.links?.source} isExternal>
              <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
                <TagLabel mr={1.5}>{data?.svg?.bytes}</TagLabel>
                <TagRightIcon as={() => <Icon as={FaGithubAlt} w={5} h={5} />} />
              </Tag>
            </Link>
          </Tooltip>

          <NextChakraLink href='/'>
            <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
              <TagLabel mr={1.5}>Find another icon</TagLabel>
              <TagRightIcon as={() => <Icon as={FiSearch} w={5} h={5} />} />
            </Tag>
          </NextChakraLink>
        </HStack>
      )}

      {success === false && (
        <VStack>
          <Text mb={2} fontSize='lg'>
            Sorry, we couldn't find your icon 😢
          </Text>
          <Button
            aria-label='Find another icon'
            variant='outline'
            size='md'
            colorScheme='blackAlpha'
            rightIcon={<FiSearch />}
          >
            <NextChakraLink href='/'>Find another icon</NextChakraLink>
          </Button>
        </VStack>
      )}

      {success === true && (
        <Slide direction='bottom' in style={{ zIndex: 10 }}>
          <HStack
            alignItems='flex-start'
            flex-direction='row'
            px={6}
            pt={4}
            pb={12}
            color='white'
            background='blackAlpha.900'
            position='relative'
            spacing={12}
          >
            <Stack>
              <Stack>
                <Text fontWeight='medium'>Pick your icon library</Text>
                <Select size='md' value={selectedIconLibrary} onChange={handleIconLibraryChange}>
                  <option value='react-icons'>react-icons</option>
                </Select>
              </Stack>

              <Stack>
                <Text fontWeight='medium'>Code snippet</Text>
                <Highlight {...defaultProps} theme={PrismTheme} code={reactIconsImport} language='jsx'>
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <HStack
                      as='pre'
                      spacing={4}
                      className={`${className} code`}
                      style={{ ...style, padding: '4px 16px', borderRadius: '6px' }}
                    >
                      {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} />
                          ))}
                        </div>
                      ))}

                      <IconButton
                        onClick={handleCopyImport}
                        size='md'
                        variant='ghost'
                        colorScheme='whiteAlpha'
                        aria-label='Copy to clipboard'
                        className='prism-code--copy'
                        icon={<FiClipboard />}
                      />
                    </HStack>
                  )}
                </Highlight>
              </Stack>
            </Stack>

            <Stack>
              <Tabs>
                <TabList>
                  <Tab>HTML</Tab>
                  <Tab>React</Tab>
                  <Tab>Vue</Tab>
                  <Tab>Angular</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Text fontWeight='medium' mb={2}>
                      Optimized SVG for your HTML
                    </Text>
                    <Highlight {...defaultProps} code={components.html} theme={PrismTheme} language='markup'>
                      {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre
                          className={className}
                          style={{
                            ...style,
                            maxHeight: '240px',
                            overflow: 'auto',
                            padding: '4px 16px',
                            borderRadius: '6px',
                            position: 'relative',
                          }}
                        >
                          {tokens.map((line, i) => (
                            <div {...getLineProps({ line, key: i })}>
                              {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                              ))}
                            </div>
                          ))}
                          <IconButton
                            onClick={handleCopyHtmlCode}
                            size='md'
                            variant='ghost'
                            colorScheme='whiteAlpha'
                            aria-label='Copy to clipboard'
                            className='prism-code--copy'
                            position='absolute'
                            top={4}
                            right={4}
                            icon={<FiClipboard />}
                          />
                        </pre>
                      )}
                    </Highlight>
                  </TabPanel>
                  <TabPanel>
                    <Text fontWeight='medium' mb={2}>
                      Optimized SVG component for React
                    </Text>
                    <Highlight {...defaultProps} code={components.react} theme={PrismTheme} language='jsx'>
                      {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre
                          className={className}
                          style={{
                            ...style,
                            maxHeight: '240px',
                            overflow: 'auto',
                            padding: '4px 16px',
                            borderRadius: '6px',
                            position: 'relative',
                          }}
                        >
                          {tokens.map((line, i) => (
                            <div {...getLineProps({ line, key: i })}>
                              {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                              ))}
                            </div>
                          ))}
                          <IconButton
                            onClick={handleCopyReactCode}
                            size='md'
                            variant='ghost'
                            colorScheme='whiteAlpha'
                            aria-label='Copy to clipboard'
                            className='prism-code--copy'
                            position='absolute'
                            top={4}
                            right={4}
                            icon={<FiClipboard />}
                          />
                        </pre>
                      )}
                    </Highlight>
                  </TabPanel>
                  <TabPanel>
                    <Text fontWeight='medium' mb={2}>
                      Optimized SVG template for Vue (WIP)
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Text fontWeight='medium' mb={2}>
                      Optimized SVG component for Angular (WIP)
                    </Text>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </HStack>
        </Slide>
      )}
    </Main>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { hash } = params;
  const foundIcon: FoundIcon = await api.getIconData(hash as string);

  const react = await svgr(
    foundIcon.data.svg.svg,
    { icon: true, plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'] },
    { componentName: capitalCase(`${foundIcon.data.svg.packName} ${foundIcon.data.svg.iconName}`).split(' ').join('') },
  );

  const html = await svgr(
    foundIcon.data.svg.svg,
    { icon: true, plugins: ['@svgr/plugin-svgo', '@svgr/plugin-prettier'] },
    { componentName: capitalCase(`${foundIcon.data.svg.packName} ${foundIcon.data.svg.iconName}`).split(' ').join('') },
  );

  const components = { html, react };

  return { props: { ...foundIcon, components }, revalidate: 86400 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const sql = postgres({
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      hostname: process.env.POSTGRES_HOSTNAME,
      database: process.env.POSTGRES_DATABASE,
    });

    const hashes: Hash[] = await sql`select hash from icons`;
    const paths = hashes.map(({ hash }) => ({ params: { hash } }));

    return { paths, fallback: false };
  } catch (error) {
    console.log('Error on getStaticPaths', error);
  }
};
