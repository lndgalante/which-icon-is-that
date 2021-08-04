import NextLink from "next/link";
import { IconButton, Link, IconButtonProps } from "@chakra-ui/react";

type BoxIconProps = {
  icon: IconButtonProps["icon"];
  label: string;
  href: string;
  bgColor: string;
  withShadow?: boolean;
}

export function BoxIcon({ icon, label, href, bgColor, withShadow }: BoxIconProps) {
  return (
    <NextLink passHref href={href}>
      <Link>
        <IconButton
          _hover={{
            transform: "translateY(-1px)",
            backgroundColor: "brand.softOrange",
          }}
          boxShadow={withShadow ? "sm" : null}
          aria-label={label}
          backgroundColor={bgColor}
          color="brand.darkRed"
          icon={icon}
        />
      </Link>
    </NextLink>
  );
}
