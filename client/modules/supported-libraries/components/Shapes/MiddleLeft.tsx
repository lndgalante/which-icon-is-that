import { Icon, IconProps } from "@chakra-ui/react";

export function MiddleLeft(props: IconProps) {
  return (
    <Icon width={90} height={60} viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M33 60c14.167-2.45 25-14.958 25-30S47.167 2.45 33 0v60z" fill="#C95454" />
      <path d="M65 60c14.167-2.45 25-14.958 25-30S79.167 2.45 65 0v60z" fill="#F4D0C0" />
      <path d="M0 60c14.733-2.45 26-14.958 26-30S14.733 2.45 0 0v60z" fill="#E95848" />
    </Icon>
  );
}
