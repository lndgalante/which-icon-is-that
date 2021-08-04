import { Tab } from "@chakra-ui/react";

type CustomTabProps = {
  children: React.ReactNode;
}

export function CustomTab({ children }: CustomTabProps) {
  return (<Tab
    width={82}
    transition="border-bottom-color 400ms ease-in-out"
    borderBottomWidth={4}
    fontSize="sm"
    borderBottomColor="transparent"
    _focus={{ boxShadow: "none" }}
    _selected={{
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomWidth: "4px",
      borderBottomColor: "brand.orange",
      bg: "brand.lightOrange",
      color: "brand.orange",
      fontWeight: 800,
    }}
  >
    {children}
  </Tab>)
};
