import { AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { useRef, useState, Dispatch, SetStateAction } from "react";
import { Stack, Text, Input, InputGroup, InputRightElement, Icon, Spinner } from "@chakra-ui/react";

// icons
import { FiChevronDown } from "react-icons/fi";

// components
import { MotionStack } from "@modules/common/components/MotionStack";

type Option = {
  id: string;
  label: string;
  value: string;
};

type Props = {
  value: string;
  options: Option[];
  isFetching: boolean;
  onChange: Dispatch<SetStateAction<{ input: string; value: string; }>>
};

export function IconLibrarySelect({ value, options, isFetching, onChange }: Props) {
  // react hooks
  const inputRef = useRef();
  const [isActive, setIsActive] = useState(false);

  // handlers
  function handleInputChange({ target }) {
    onChange({ input: target.value, value: target.value });
  }

  function handleSelectSuggestion(suggestion) {
    onChange({ input: suggestion.label, value: suggestion.value });
  }

  const handleClickOutside = () => {
    setIsActive(false);
  };

  const handleClickInside = () => {
    setIsActive(true);
  };

  useOnClickOutside(inputRef, handleClickOutside);

  // constants
  const isServerSide = typeof window === "undefined";
  const isVisible = Boolean(!isServerSide && isActive && options?.length);

  return (
    <InputGroup className="input-container" size="sm" position="relative" maxWidth={189}>
      <InputRightElement
        pr={4}
        pointerEvents="none"
        children={
          <Icon
            as={isFetching ? Spinner : FiChevronDown}
            transition="all 400ms ease-in-out"
            sx={{ ".input-container:focus-within &": { color: "brand.text" } }}
            color="brand.grey"
          />
        }
      />
      <Input
        ref={inputRef}
        value={value}
        onClick={handleClickInside}
        onChange={handleInputChange}
        pt={0.5}
        borderWidth={0}
        borderRadius={8}
        color="brand.text"
        focusBorderColor="brand.softOrange"
        placeholder="Icon libraries"
        backgroundColor="brand.lightGrey"
        mr={2}
      />

      <AnimatePresence>
        {isVisible && (
          <MotionStack
            zIndex={10}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            overflow="hidden"
            position="absolute"
            padding={4}
            borderRadius={8}
            top={`3rem`}
            left={0}
            right={0}
            backgroundColor="brand.white"
            shadow="6"
            spacing={1}
            maxHeight={168}
            overflowY="scroll"
          >
            {options?.map((option, index) => (
              <Stack
                key={option.id}
                transition="background-color 400ms ease-in-out"
                cursor="pointer"
                _hover={{ backgroundColor: "brand.lightOrange" }}
                tabIndex={index}
                isfocusable="true"
                flexDirection="row"
                spacing={0}
                p={1}
                pl={2}
                borderRadius={8}
                className="suggestion-container"
                onClick={() => handleSelectSuggestion(option)}
                focusBorderColor="brand.softOrange"
              >
                <Text
                  transition="all 100ms ease-in-out"
                  color={"brand.text"}
                  sx={{
                    ".suggestion-container:hover &": {
                      transition: "all 400ms ease-in-out",
                      color: "brand.text",
                    },
                  }}
                >
                  {option.label}
                </Text>
              </Stack>
            ))}
          </MotionStack>
        )}
      </AnimatePresence>
    </InputGroup>
  );
}
