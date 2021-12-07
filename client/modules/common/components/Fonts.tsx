import { Global } from "@emotion/react";

export function Fonts() {
  return (
    <Global
      styles={`
        @font-face {
          font-family: 'Ansage';
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url('/fonts/ansage/Ansage-Regular.woff2') format('woff2');
        }
        @font-face {
          font-family: 'Ansage';
          font-style: medium;
          font-weight: 600;
          font-display: swap;
          src: url('/fonts/ansage/Ansage-Medium.woff2') format('woff2');
        }
        @font-face {
          font-family: 'Ansage';
          font-style: bold;
          font-weight: 700;
          font-display: swap;
          src: url('/fonts/ansage/Ansage-Bold.woff2') format('woff2');
        }
        @font-face {
          font-family: 'Ansage';
          font-style: bolder;
          font-weight: 800;
          font-display: swap;
          src: url('/fonts/ansage/Ansage-XBold.woff2') format('woff2');
        }
      `}
    />
  );
}
