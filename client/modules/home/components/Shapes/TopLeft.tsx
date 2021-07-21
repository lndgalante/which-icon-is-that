import React from "react"
import { Icon } from "@chakra-ui/react"

export function TopLeft(props) {
  return (
    <Icon
      width={87}
      height={90}
      viewBox="0 0 87 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0)">
        <path
          d="M49.174 90C70.609 86.324 87 67.563 87 45S70.609 3.676 49.174 0v90z"
          fill="#F4D0C0"
        />
        <path
          d="M0 90c21.435-3.676 37.826-22.437 37.826-45S21.435 3.676 0 0v90z"
          fill="#E95848"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path
            fill="#fff"
            transform="rotate(-180 43.5 45)"
            d="M0 0h87v90H0z"
          />
        </clipPath>
      </defs>
    </Icon>
  )
}
