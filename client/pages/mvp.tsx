import isUrl from "is-url";
import isSvg from "is-svg";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import {
  Text,
  Input,
  Stack,
  Button,
  HStack,
  Center,
  Spinner,
  Textarea,
  FormLabel,
  InputGroup,
  FormControl,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

// lib
import { api } from "@modules/common/utils/api";
import { createHash } from "@lib/hash";
import { getInnerHTMLFromSvgText } from "@lib/dom";

// components
import { Main } from "@components/Main";
import { RadioGroup } from "@components/RadioGroup";

// constants
const SVG_PLACEHOLDER = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
  <path
    d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
</svg>`;

type InputTypes = "File" | "URL" | "Text";

const INPUT_TYPES: InputTypes[] = ["File", "URL", "Text"];

export default function Home() {
  // react hooks
  const [hash, setHash] = useState("");
  const [svgUrl, setSvgUrl] = useState("");
  const [svgCode, setSvgCode] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadingFile, setIsDownloadingFile] = useState(false);
  const [inputType, setInputType] = useState<InputTypes>(INPUT_TYPES[0]);

  // chakra hooks
  const toast = useToast();

  // next hooks
  const { push } = useRouter();

  // dropzone hooks
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  // utils
  async function moveToHashPage(hash: string) {
    try {
      setIsLoading(true);
      const { data, success } = await api.getPathFromHash(hash);

      if (!success) {
        return toast({
          title: "Icon not found on our database",
          status: "error",
        });
      }

      await api.putIconIncrement(hash);

      const url = decodeURIComponent(data.result);
      push(url, undefined, { shallow: true });
    } catch (error) {
      console.log("Error on moveToHashPage", error);
    } finally {
      setIsLoading(false);
    }
  }

  // handlers
  function handleInputTypeChange(value: string) {
    setInputType(value as InputTypes);
  }

  function handleUrlChange({ target }) {
    setSvgUrl(target.value);
  }

  function handleCodeChange({ target }) {
    setSvgCode(target.value);
  }

  function handleDrop([file]) {
    const { name, type } = file;

    if (type !== "image/svg+xml") {
      return toast({ title: `Only SVG files are supported`, status: "error" });
    }

    setFileName(name);

    const reader = new FileReader();

    reader.onabort = () =>
      toast({ title: "File reading was aborted", status: "error" });
    reader.onerror = () =>
      toast({ title: "File reading has failed", status: "error" });
    reader.onload = () => {
      const svgInnerHtml = getInnerHTMLFromSvgText(reader.result as string);
      const hash = createHash(svgInnerHtml);
      setHash(hash);
    };

    reader.readAsText(file);
  }

  // utils
  async function searchIconByUrlInput() {
    if (!svgUrl) {
      return toast({ title: "Insert a URL first", status: "error" });
    }

    const isValidUrl = isUrl(svgUrl);
    const isSvgUrl = svgUrl.endsWith(".svg");

    if (!isValidUrl) {
      return toast({ title: "Inserted URL is not valid", status: "error" });
    }

    if (!isSvgUrl) {
      return toast({
        title: "Inserted URL should contain an SVG",
        status: "error",
      });
    }

    try {
      setIsDownloadingFile(true);

      const svg = await fetch(svgUrl).then((response) => response.text());
      const svgInnerHtml = getInnerHTMLFromSvgText(svg);

      moveToHashPage(createHash(svgInnerHtml));
    } catch (error) {
      console.log("Error on searchIconByUrlInput", error);
    } finally {
      setIsDownloadingFile(false);
    }
  }

  function searchIconByCodeInput() {
    if (!isSvg(svgCode)) {
      return toast({ title: "HTML inserted is not an SVG", status: "error" });
    }

    const svgInnerHtml = getInnerHTMLFromSvgText(svgCode);
    moveToHashPage(createHash(svgInnerHtml));
  }

  function searchIconByFileInput() {
    if (!hash) {
      return toast({ title: `Insert a file first`, status: "warning" });
    }

    moveToHashPage(hash);
  }

  function getFindIconFunction() {
    const inputFunctions = {
      ["URL"]: searchIconByUrlInput,
      ["File"]: searchIconByFileInput,
      ["Text"]: searchIconByCodeInput,
    };
    const inputFunction = inputFunctions[inputType];

    return inputFunction;
  }

  // constants
  const isUrlSelected = inputType === "URL";
  const isFileSelected = inputType === "File";
  const isTextSelected = inputType === "Text";

  const handleFindIconButton = getFindIconFunction();
  const isFindIconButtonEnabled = hash || svgUrl || svgCode;

  return (
    <Main>
      <Stack height={460} maxWidth={640} spacing={3} width="full">
        <HStack alignItems="flex-end" justifyContent="space-between">
          <FormControl>
            <FormLabel color="gray.800">Select your input type</FormLabel>
            <RadioGroup
              name="Input type"
              options={INPUT_TYPES}
              onChange={handleInputTypeChange}
            />
          </FormControl>

          <Button
            colorScheme="blackAlpha"
            isDisabled={!isFindIconButtonEnabled}
            isLoading={isLoading}
            onClick={handleFindIconButton}
          >
            {isLoading ? "Finding Icon..." : "Find Icon!"}
          </Button>
        </HStack>

        <Stack>
          {isFileSelected && (
            <FormControl>
              <FormLabel color="gray.800">Insert your SVG file</FormLabel>
              <Center
                {...getRootProps()}
                _focus={{
                  boxShadow: "lg",
                  transform: "scale(1.025)",
                  outline: "none",
                }}
                _hover={{ boxShadow: "lg", transform: "scale(1.025)" }}
                background="rgba( 255, 255, 255, 0.25 )"
                borderRadius="2xl"
                boxShadow="md"
                cursor="pointer"
                flexDirection="column"
                mb={4}
                minHeight={380}
                p={4}
                position="relative"
                style={{ backdropFilter: "blur(6px)" }}
                textAlign="center"
                transform={isDragActive ? "scale(1.025)" : "none"}
                transformOrigin="center center"
                transition="all ease-in-out 400ms"
                willChange={"transform"}
              >
                {/* @ts-expect-error Unable to fix this problem */}
                <Input {...getInputProps()} />
                <Text fontSize="sm">
                  {fileName ? fileName : "Click or drag your SVG file"}
                </Text>
              </Center>
            </FormControl>
          )}

          {isUrlSelected && (
            <FormControl>
              <FormLabel color="gray.800">Insert your SVG url</FormLabel>
              <InputGroup size="md">
                <Input
                  bg="white"
                  borderRadius="2xl"
                  focusBorderColor="gray.600"
                  placeholder="https://icons.getbootstrap.com/assets/icons/archive.svg"
                  type="text"
                  value={svgUrl}
                  onChange={handleUrlChange}
                />
                <InputRightElement>
                  {isDownloadingFile && (
                    <Spinner colorScheme="blackAlpha" size="xs" />
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>
          )}

          {isTextSelected && (
            <FormControl>
              <FormLabel color="gray.800">Insert your SVG code</FormLabel>
              <Textarea
                _placeholder={{ color: "blackAlpha.600" }}
                background="rgba( 255, 255, 255, 0.25 )"
                borderRadius="2xl"
                boxShadow="md"
                focusBorderColor="blackAlpha.600"
                fontSize="sm"
                minHeight={380}
                placeholder={SVG_PLACEHOLDER}
                resize="none"
                style={{ backdropFilter: "blur(6px)" }}
                value={svgCode}
                onChange={handleCodeChange}
              />
            </FormControl>
          )}
        </Stack>
      </Stack>
    </Main>
  );
}
