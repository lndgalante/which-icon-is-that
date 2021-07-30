import NextLink from "next/link";
import { IconButton, Link } from "@chakra-ui/react";

export function ExampleIcon({ icon, label, href, bgColor }) {
  return (
    <NextLink passHref href={href}>
      <Link >
        <IconButton
          _hover={{
            transform: "translateY(-1px)",
            backgroundColor: "brand.softOrange",
          }}
          aria-label={label}
          backgroundColor={bgColor}
          color="brand.darkRed"
          icon={icon}
        />
      </Link>
    </NextLink>
  );
}
