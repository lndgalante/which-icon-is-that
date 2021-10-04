import { Icon, IconProps } from "@chakra-ui/react";

export function Feather(props: IconProps) {
  return (
    <Icon width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M29.093 17.927A8.63 8.63 0 1016.89 5.723l-9.703 9.702v12.218h12.218l9.688-9.716zM22.999 11.832L2.875 31.956M25.155 21.894H12.937"
        stroke="#797979"
        strokeWidth={3.483}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
