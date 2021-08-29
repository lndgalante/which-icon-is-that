import NextLink from "next/link";
import { Tab, TabProps } from "@chakra-ui/react";

type CustomTabProps = {
  href: any;
  otherProps?: TabProps;
  children: React.ReactNode;
};

export function CustomTab({ children, href, ...otherProps }: CustomTabProps) {
  return (
    <NextLink passHref href={href} scroll={false}>
      <Tab
        width={82}
        transition="border-bottom-color 400ms ease-in-out"
        borderBottomWidth={4}
        fontSize="sm"
        borderBottomColor="transparent"
        _focus={{ boxShadow: "none" }}
        _selected={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomWidth: "0.25rem",
          borderBottomColor: "brand.orange",
          bg: "brand.lightOrange",
          color: "brand.orange",
          fontWeight: 700,
        }}
        {...otherProps}
      >
        {children}
      </Tab>
    </NextLink>
  );
}
