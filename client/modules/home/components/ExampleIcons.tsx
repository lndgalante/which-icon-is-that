import NextLink from 'next/link';
import { Stack, Text, Icon, IconButton, HStack, Link } from '@chakra-ui/react';
import { FiHome, FiSearch, FiClock, FiStar, FiArrowRight } from 'react-icons/fi';

function ExampleIcon({ icon, label, href }) {
  return (
    <NextLink href={href} passHref>
      <Link>
        <IconButton
          icon={icon}
          aria-label={label}
          color='brand.darkRed'
          backgroundColor='brand.lightOrange'
          _hover={{ transform: 'translateY(-1px)', backgroundColor: 'brand.softOrange' }}
        />
      </Link>
    </NextLink>
  );
}
export function ExampleIcons() {
  return (
    <Stack paddingTop={{ base: 146, md: 154 }} alignItems='center' spacing={{ base: 8, md: 10 }}>
      <HStack flexDirection={{ base: 'column', md: 'row' }} alignItems='center' justifyContent='center' spacing={{ base: 0, md: 5 }}>
        <Text fontWeight={700} fontSize="sm" color='brand.darkRed' mb={{ base: 3, md: 0 }}>
          Try one of these:
        </Text>
        <HStack alignItems='center' justifyContent='center' spacing={2} >
          <ExampleIcon icon={<FiHome />} label="Home" href="/feather/regular/home" />
          <ExampleIcon icon={<FiSearch />} label="Search" href="/feather/regular/search" />
          <ExampleIcon icon={<FiClock />} label="Clock" href="/feather/regular/clock" />
          <ExampleIcon icon={<FiStar />} label="Star" href="/feather/regular/star" />
        </HStack>
      </HStack>


      <NextLink href="/gallery" passHref>
        <Link textDecoration="underline" willChange="transform" _hover={{ transform: 'translateX(1px)' }}>
          or find your icon in the gallery<Icon as={FiArrowRight} ml={1} />
        </Link>
      </NextLink>
    </Stack>
  );
}
