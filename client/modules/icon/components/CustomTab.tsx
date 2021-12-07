import NextLink from "next/link";
import { Tab, TabProps } from "@chakra-ui/react";

type Query = {
  packName: string;
  iconType: string;
  iconName: string;
};

type Href = {
  pathname: string;
  query: Query;
};

type Props = {
  href: Href;
  otherProps?: TabProps;
  children: React.ReactNode;
};

export function CustomTab({ children, href, ...otherProps }: Props) {
  return (
    <NextLink passHref href={href} scroll={false}>
      <Tab
        width={100}
        transition="border-bottom-color 200ms ease-in-out"
        borderBottomWidth={4}
        fontSize="sm"
        borderBottomColor="transparent"
        textTransform="capitalize"
        _focus={{ boxShadow: "none" }}
        _selected={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomWidth: "0.25rem",
          borderBottomColor: "brand.darkRed",
          bg: "brand.lightOrange",
          color: "brand.darkRed",
          fontWeight: 700,
        }}
        {...otherProps}
      >
        {children}
      </Tab>
    </NextLink>
  );
}
