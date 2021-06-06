import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  Tag,
  Icon,
  Text,
  Link,
  Slide,
  Stack,
  HStack,
  Tooltip,
  TagLabel,
  useToast,
  TagRightIcon,
  useClipboard,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';

import { FaGithubAlt } from 'react-icons/fa';
import { RiBrush2Fill, RiBrush2Line } from 'react-icons/ri';
import { FiSearch, FiFigma, FiCheckCircle } from 'react-icons/fi';

// lib
import { api } from 'lib/api';
import { IconResponse, IconMetadata, Svg } from 'lib/types';

// hooks
import { useReadFoundTimes } from 'hooks/useReadFoundTimes';

// components
import { Main } from 'components/Main';
import { ICONS_LOGOS } from 'components/icons';
import { LanguageTab } from 'components/LanguageTab';
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

// types

type Props = IconMetadata;

type Params = Pick<Svg, 'packName' | 'iconType' | 'iconName'>;

// next lifecycle hooks
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data } = await api.getPaths();
    return { paths: data.paths, fallback: false };
  } catch (error) {
    console.log('Error on getStaticPaths', error);
  }
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  try {
    const { packName, iconType, iconName } = params;
    const encodedPath = encodeURIComponent(`/${packName}/${iconType}/${iconName}`);

    const { data: initialData } = await api.getHashFromPath(encodedPath);
    const iconHash = initialData.result;

    const { data: tags } = await api.getIconTags(iconHash);
    const { data: snippets } = await api.getIconSnippets(iconHash);
    const { data: icon }: IconResponse = await api.getIcon(iconHash);

    const relatedIcons = []
    try {

      for await (const tag of tags.tags) {

        const { data: similarIcons } = await api.getSimilarIcons(iconHash, tag.tag_id);
        relatedIcons.push(...similarIcons.icons)
      }
    } catch (error) {
      console.log('\n ~ constgetStaticProps:GetStaticProps<Props,Params>= ~ error', error)

    }

    const parsedRelatedIcons = relatedIcons.map(({ pack_id, pack_name, icon_name, icon_type, icon_file_name, ...otherKeys }) => ({
      packId: pack_id,
      packName: pack_name,
      iconName: icon_name,
      iconType: icon_type,
      iconFileName: icon_file_name,
      ...otherKeys
    }))

    return { props: { ...icon, ...snippets, ...tags, relatedIcons: parsedRelatedIcons }, revalidate: 86400 };
  } catch (err) {
    console.log('Error on getStaticProps', err);
  }
};

