import { Icon, IconProps } from "@chakra-ui/react";

export function Boxicons(props: IconProps) {
  return (
    <Icon width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.618 10.695A3.591 3.591 0 003 12.666v14.911c0 1.029.574 2.014 1.5 2.528l13.898 7.67c1.147.643 2.559-.171 2.559-1.456V20.335l-17.34-9.641z"
        fill="#FF328B"
      />
      <path
        d="M20.956 20.336l15.09-7.37c1.234-.6 1.279-2.271.087-2.914l-13.809-7.67c-.882-.471-1.941-.514-2.824-.086L5.117 9.366c-.617.3-1.147.772-1.544 1.329l17.383 9.64z"
        fill="#2EDBE3"
      />
    </Icon>
  );
}
