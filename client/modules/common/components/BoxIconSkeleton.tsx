import { Skeleton } from "@chakra-ui/react";

type BoxIconSkeletonProps = {
  primary?: boolean;
  withShadow?: boolean;
  displayLabel?: boolean;
};

export function BoxIconSkeleton({ primary, displayLabel, withShadow }: BoxIconSkeletonProps) {
  return (
    <Skeleton
      minWidth={{ base: displayLabel ? "4.38rem" : "auto", md: displayLabel ? 20 : "auto" }}
      height={{ base: displayLabel ? "4.38rem" : "auto", md: displayLabel ? 20 : "auto" }}
      backgroundColor={primary ? "brand.lightOrange" : "brand.lightGrey"}
      boxShadow={withShadow ? "sm" : null}
      transition="all 400ms ease-in-out"
      borderRadius={4}
      p={2}
      textAlign="center"
    />
  );
}
