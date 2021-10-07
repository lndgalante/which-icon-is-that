import { Icon, IconProps } from "@chakra-ui/react";

export function Bootstrap(props: IconProps) {
  return (
    <Icon width={46} height={37} fill="none" viewBox="0 0 46 37" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#prefix__clip0)">
        <path
          d="M4.993 5.167C4.908 2.717 6.818.46 9.401.46h26.463c2.583 0 4.493 2.259 4.408 4.708-.082 2.354.024 5.402.792 7.887.77 2.493 2.07 4.07 4.198 4.272v2.296c-2.128.203-3.427 1.778-4.198 4.272-.768 2.485-.874 5.533-.792 7.887.085 2.45-1.825 4.708-4.408 4.708H9.401c-2.583 0-4.493-2.259-4.408-4.708.082-2.354-.024-5.402-.793-7.887-.77-2.494-2.072-4.07-4.2-4.272v-2.296c2.128-.203 3.43-1.779 4.2-4.272.769-2.485.875-5.533.793-7.887z"
          fill="url(#prefix__paint0_linear)"
        />
        <g filter="url(#prefix__filter0_d)">
          <path
            d="M23.612 28.051c4.181 0 6.7-2.045 6.7-5.418 0-2.55-1.797-4.396-4.466-4.688v-.106c1.96-.319 3.5-2.138 3.5-4.17 0-2.895-2.288-4.781-5.775-4.781h-7.844V28.05h7.885zm-4.835-16.733h4.059c2.206 0 3.46.983 3.46 2.762 0 1.9-1.458 2.962-4.1 2.962h-3.419v-5.724zm0 14.303v-6.308h4.032c2.887 0 4.385 1.062 4.385 3.134s-1.457 3.174-4.208 3.174h-4.209z"
            fill="url(#prefix__paint1_linear)"
          />
          <path
            d="M23.612 28.051c4.181 0 6.7-2.045 6.7-5.418 0-2.55-1.797-4.396-4.466-4.688v-.106c1.96-.319 3.5-2.138 3.5-4.17 0-2.895-2.288-4.781-5.775-4.781h-7.844V28.05h7.885zm-4.835-16.733h4.059c2.206 0 3.46.983 3.46 2.762 0 1.9-1.458 2.962-4.1 2.962h-3.419v-5.724zm0 14.303v-6.308h4.032c2.887 0 4.385 1.062 4.385 3.134s-1.457 3.174-4.208 3.174h-4.209z"
            stroke="#fff"
            strokeWidth={0.871}
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={6.726}
          y1={1.412}
          x2={46.245}
          y2={32.815}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AFAFAF" />
          <stop offset={1} stopColor="#797979" />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear"
          x1={17.106}
          y1={10.149}
          x2={25.933}
          y2={25.093}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#CFCFCF" />
        </linearGradient>
        <clipPath id="prefix__clip0">
          <path fill="#fff" transform="translate(0 .459)" d="M0 0h45.262v36.031H0z" />
        </clipPath>
        <filter
          id="prefix__filter0_d"
          x={1.36}
          y={-1.995}
          width={43.318}
          height={47.895}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy={3.483} />
          <feGaussianBlur stdDeviation={6.965} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </Icon>
  );
}
