import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Button,
  Text,
  Link,
  Stack,
  LinkOverlay,
  UnorderedList,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import { FiInfo } from "react-icons/fi";

export function Info() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="Open project info"
        bottom={2}
        colorScheme="blackAlpha"
        icon={<FiInfo />}
        position="absolute"
        right={2}
        size="lg"
        variant="ghost"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>WhichIconIsThat Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Stack>
                <Text>Supported Icons</Text>
                <UnorderedList stylePosition="inside">
                  <ListItem>Feather Icons</ListItem>
                  <ListItem>Bootstrap Icons</ListItem>
                </UnorderedList>
              </Stack>

              <Text>
                Made with love by{" "}
                <Link
                  isExternal
                  color="blue.500"
                  href="https://www.leonardogalante.com"
                >
                  Leonardo Galante
                </Link>
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
              <LinkOverlay
                isExternal
                href="https://github.com/lndgalante/which-icon-is-that"
              >
                GitHub
              </LinkOverlay>
            </Button>

            <Button colorScheme="twitter" mr={3} onClick={onClose}>
              <LinkOverlay
                isExternal
                href={`https://twitter.com/intent/tweet?url=${encodeURI(
                  "Find your SVG icon easily on https://www.whichiconisthat.com. Send feedback to @lndgalante"
                )}`}
              >
                Share on Twitter
              </LinkOverlay>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
