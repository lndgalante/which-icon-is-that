import Redis from 'ioredis';
import { useState } from 'react';
import { motion, isValidMotionProp } from 'framer-motion';
import { InferGetStaticPropsType, GetStaticPaths } from 'next';
import PrismTheme from 'prism-react-renderer/themes/dracula';
import Highlight, { defaultProps } from 'prism-react-renderer';
import {
  Tag,
  Link,
  Icon,
  Text,
  Slide,
  Stack,
  HStack,
  Select,
  Tooltip,
  TagLabel,
  IconButton,
  TagRightIcon,
  forwardRef,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';

// react-icons
import * as Fi from 'react-icons/fi';
import * as Bs from 'react-icons/bs';
import { FaGithubAlt } from 'react-icons/fa';
import { FiCode, FiArrowLeft, FiClipboard } from 'react-icons/fi';

// lib
import { api } from 'lib/api';
import { FoundIcon } from 'lib/types';

// components
import { Main } from 'components/Main';
import { ICONS_LOGOS } from 'components/icons';
import { NextChakraLink } from 'components/NextChakraLink';

// framer-motion
const MotionHStack = motion(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(Object.entries(props).filter(([key]) => !isValidMotionProp(key)));
    return <HStack ref={ref} {...chakraProps} />;
  }),
);

const MotionLink = motion(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(Object.entries(props).filter(([key]) => !isValidMotionProp(key)));
    return <Link ref={ref} {...chakraProps} />;
  }),
);

// constants
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.5 } },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const featherIcons = Object.keys(Fi);
const bootstrapIcons = Object.keys(Bs);

const reactIconsPacks = {
  feather: featherIcons,
  bootstrap: bootstrapIcons,
};

// helpers
const findReactIcon = (iconName: string, iconPackName: string) => {
  const iconPack = reactIconsPacks[iconPackName];
  return iconPack.find((icon) => icon.toLowerCase().includes(iconName));
};

export default function IconPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  // constants
  const data = props?.data;
  const success = props?.success;

  const reactIconName = data ? findReactIcon(data?.svg?.iconName, data?.svg?.packName) : '';
  const code = `import { ${reactIconName} } from react-icons/${data?.svg?.packId}`;

  // react hooks
  const [selectedIconLibrary, setSelectedIconLibrary] = useState('react-icons');

  // chakra hooks
  const { onCopy } = useClipboard(code);
  const { isOpen, onToggle } = useDisclosure();

  // handlers
  function handleIconLibraryChange({ target }) {
    setSelectedIconLibrary(target.value);
  }

  return (
    <Main>
      <NextChakraLink href='/'>
        <IconButton
          position='absolute'
          top={2}
          left={2}
          aria-label='Go back'
          variant='ghost'
          size='lg'
          colorScheme='blackAlpha'
          icon={<FiArrowLeft />}
        />
      </NextChakraLink>

      {success === true && (
        <MotionHStack minWidth={34} mb={4} variants={container} initial='hidden' animate='show'>
          <Tooltip label={data?.svg?.iconFileName} aria-label={`${data?.svg?.iconName} icon file name`}>
            <MotionLink href={data?.links?.icon} isExternal>
              <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
                <TagLabel mr={1.5}>{data?.svg?.iconName}</TagLabel>
                <TagRightIcon as={() => <div dangerouslySetInnerHTML={{ __html: data?.svg?.svg }} />} />
              </Tag>
            </MotionLink>
          </Tooltip>

          <Tooltip label='Icon pack' aria-label='Icon pack'>
            <MotionLink href={data?.links?.pack} isExternal>
              <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
                <TagLabel mr={1.5}>{data?.svg?.packName}</TagLabel>
                <TagRightIcon maxW={4} as={ICONS_LOGOS[data?.svg?.packName]} />
              </Tag>
            </MotionLink>
          </Tooltip>

          <Tooltip label='Source code' aria-label='Source code'>
            <MotionLink href={data?.links?.source} isExternal>
              <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
                <TagLabel mr={1.5}>{data?.svg?.bytes}</TagLabel>
                <TagRightIcon as={() => <Icon as={FaGithubAlt} w={5} h={5} />} />
              </Tag>
            </MotionLink>
          </Tooltip>

          <Tooltip label='Snippets' aria-label='Snippets'>
            <Tag
              onClick={onToggle}
              cursor='pointer'
              size='lg'
              borderRadius='full'
              fontSize='sm'
              colorScheme='blackAlpha'
              variants={item}
            >
              <TagRightIcon as={() => <Icon as={FiCode} w={5} h={5} />} />
            </Tag>
          </Tooltip>
        </MotionHStack>
      )}

      {success === false && <Text mr={1}>Sorry, we couldn't find your icon</Text>}

      {success === true && (
        <Slide direction='bottom' in={isOpen}>
          <Stack alignItems='flex-start' px={6} py={6} color='white' background='rgba( 0, 0, 0, 0.7 )' spacing={4}>
            <Stack>
              <Text fontWeight='medium'>Pick your icon library</Text>
              <Select size='sm' value={selectedIconLibrary} onChange={handleIconLibraryChange}>
                <option value='react-icons'>react-icons</option>
              </Select>
            </Stack>

            <Stack>
              <Text fontWeight='medium'>Code snippet</Text>
              <Highlight {...defaultProps} theme={PrismTheme} code={code.trim()} language='jsx'>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <HStack
                    as='pre'
                    spacing={6}
                    className={`${className} code`}
                    style={{ ...style, padding: '4px 12px', borderRadius: '4px' }}
                  >
                    {tokens.map((line, i) => (
                      <div {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                          <span {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    ))}

                    <IconButton
                      onClick={onCopy}
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
        </Slide>
      )}
    </Main>
  );
}

export const getStaticProps = async ({ params }) => {
  const { hash } = params;
  const data: FoundIcon = await api.getIconData(hash);

  return { props: data };
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const redis = new Redis({
      tls: true,
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOSTNAME,
      password: process.env.REDIS_PASSWORD,
    });

    const hashes: string[] = await redis.keys('*');
    const paths = hashes.map((hash) => ({ params: { hash } }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.log('Error on getStaticPaths', error);
  }
};
