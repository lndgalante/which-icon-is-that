

import NextLink from "next/link";
import { Button } from "@chakra-ui/react";

type LinkButtonProps = {
  href: string;
  text: string;
  variant: string;
}

export function LinkButton({ href, variant, text }: LinkButtonProps) {
  return (
    <NextLink passHref href={href}>
      <Button variant={variant}>
        {text}
      </Button>
    </NextLink>
  );
}
