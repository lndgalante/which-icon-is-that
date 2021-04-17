import Redis from 'ioredis';
import { FiSearch } from 'react-icons/fi';
import { FaGithubAlt } from 'react-icons/fa';
import { InferGetStaticPropsType, GetStaticPaths } from 'next';
import { Tag, Link, Icon, Text, HStack, Tooltip, TagLabel, TagRightIcon } from '@chakra-ui/react';

// lib
import { api } from 'lib/api';
import { FoundIcon } from 'lib/types';

// components
import { Main } from 'components/Main';
import { ICONS_LOGOS } from 'components/icons';
import { NextChakraLink } from 'components/NextChakraLink';

export default function IconPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  // constats
  const data = props?.data;
  const success = props?.success;

  return (
    <Main>
      {success === true && (
        <HStack minWidth={34} mb={4}>
          <Tooltip label={data?.svg?.fileName} aria-label={`${data?.svg?.name} icon file name`}>
            <Link href={data?.links?.icon} isExternal>
              <Tag size='lg' borderRadius='full' colorScheme='blackAlpha' fontSize='sm' maxWidth={122}>
                <TagLabel mr={1.5}>{data?.svg?.name}</TagLabel>
                <TagRightIcon as={() => <div dangerouslySetInnerHTML={{ __html: data?.svg?.svg }} />} />
              </Tag>
            </Link>
          </Tooltip>

          <Tooltip label='Icon pack' aria-label={`Icon pack`}>
            <Link href={data?.links?.pack} isExternal>
              <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha'>
                <TagLabel mr={1.5}>{data?.svg?.pack}</TagLabel>
                <TagRightIcon maxW={4} as={ICONS_LOGOS[data?.svg?.pack]} />
              </Tag>
            </Link>
          </Tooltip>

          <Tooltip label='Source code' aria-label={`Source code`}>
            <Link href={data?.links?.source} isExternal>
              <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha'>
                <TagLabel mr={1.5}>{data?.svg?.bytes}</TagLabel>
                <TagRightIcon as={() => <Icon as={FaGithubAlt} w={5} h={5} />} />
              </Tag>
            </Link>
          </Tooltip>

          <NextChakraLink href='/'>
            <Tooltip label='Find another icon' aria-label={`Find another icon`}>
              <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha'>
                <TagRightIcon as={() => <Icon as={FiSearch} w={5} h={5} />} />
              </Tag>
            </Tooltip>
          </NextChakraLink>
        </HStack>
      )}

      {success === false && (
        <HStack>
          <Text mr={1}>We couldn't find your icon </Text>
          <NextChakraLink href='/'>
            <Tooltip label='Find another icon' aria-label={`Find another icon`}>
              <Tag size='lg' borderRadius='full' fontSize='sm' colorScheme='blackAlpha'>
                <TagRightIcon as={() => <Icon as={FiSearch} w={5} h={5} />} />
              </Tag>
            </Tooltip>
          </NextChakraLink>
        </HStack>
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