export default function IconPage({ svg, links, snippets, tags, relatedIcons }: IconMetadata) {
  // react hooks
  const [selectedUse, setSelectedUse] = useState('optimizedSvg');
  const [selectedLanguage, setSelectedLanguage] = useState('html');

  // query hooks
  const { data, isLoading } = useReadFoundTimes(svg.hash);

  // chakra hooks
  const toast = useToast();
  const { onCopy: onCopyInstall } = useClipboard(snippets[selectedLanguage].install);
  const { onCopy: onCopySetup } = useClipboard(snippets[selectedLanguage].setup);
  const { onCopy: onCopyImport } = useClipboard(snippets[selectedLanguage].import);
  const { onCopy: onCopyUsage } = useClipboard(snippets[selectedLanguage].usage);

  // constants
  const languages = Object.keys(snippets);
  const currentSnippet = snippets[selectedLanguage][selectedUse];

  // handlers
  function handleTabChange(index: number) {
    const newLanguage = languages[index];
    const [use] = Object.keys(snippets[newLanguage]);

    setSelectedLanguage(newLanguage);
    setSelectedUse(use);
  }

  function handleChangeSelectedUse({ target }) {
    setSelectedUse(target.value);
  }

  function handleCopyInstall() {
    onCopyInstall();
    toast({ status: 'success', description: `Icon install copied to your clipboard` });
  }

  function handleCopySetup() {
    onCopySetup();
    toast({ status: 'success', description: `Icon setup copied to your clipboard` });
  }

  function handleCopyImport() {
    onCopyImport();
    toast({ status: 'success', description: `Icon import copied to your clipboard` });
  }

  function handleCopyUsage() {
    onCopyUsage();
    toast({ status: 'success', description: `Icon usage copied to your clipboard` });
  }

  return (
    <Main>
      <HStack mb={4} variants={container} initial='hidden' animate='show'>
        <Tooltip label={svg.iconFileName} aria-label={`${svg.iconName} icon file name`}>
          <Link href={links.icon} isExternal>
            <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
              <TagLabel mr={1.5}>{svg.iconName}</TagLabel>
              <TagRightIcon
                as={() => <div style={{ minWidth: '20px' }} dangerouslySetInnerHTML={{ __html: svg.svg }} />}
              />
            </Tag>
          </Link>
        </Tooltip>

        <Tooltip label='Icon pack' aria-label='Icon pack'>
          <Link href={links.pack} isExternal>
            <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
              <TagLabel mr={1.5}>{svg.packName}</TagLabel>
              <TagRightIcon maxW={4} as={ICONS_LOGOS[svg.packName]} />
            </Tag>
          </Link>
        </Tooltip>

        <Tooltip label='Icon type' aria-label='Icon type'>
          <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
            <TagLabel mr={1.5}>{svg.iconType}</TagLabel>
            <TagRightIcon as={() => <Icon as={svg.iconType === 'solid' ? RiBrush2Fill : RiBrush2Line} w={5} h={5} />} />
          </Tag>
        </Tooltip>

        <Tooltip label='Figma file' aria-label='Figma file'>
          <Link href={links.figma} isExternal>
            <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
              <TagLabel mr={1.5}>Figma</TagLabel>
              <TagRightIcon as={() => <Icon as={FiFigma} w={5} h={5} />} />
            </Tag>
          </Link>
        </Tooltip>

        <Tooltip label='Source code' aria-label='Source code'>
          <Link href={links.source} isExternal>
            <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
              <TagLabel mr={1.5}>{svg.bytes}</TagLabel>
              <TagRightIcon as={() => <Icon as={FaGithubAlt} w={5} h={5} />} />
            </Tag>
          </Link>
        </Tooltip>

        <Tooltip label='Found times' aria-label='Found times'>
          <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
            <TagLabel mr={1.5}>
              {isLoading ? 'Loading...' : `Found ${data.data.found} time${data.data.found > 1 ? 's' : ''}`}
            </TagLabel>
            <TagRightIcon as={() => <Icon as={FiCheckCircle} w={5} h={5} />} />
          </Tag>
        </Tooltip>

        <NextChakraLink href='/'>
          <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
            <TagLabel mr={1.5}>Find another icon</TagLabel>
            <TagRightIcon as={() => <Icon as={FiSearch} w={5} h={5} />} />
          </Tag>
        </NextChakraLink>
      </HStack>

      <HStack mb={4} variants={container} initial='hidden' animate='show'>
        <Text fontWeight={600}>Tags</Text>
        <HStack spacing={2}>
          {tags?.map(tag => (<Tag key={tag.tag_id} size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
            <TagLabel mr={1.5}>{tag.name}</TagLabel>

          </Tag>))}
        </HStack>
      </HStack>

      <HStack mb={4} variants={container} initial='hidden' animate='show'>
        <Text fontWeight={600}>Related icons</Text>
        <HStack spacing={2}>
          {relatedIcons.map(relatedIcon => (<Tag key={relatedIcon.hash} size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
            <TagLabel mr={1.5}>{relatedIcon.iconName}</TagLabel>
            <TagRightIcon
              as={() => <div style={{ minWidth: '20px' }} dangerouslySetInnerHTML={{ __html: relatedIcon.svg }} />}
            />
          </Tag>))}
        </HStack>
      </HStack>


      <Slide direction='bottom' in={true} style={{ zIndex: 10 }}>
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
          <Stack flex={1}>
            <Tabs onChange={handleTabChange}>
              <TabList>
                <Tab>HTML</Tab>
                <Tab>React</Tab>
                <Tab>Vue</Tab>
                <Tab>React Native</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <LanguageTab
                    currentSnippet={currentSnippet}
                    usesOptions={[
                      { label: 'Optimized SVG', value: 'optimizedSvg' },
                      { label: 'Font (CDN)', value: 'font' },
                    ]}
                    selectedUse={selectedUse}
                    selectedLanguage={selectedLanguage}
                    handleChangeSelectedUse={handleChangeSelectedUse}
                    handleCopyInstall={handleCopyInstall}
                    handleCopyImport={handleCopyImport}
                    handleCopySetup={handleCopySetup}
                    handleCopyUsage={handleCopyUsage}
                  />
                </TabPanel>
                <TabPanel>
                  <LanguageTab
                    currentSnippet={currentSnippet}
                    usesOptions={[
                      { label: 'React Component (JavaScript)', value: 'react-component-js' },
                      { label: 'React Component (TypeScript)', value: 'react-component-ts' },
                      { label: 'React-icons', value: 'react-icons' },
                      { label: 'React-feather', value: 'react-feather' },
                      { label: 'Chakra UI', value: 'chakra-ui' },
                    ]}
                    selectedUse={selectedUse}
                    selectedLanguage={selectedLanguage}
                    handleChangeSelectedUse={handleChangeSelectedUse}
                    handleCopyInstall={handleCopyInstall}
                    handleCopyImport={handleCopyImport}
                    handleCopySetup={handleCopySetup}
                    handleCopyUsage={handleCopyUsage}
                  />
                </TabPanel>
                <TabPanel>
                  <LanguageTab
                    currentSnippet={currentSnippet}
                    usesOptions={[
                      { label: 'Vue Template', value: 'vue-template' },
                      { label: 'Vue-feather', value: 'vue-feather' },
                    ]}
                    selectedUse={selectedUse}
                    selectedLanguage={selectedLanguage}
                    handleChangeSelectedUse={handleChangeSelectedUse}
                    handleCopyInstall={handleCopyInstall}
                    handleCopyImport={handleCopyImport}
                    handleCopySetup={handleCopySetup}
                    handleCopyUsage={handleCopyUsage}
                  />
                </TabPanel>
                <TabPanel>
                  <LanguageTab
                    currentSnippet={currentSnippet}
                    usesOptions={[
                      { label: 'React Component (JavaScript)', value: 'react-native-component-js' },
                      { label: 'React Component (TypeScript)', value: 'react-native-component-ts' },
                    ]}
                    selectedUse={selectedUse}
                    selectedLanguage={selectedLanguage}
                    handleChangeSelectedUse={handleChangeSelectedUse}
                    handleCopyInstall={handleCopyInstall}
                    handleCopyImport={handleCopyImport}
                    handleCopySetup={handleCopySetup}
                    handleCopyUsage={handleCopyUsage}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </HStack>
      </Slide>
    </Main>
  );
}
