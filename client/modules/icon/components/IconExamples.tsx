import {
  As,
  Wrap,
  Icon,
  Link,
  Text,
  Input,
  Stack,
  Button,
  WrapItem,
  IconButton,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

type IconExamplesProps = {
  reactIcon: As;
  iconName: string;
};

export function IconExamples({ reactIcon, iconName }: IconExamplesProps) {
  return (
    <Stack
      as="article"
      paddingX={6}
      paddingY={7}
      borderWidth={1}
      spacing={{ base: 7, md: 4 }}
      borderColor="brand.softGrey"
      borderRadius={8}
    >
      <Text fontWeight={800} fontSize="lg" color="brand.darkRed">
        Usage Examples
      </Text>

      <Stack>
        <Text fontWeight={700} fontSize="md" color="brand.text">
          Text
        </Text>

        <Wrap spacing={7}>
          <WrapItem alignItems="center">
            <Icon as={reactIcon} w={6} h={6} mr={1.5} />
            <Text fontSize="lg">Heading</Text>
          </WrapItem>
          <WrapItem alignItems="center">
            <Icon as={reactIcon} w={5} h={5} mr={1.5} />
            <Text fontSize="md">Smaller heading</Text>
          </WrapItem>
          <WrapItem alignItems="center">
            <Icon as={reactIcon} w={4} h={4} mr={1.5} />
            <Text fontSize="sm">Inline text</Text>
          </WrapItem>
          <WrapItem alignItems="center">
            <Link fontSize="sm" href="https://chakra-ui.com" isExternal display="flex" alignItems="center">
              <Icon as={reactIcon} w={4} h={4} mr={1.5} />
              Example link text
            </Link>
          </WrapItem>
        </Wrap>
      </Stack>

      <Stack>
        <Text fontWeight={700} fontSize="md" color="brand.text">
          Buttons
        </Text>

        <Wrap spacing={7}>
          <WrapItem alignItems="center">
            <Button leftIcon={<Icon as={reactIcon} w={6} h={6} />} variant="brand.solidRed">
              Button
            </Button>
          </WrapItem>
          <WrapItem alignItems="center">
            <Button leftIcon={<Icon as={reactIcon} w={6} h={6} />} variant="brand.disabled">
              Button
            </Button>
          </WrapItem>
          <WrapItem alignItems="center">
            <Button leftIcon={<Icon as={reactIcon} w={6} h={6} />} variant="brand.ghost">
              Button
            </Button>
          </WrapItem>
          <WrapItem alignItems="center">
            <IconButton aria-label={iconName} variant="brand.solidRed" icon={<Icon as={reactIcon} w={6} h={6} />} />
          </WrapItem>
          <WrapItem alignItems="center">
            <IconButton aria-label={iconName} variant="brand.disabled" icon={<Icon as={reactIcon} w={6} h={6} />} />
          </WrapItem>
          <WrapItem alignItems="center">
            <IconButton aria-label={iconName} variant="brand.ghost" icon={<Icon as={reactIcon} w={6} h={6} />} />
          </WrapItem>
        </Wrap>
      </Stack>

      <Stack>
        <Text fontWeight={700} fontSize="md" color="brand.text">
          Inputs
        </Text>

        <Wrap spacing={7}>
          <WrapItem >
            <InputGroup size="sm">
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={reactIcon} w={4} h={4} color="brand.grey" />}
              />
              <Input
                borderRadius={6}
                type="text"
                placeholder="Input text"
                borderColor="brand.grey"
                _placeholder={{ color: "brand.grey" }}
                _focus={{ borderColor: "brand.orange" }}
              />
            </InputGroup>
          </WrapItem>
          <WrapItem >
            <InputGroup size="md">
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={reactIcon} w={6} h={6} color="brand.grey" />}
              />
              <Input
                borderRadius={6}
                type="text"
                placeholder="Input text"
                borderColor="brand.grey"
                _placeholder={{ color: "brand.grey" }}
                _focus={{ borderColor: "brand.orange" }}
              />
            </InputGroup>
          </WrapItem>
          <WrapItem >
            <InputGroup size="lg">
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={reactIcon} w={8} h={8} color="brand.grey" />}
              />
              <Input
                borderRadius={6}
                type="text"
                placeholder="Input text"
                borderColor="brand.grey"
                _placeholder={{ color: "brand.grey" }}
                _focus={{ borderColor: "brand.orange" }}
              />
            </InputGroup>
          </WrapItem>
        </Wrap>
      </Stack>
    </Stack>
  );
}
