import { Icon, IconProps } from "@chakra-ui/react";

export function Feather(props: IconProps) {
  return (
    <Icon width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M33.25 20.487A9.862 9.862 0 1019.302 6.54L8.214 17.63v13.963h13.963L33.25 20.488zM26.284 13.523L3.286 36.52M28.749 25.022H14.785"
        stroke="#000"
        strokeWidth={3.483}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
