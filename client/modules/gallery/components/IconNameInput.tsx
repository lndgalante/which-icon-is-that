import { FiX } from "react-icons/fi";
import { Dispatch, SetStateAction } from "react";
import { Input, InputGroup, InputLeftElement, InputRightElement, Icon } from "@chakra-ui/react";

// icons
import { FiSearch } from "react-icons/fi";

type Props = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  shouldDisplayCross: boolean;
  onCrossClick: () => void;
};

export function IconNameInput({ value, onChange, shouldDisplayCross, onCrossClick }: Props) {
  // handlers
  function handleInputChange({ target }) {
    onChange(target.value);
  }

  return (
    <InputGroup className="input-container" size="sm">
      <InputLeftElement pointerEvents="none">
        <Icon
          as={FiSearch}
          transition="all 200ms ease-in-out"
          sx={{ ".input-container:focus-within &": { color: "brand.text" } }}
          color="brand.grey"
        />
      </InputLeftElement>
      {shouldDisplayCross && (
        <InputRightElement cursor="pointer">
          <Icon
            as={FiX}
            onClick={onCrossClick}
            transition="all 200ms ease-in-out"
            sx={{ ".input-container:focus-within &": { color: "brand.text" } }}
            color="brand.grey"
          />
        </InputRightElement>
      )}
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
