import { StackProps, As } from "@chakra-ui/react";

// components
import { MotionStack } from "@modules/common/components/MotionStack";

type Props = {
  as?: As;
  withPadding?: boolean;
  stackProps?: StackProps;
  children: React.ReactNode;
};

export function MotionFade({ children, as, withPadding, ...stackProps }: Props) {
  return (
    <MotionStack
      as={as}
      animate="animate"
      initial="initial"
      paddingX={withPadding ? { base: 4, md: 12 } : null}
      variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
      {...stackProps}
    >
      {children}
    </MotionStack>
  );
}
