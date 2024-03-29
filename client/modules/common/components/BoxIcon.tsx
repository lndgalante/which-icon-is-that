import NextLink, { LinkProps } from "next/link";
import { Icon, Link, Text, As } from "@chakra-ui/react";

type Props = {
  icon: As;
  label: string;
  href: LinkProps["href"];
  primary?: boolean;
  isTwoTone?: boolean;
  withShadow?: boolean;
  displayLabel?: boolean;
  simpleHover?: boolean;
};

export function BoxIcon({ icon, label, href, primary, displayLabel, withShadow, isTwoTone, simpleHover }: Props) {
  return (
    <NextLink passHref href={href}>
      <Link
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minWidth={{ base: displayLabel ? "4.38rem" : "auto", md: displayLabel ? 20 : "auto" }}
        height={{ base: displayLabel ? "4.38rem" : "auto", md: displayLabel ? 20 : "auto" }}
        backgroundColor={primary ? "brand.lightOrange" : "brand.lightGrey"}
        boxShadow={withShadow ? "sm" : null}
        transition="all 200ms ease-in-out"
        borderRadius={4}
        p={2}
        textAlign="center"
        _hover={{
          color: "brand.darkRed",
          transform: "translateY(-1px)",
          backgroundColor: simpleHover ? "brand.white" : primary ? "brand.softOrange" : "brand.lightOrange",
        }}
        className="boxicon-container"
      >
        <Icon
          w={displayLabel ? 6 : 5}
          h={displayLabel ? 6 : 5}
          aria-label={label}
          as={icon}
          _hover={{ backgroundColor: "transparent" }}
          backgroundColor="transparent"
          sx={{
            ".boxicon-container:hover &": { color: "brand.darkRed" },
            ...(isTwoTone && { "path[fill]": { fill: "brand.softOrange" } }),
          }}
        />
        {displayLabel && (
          <Text fontSize={12} mt={2} maxWidth={20} px={1} isTruncated>
            {label.toLowerCase()}
          </Text>
        )}
      </Link>
    </NextLink>
  );
}
