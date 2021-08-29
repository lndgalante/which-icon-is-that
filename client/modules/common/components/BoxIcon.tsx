import NextLink from "next/link";
import { IconButton, Link, Text, IconButtonProps } from "@chakra-ui/react";

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
        minWidth={{ base: displayLabel ? "4.38rem" : "auto", md: displayLabel ? 20 : "auto" }}
        height={{ base: displayLabel ? "4.38rem" : "auto", md: displayLabel ? 20 : "auto" }}
        backgroundColor={primary ? "brand.lightOrange" : "brand.lightGrey"}
        boxShadow={withShadow ? "sm" : null}
        transition="all 400ms ease-in-out"
        borderRadius={4}
        textAlign="center"
        _hover={{
          color: "brand.darkRed",
          transform: "translateY(-1px)",
          backgroundColor: primary ? "brand.softOrange" : "brand.lightOrange",
        }}
        className="boxicon-container"
      >
        <IconButton
          aria-label={label}
          color={primary ? "brand.darkRed" : "brand.warmBlack"}
          icon={icon}
          _hover={{ backgroundColor: "transparent" }}
          backgroundColor="transparent"
          sx={{ ".boxicon-container:hover &": { color: "brand.darkRed" } }}
        />
        {displayLabel && (
          <Text fontSize={12} mt={-1}>
            {label.toLowerCase()}
          </Text>
        )}
      </Link>
    </NextLink>
  );
}
