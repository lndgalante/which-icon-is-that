import { Dispatch, SetStateAction } from "react";
import { Input, InputGroup, InputLeftElement, InputRightElement, Icon, Spinner } from "@chakra-ui/react";

// icons
import { FiSearch } from "react-icons/fi";

// components
import { MotionStack } from "@modules/common/components/MotionStack";

type Option = {
  id: string;
  label: string;
  value: string;
};

type Props = {
  value: string;
  isFetching: boolean;
  onChange: Dispatch<SetStateAction<string>>;
};

export function IconNameInput({ value, isFetching, onChange }: Props) {
  // handlers
  function handleInputChange({ target }) {
    onChange(target.value);
  }

  return (
    <InputGroup className="input-container" size="sm" position="relative">
      <InputLeftElement
        pointerEvents="none"
        children={
          <Icon
            as={FiSearch}
            transition="all 400ms ease-in-out"
            sx={{ ".input-container:focus-within &": { color: "brand.text" } }}
            color="brand.grey"
          />
        }
      />
      <InputRightElement
        pointerEvents="none"
        children={
          isFetching ? (
            <MotionStack
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Icon as={Spinner} color="brand.softOrange" />
            </MotionStack>
          ) : null
        }
      />
      <Input
        value={value}
        onChange={handleInputChange}
        pt={0.5}
        flex={1}
        borderWidth={0}
        borderRadius={8}
        color="brand.text"
        backgroundColor="brand.white"
        focusBorderColor="brand.softOrange"
        placeholder="Search by icon name"
      />
    </InputGroup>
  );
}
