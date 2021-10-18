import { Dispatch, SetStateAction } from "react";
import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";

// icons
import { FiSearch } from "react-icons/fi";

type Props = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

export function IconNameInput({ value, onChange }: Props) {
  // handlers
  function handleInputChange({ target }) {
    onChange(target.value);
  }

  return (
    <InputGroup className="input-container" size="sm">
      <InputLeftElement pointerEvents="none">
        <Icon
          as={FiSearch}
          transition="all 400ms ease-in-out"
          sx={{ ".input-container:focus-within &": { color: "brand.text" } }}
          color="brand.grey"
        />
      </InputLeftElement>
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
