import NextLink from "next/link";
import { IconButton, Stack, Link, Text, IconButtonProps } from "@chakra-ui/react";

type BoxIconProps = {
  icon: IconButtonProps["icon"];
  label: string;
  href: string;
  primary?: boolean;
  withShadow?: boolean;
  displayLabel?: boolean;
};

export function BoxIcon({ icon, label, href, primary, displayLabel, withShadow }: BoxIconProps) {
  return (
    <NextLink passHref href={href}>
      <Link
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minWidth={displayLabel ? 20 : 'auto'}
        height={displayLabel ? 20 : 'auto'}
        backgroundColor={primary ? "brand.lightOrange" : "brand.lightGrey"}
        boxShadow={withShadow ? "sm" : null}
        transition="all 400ms ease-in-out"
        borderRadius={4}
        textAlign="center"
        _hover={{
          transform: "translateY(-1px)",
          backgroundColor: primary ? "brand.softOrange" : "brand.lightGrey",
        }}
      >
        <IconButton
          aria-label={label}
          color={primary ? "brand.darkRed" : "brand.warmBlack"}
          icon={icon}
          _hover={{ backgroundColor: "transparent" }}
          backgroundColor="transparent"
        />
        {displayLabel && <Text fontSize={12} mt={-1}>{label.toLowerCase()}</Text>}
      </Link>
    </NextLink>
  );
}
