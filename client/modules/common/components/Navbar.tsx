import NextLink from 'next/link';
import {
  Icon,
  Stack,
  LinkOverlay,
  HStack,
  Link,
  LinkBox,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  useDisclosure,
} from '@chakra-ui/react';
import { HiMenu, HiX } from 'react-icons/hi';
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';

// components
import { HorizontalLogo } from '@modules/common/components/HorizontalLogo';

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      paddingY={{ base: 6, md: 4 }}
      paddingX={{ base: 4, md: 0 }}
    >
      <HorizontalLogo maxHeight={{ base: 10, md: 12 }} marginLeft={-2} />

      <HStack display={{ base: 'none', md: 'flex' }} alignItems='center' spacing={10} fontWeight={600} fontSize='sm'>
        <NextLink href={'/libraries'} passHref>
          <Link>Icon Libraries</Link>
        </NextLink>
        <NextLink href={'/pricing'} passHref>
          <Link>Pricing</Link>
        </NextLink>
        <NextLink href={'/contact'} passHref>
          <Link>Contact</Link>
        </NextLink>
      </HStack>

      <Icon as={HiMenu} cursor='pointer' display={{ base: 'block', md: 'none' }} w={6} h={6} onClick={onOpen} />

      <Drawer onClose={onClose} isOpen={isOpen} size='full'>
        <DrawerContent backgroundColor='brand.lightRed' paddingY={12}>
          <DrawerHeader>
            <Stack alignItems='flex-end'>
              <Icon as={HiX} color='brand.white' cursor='pointer' w={6} h={6} onClick={onClose} />
            </Stack>
          </DrawerHeader>

          <DrawerBody>
            <Stack alignItems='center' color='brand.white' spacing={10} fontWeight={700} paddingY={16} fontSize='xl'>
              <NextLink href='/libraries' passHref>
                <Link>Icon Libraries</Link>
              </NextLink>
              <NextLink href='/pricing' passHref>
                <Link>Pricing</Link>
              </NextLink>
              <NextLink href='/contact' passHref>
                <Link>Contact</Link>
              </NextLink>
            </Stack>
          </DrawerBody>

          <DrawerFooter justifyContent='center' alignItems="center">
            <LinkBox>
              <LinkOverlay href="https://twitter.com/whichiconisthat" isExternal>
                <Icon as={AiOutlineTwitter} color='brand.white' w={6} h={6} />
              </LinkOverlay>
            </LinkBox>
            <LinkBox>
              <LinkOverlay href="https://github.com/lndgalante/which-icon-is-that" isExternal>
                <Icon as={AiFillGithub} color='brand.white' w={6} h={6} ml={2} />
              </LinkOverlay>
            </LinkBox>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack >
  );
}
