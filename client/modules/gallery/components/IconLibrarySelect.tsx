import { Dispatch, SetStateAction } from "react";
import { Icon, Button, Menu, MenuButton, MenuList, MenuItem, useBreakpointValue } from "@chakra-ui/react";

// icons
import { FiChevronDown, FiFilter } from "react-icons/fi";

// components
import { Feather, Heroicons, Bootstrap } from "@modules/gallery/components/Isologous";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: Dispatch<SetStateAction<{ label: string; value: string }>>;
};

// constants
const ISOLOGOUS = {
  all: FiFilter,
  feather: Feather,
  heroicons: Heroicons,
  bootstrap: Bootstrap,
};

const ISOLOGOUS_HOVER_ELEMENT = {
  all: { stroke: "brand.darkRed" },
  feather: { stroke: "brand.darkRed" },
  heroicons: { fill: "brand.darkRed" },
  bootstrap: { fill: "brand.darkRed" },
};

export function IconLibrarySelect({ label, value, options, onChange }: Props) {
  // chakra hooks
  const menuButtonSize = useBreakpointValue({ base: "md", md: "sm" });

  // handlers
  function handleSelectOption(option) {
    onChange({ value: option.value, label: option.label });
  }

  return (
    <Menu autoSelect={false}>
      <MenuButton
        position={{ base: "absolute", md: "static" }}
        top="4.5rem"
        as={Button}
        textAlign="left"
        rightIcon={<FiChevronDown />}
        width={{ base: "100%", md: 182 }}
        left={0}
        right={0}
        zIndex={4}
        display="flex"
        mr={2}
        backgroundColor="brand.lightGrey"
        size={menuButtonSize}
        fontWeight={500}
        color={value === "all" ? "brand.text" : "brand.lightRed"}
        _active={{ color: "brand.darkRed", backgroundColor: "brand.lightOrange" }}
        _hover={{ color: "brand.darkRed", backgroundColor: "brand.lightOrange" }}
      >
        {label ?? "Icon libraries"}
      </MenuButton>
      <MenuList shadow="6" border={0} mt={2} zIndex={10}>
        {options?.map((option) => (
          <MenuItem
            className="menu-container"
            icon={
              <Icon
                as={ISOLOGOUS[option.value]}
                transition="all 400ms ease-in-out"
                sx={{
                  ".menu-container:hover & path": ISOLOGOUS_HOVER_ELEMENT[option.value],
                }}
              />
            }
            key={option.value}
            transition="all 400ms ease-in-out"
            color="brand.text"
            fontSize={14}
            onClick={() => handleSelectOption(option)}
            focusBorderColor="brand.softOrange"
            _focus={{ backgroundColor: "brand.lightOrange", color: "brand.orange" }}
            _hover={{ backgroundColor: "brand.lightOrange", color: "brand.darkRed" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
