import Redis from 'ioredis';
import { FiSearch } from 'react-icons/fi';
import { FaGithubAlt } from 'react-icons/fa';
import { motion, isValidMotionProp } from 'framer-motion';
import { InferGetStaticPropsType, GetStaticPaths } from 'next';
import { Tag, Link, Icon, Text, HStack, Tooltip, TagLabel, TagRightIcon, forwardRef } from '@chakra-ui/react';

// lib
import { api } from 'lib/api';
import { FoundIcon } from 'lib/types';

// components
import { Main } from 'components/Main';
import { ICONS_LOGOS } from 'components/icons';
import { NextChakraLink } from 'components/NextChakraLink';

// framer motion
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

const MotionChakraLink = motion(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(Object.entries(props).filter(([key]) => !isValidMotionProp(key)));
    // @ts-expect-error
    return <NextChakraLink ref={ref} {...chakraProps} />;
  }),
);

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

  return (
    <Main>
      {success === true && (
        <MotionHStack minWidth={34} mb={4} variants={container} initial='hidden' animate='show'>
          <Tooltip label={data?.svg?.fileName} aria-label={`${data?.svg?.name} icon file name`}>
            <MotionLink href={data?.links?.icon} isExternal>
              <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
                <TagLabel mr={1.5}>{data?.svg?.name}</TagLabel>
                <TagRightIcon as={() => <div dangerouslySetInnerHTML={{ __html: data?.svg?.svg }} />} />
              </Tag>
            </MotionLink>
          </Tooltip>

          <Tooltip label='Icon pack' aria-label='Icon pack'>
            <MotionLink href={data?.links?.pack} isExternal>
              <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
                <TagLabel mr={1.5}>{data?.svg?.pack}</TagLabel>
                <TagRightIcon maxW={4} as={ICONS_LOGOS[data?.svg?.pack]} />
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

          <NextChakraLink href='/'>
            <Tooltip label='Find another icon' aria-label='Find another icon'>
              <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha' variants={item}>
                <TagRightIcon as={() => <Icon as={FiSearch} w={5} h={5} />} />
              </Tag>
            </Tooltip>
          </NextChakraLink>
        </MotionHStack>
      )}

      {success === false && (
        <MotionHStack>
          <Text mr={1}>We couldn't find your icon</Text>
          <MotionChakraLink href='/'>
            <Tooltip label='Find another icon' aria-label='Find another icon'>
              <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha'>
                <TagRightIcon as={() => <Icon as={FiSearch} w={5} h={5} />} />
              </Tag>
            </Tooltip>
          </MotionChakraLink>
        </MotionHStack>
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
