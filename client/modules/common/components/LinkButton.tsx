import NextLink from "next/link";
import { Button } from "@chakra-ui/react";

type Props = {
  href: string;
  text: string;
  variant: string;
};

export function LinkButton({ href, variant, text }: Props) {
  return (
    <NextLink passHref href={href}>
      <Button variant={variant}>{text}</Button>
    </NextLink>
  );
}
