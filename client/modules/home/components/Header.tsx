import { Stack, Text } from '@chakra-ui/react';

import { DropZone } from '@modules/home/components/DropZone'
import { TopLeft, MiddleLeft, BottomLeft, TopRight, BottomRight, BottomRightSecondary, TopRightSecondary } from '@modules/home/components/Shapes'

export function Header() {
  return (
    <Stack minHeight={{ base: 448, md: 435 }} borderRadius={{ base: 0, md: 24 }} textAlign="center" backgroundColor='brand.lightOrange' position='relative' alignItems="center">
      <Stack position='absolute' left={{ base: 6, md: 2 }} top={{ base: -10, md: 14 }}>
        <TopLeft width={{ base: '40px', md: '87px' }} />
      </Stack>
      <Stack position='absolute' left={{ base: -6, md: -4 }} bottom={{ base: 56, md: 8 }}>
        <BottomLeft width={{ base: '70px', md: '120px' }} />
      </Stack>
      <Stack position='absolute' left={{ base: 16, md: 28 }} top={{ base: -4, md: 40 }}>
        <MiddleLeft width={{ base: '51px', md: '120px' }} />
      </Stack>
      <Stack position='absolute' right={{ base: 28, md: 16 }} top={{ base: -10, md: 16 }} zIndex={2}>
        <TopRight width={{ base: '32px', md: '120px' }} />
      </Stack>
      <Stack position='absolute' right={{ base: 14, md: -7 }} top={{ base: -12, md: 16 }}>
        <TopRightSecondary width={{ base: '61px', md: '120px' }} />
      </Stack>
      <Stack position='absolute' right={{ base: 20, md: 48 }} bottom={{ base: -24, md: -24 }}>
        <BottomRight width={{ base: '61px', md: '95px' }} />
      </Stack>
      <Stack position='absolute' right={{ base: 2, md: 16 }} bottom={{ base: 10, md: 12 }}>
        <BottomRightSecondary width={{ base: '61px', md: '104px' }} />
      </Stack>

      <Stack paddingTop={{ base: 66, md: 42 }} zIndex={5} alignItems="center" spacing={6}>
        <Text maxWidth={{ base: 240, md: 846 }} lineHeight="initial" color="brand.darkRed" fontSize={{ base: 24, md: 40 }} fontWeight={500} >The missing tool to work with icons for <Text as="span" fontWeight={800}>Developers</Text> and <Text as="span" fontWeight={800}>Designers</Text></Text>
        <Text maxWidth={{ base: 248, md: 478 }} fontSize={{ base: 14, md: 18 }} fontWeight="medium" color="brand.warmBlack">Stop wasting time comparing shapes and begin improving your UI with some beautiful icons</Text>
      </Stack>

      <DropZone />
    </Stack>
  );
}
