import { Skeleton } from "@chakra-ui/react";

type Props = {
  primary?: boolean;
  withShadow?: boolean;
  displayLabel?: boolean;
};

export function BoxIconSkeleton({ primary, displayLabel, withShadow }: Props) {
  return (
    <Skeleton
      minWidth={{ base: displayLabel ? "4.38rem" : "auto", md: displayLabel ? 20 : "auto" }}
      height={{ base: displayLabel ? "4.38rem" : "auto", md: displayLabel ? 20 : "auto" }}
      backgroundColor={primary ? "brand.lightOrange" : "brand.lightGrey"}
      boxShadow={withShadow ? "sm" : null}
      transition="all 200ms ease-in-out"
      borderRadius={4}
      p={2}
      textAlign="center"
    />
  );
}
