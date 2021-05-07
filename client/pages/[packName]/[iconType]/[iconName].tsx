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
  Select,
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

import PrismTheme from 'prism-react-renderer/themes/dracula';
import Highlight, { defaultProps } from 'prism-react-renderer';

import { FaGithubAlt } from 'react-icons/fa';
import { RiBrush2Fill, RiBrush2Line } from 'react-icons/ri';
import { FiClipboard, FiSearch, FiFigma } from 'react-icons/fi';

// lib
import { api } from 'lib/api';
import { FoundIcon } from 'lib/types';
import { getReactIcon, getReactIconsImport } from 'lib/react-icons';
import { createHtmlMarkup, createReactComponent, createReactComponentName, createVueTemplate } from 'lib/snippets';

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
  const { svg, links, snippets } = props;

  // react hooks
  const [selectedIconLibrary, setSelectedIconLibrary] = useState('react-icons');

  // chakra hooks
  const toast = useToast();
  const { onCopy: onCopyHtmlMarkup } = useClipboard(snippets.html);
  const { onCopy: onCopyReactComponent } = useClipboard(snippets.react);
  const { onCopy: onCopyReactIconsImport } = useClipboard(snippets.reactIconsImport);

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
    onCopyReactIconsImport();
    toast({ status: 'success', description: `Icon import copied to your clipboard` });
  }

  return (
    <Main>
      <HStack mb={4} variants={container} initial='hidden' animate='show'>
        <Tooltip label={svg?.iconFileName} aria-label={`${svg?.iconName} icon file name`}>
          <Link href={links?.icon} isExternal>
            <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
              <TagLabel mr={1.5}>{svg?.iconName}</TagLabel>
              <TagRightIcon
                as={() => <div style={{ minWidth: '20px' }} dangerouslySetInnerHTML={{ __html: svg?.svg }} />}
              />
            </Tag>
          </Link>
        </Tooltip>

        <Tooltip label='Icon pack' aria-label='Icon pack'>
          <Link href={links?.pack} isExternal>
            <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
              <TagLabel mr={1.5}>{svg?.packName}</TagLabel>
              <TagRightIcon maxW={4} as={ICONS_LOGOS[svg?.packName]} />
            </Tag>
          </Link>
        </Tooltip>

        <Tooltip label='Icon type' aria-label='Icon type'>
          <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
            <TagLabel mr={1.5}>{svg?.iconType}</TagLabel>
            <TagRightIcon
              as={() => <Icon as={svg?.iconType === 'solid' ? RiBrush2Fill : RiBrush2Line} w={5} h={5} />}
            />
          </Tag>
        </Tooltip>

        <Tooltip label='Figma file' aria-label='Figma file'>
          <Link href={links?.figma} isExternal>
            <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
              <TagLabel mr={1.5}>Figma</TagLabel>
              <TagRightIcon as={() => <Icon as={FiFigma} w={5} h={5} />} />
            </Tag>
          </Link>
        </Tooltip>

        <Tooltip label='Source code' aria-label='Source code'>
          <Link href={links?.source} isExternal>
            <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
              <TagLabel mr={1.5}>{svg?.bytes}</TagLabel>
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
              <Highlight {...defaultProps} theme={PrismTheme} code={snippets.reactIconsImport} language='jsx'>
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
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Text fontWeight='medium' mb={2}>
                    Optimized SVG for your HTML
                  </Text>
                  <Highlight {...defaultProps} code={snippets.html} theme={PrismTheme} language='markup'>
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
                  <Highlight {...defaultProps} code={snippets.react} theme={PrismTheme} language='jsx'>
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
                    Optimized SVG template for Vue
                  </Text>
                  <Highlight {...defaultProps} code={snippets.vue} theme={PrismTheme} language='jsx'>
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
              </TabPanels>
            </Tabs>
          </Stack>
        </HStack>
      </Slide>
    </Main>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { packName, iconType, iconName } = params;
  const encodedPath = encodeURIComponent(`${packName}/${iconType}/${iconName}`);

  const { data: initialData } = await api.getHashFromPath(encodedPath);
  const { data }: FoundIcon = await api.getIconData(initialData.result);

  const componentName = createReactComponentName(data.svg.packName, data.svg.iconName);
  const html = await createHtmlMarkup(data.svg.svg);
  const vue = await createVueTemplate(data.svg.svg);
  const react = await createReactComponent(data.svg.svg, componentName);

  const reactIconName = getReactIcon(data?.svg?.iconName, data?.svg?.packName);
  const reactIconsImport = getReactIconsImport(reactIconName?.original, data?.svg?.packId);

  const snippets = { reactIconsImport, html, react, vue };

  return { props: { ...data, snippets }, revalidate: 86400 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data } = await api.getPaths();
    return { paths: data.paths, fallback: false };
  } catch (error) {
    console.log('Error on getStaticPaths', error);
  }
};
