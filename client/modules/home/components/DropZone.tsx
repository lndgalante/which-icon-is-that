import isUrl from "is-url";
import isSvg from "is-svg";
import Fade from "react-reveal/Fade";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import { Fragment, useState, useEffect } from "react";
import {
  Text,
  Stack,
  Modal,
  Input,
  Button,
  ModalBody,
  ModalOverlay,
  ModalContent,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

// utils
import { api } from "@modules/common/utils/api";
import { delay } from "@modules/home/utils/delay";
import { createHash } from "@modules/home/utils/hash";
import { getInnerHTMLFromSvgText } from "@modules/home/utils/dom";

// components
import { Isotype } from "@modules/common/components/Isotype";
import { DropInnerRadius } from "@modules/home/components/Shapes";

export function DropZone() {
  // react hooks
  const [isLoading, setIsLoading] = useState(false);

  // next hooks
  const { push } = useRouter();

  // chakra hooks
  const toast = useToast();
  const { onOpen, onClose } = useDisclosure();

  // dropzone hooks
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

  // utils
  function toastError(title: string) {
    toast({ title, status: "error" });
  }

  async function getIconPageUrl(hash: string) {
    const { data, success } = await api.getPathFromHash(hash);

    if (!success) {
      throw new Error("Hash not found");
    }

    await api.putIconIncrement(hash);

    return decodeURIComponent(data.result);
  }

  // handlers
  function handleDrop([file]) {
    const { type } = file;

    if (type !== "image/svg+xml") {
      return toastError(`Only SVG files are supported`);
    }

    const reader = new FileReader();

    reader.onabort = () => toastError(`File reading was aborted`);
    reader.onerror = () => toastError(`File reading has failed`);

    reader.onload = async () => {
      let hash = "";

      try {
        setIsLoading(true);

        const svgInnerHtml = getInnerHTMLFromSvgText(reader.result as string);

        hash = createHash(svgInnerHtml);
        const iconPageUrl = await getIconPageUrl(hash);

        await delay(600);
        push(iconPageUrl, undefined, { shallow: true });
      } catch (error) {
        await delay(600);

        push(
          {
            query: { hash },
            pathname: "/not-found",
          },
          undefined,
          { shallow: true },
        );
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsText(file);
  }

  // effects
  useEffect(() => {
    if (isLoading) {
      onOpen();
    } else {
      onClose();
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  // handle paste svg code or url
  useEffect(() => {
    async function handlePasteSvgCodeOrUrl(event) {
      let hash = "";
      let iconPageUrl = "";
      const pastedText = event.clipboardData.getData("Text");

      try {
        setIsLoading(true);

        if (isSvg(pastedText)) {
          const svgInnerHtml = getInnerHTMLFromSvgText(pastedText);

          hash = createHash(svgInnerHtml);
          iconPageUrl = await getIconPageUrl(hash);
        }

        if (isUrl(pastedText)) {
          const isSvgUrl = pastedText.endsWith(".svg");

          if (!isSvgUrl) {
            return toastError("Inserted URL should contain an SVG");
          }

          const svg = await fetch(pastedText).then((response) => response.text());
          const svgInnerHtml = getInnerHTMLFromSvgText(svg);

          hash = createHash(svgInnerHtml);
          iconPageUrl = await getIconPageUrl(hash);

          await delay(600);
          push(iconPageUrl, undefined, { shallow: true });
        }
      } catch (error) {
        await delay(600);
        push(
          {
            query: { hash },
            pathname: "/not-found",
          },
          undefined,
          { shallow: true },
        );
      } finally {
        setIsLoading(false);
      }
    }

    const body = document.querySelector("body");
    body.addEventListener("paste", handlePasteSvgCodeOrUrl);

    return () => body.removeEventListener("paste", handlePasteSvgCodeOrUrl);
  }, []);

  return (
    <Fragment>
      <Stack
        cursor="pointer"
        _hover={{ transform: "scale(1.025)", boxShadow: "7" }}
        transform={isDragActive ? "scale(1.025)" : "none"}
        backgroundColor="white"
        borderRadius={24}
        bottom={{ base: "-4.7rem", md: "-8.4rem" }}
        boxShadow="6"
        height={{ base: 180, md: 262 }}
        position="absolute"
        width={{ base: 335, md: 454 }}
        transition="all 200ms ease"
        willChange="transform"
        className="drop-zone"
        {...getRootProps()}
      >
        <Stack
          alignItems="center"
          flex={1}
          paddingTop={{ base: 0, md: "2.9rem" }}
          spacing={{ base: 0, md: 6 }}
          position="relative"
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <DropInnerRadius height={{ base: 154, md: 214 }} position="absolute" top={{ base: 3, md: 6 }} />
          <Fade bottom delay={200} distance="20px">
            {/* @ts-expect-error Unable to fix this problem */}
            <Input {...getInputProps()} />
            <Button
              paddingX={"1.4375rem"}
              paddingY={"1.5625rem"}
              _focus={null}
              variant={isDragActive ? "brand.solidRed" : "brand.solid"}
              sx={{
                ".drop-zone:hover &": {
                  color: "brand.white",
                  backgroundColor: "brand.lightRed",
                },
              }}
              fontWeight={700}
              fontSize="md"
            >
              Upload Icon
            </Button>

            <Text display={{ base: "none", md: "block" }} fontSize="sm" maxWidth={288}>
              Drag &amp; Drop the SVG file, paste the SVG code or the icon URL
            </Text>
          </Fade>
        </Stack>
      </Stack>

      <Modal onClose={onClose} size="full" isOpen={isLoading}>
        <ModalOverlay />
        <ModalContent margin={0} backgroundColor="brand.lightOrangeModal">
          <ModalBody display="flex">
            <Stack
              flex="1"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              textAlign="center"
              lineHeight={1}
            >
              <Text
                maxWidth={140}
                color="brand.lightRed"
                fontWeight={800}
                fontSize="2xl"
                textTransform="uppercase"
                mb="0.125rem"
              >
                That&apos;s a nice one!
              </Text>
              <Isotype />
              <Text fontWeight={600} paddingTop={3} color="brand.text">
                We&apos;re searching for it...
              </Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
