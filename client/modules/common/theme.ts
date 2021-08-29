import { theme as chakraTheme, extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      ".chakra-modal__content-container": {
        backdropFilter: "blur(6px)",
      },
    },
  },
  shadows: {
    1: "0px 2px 4px -2px rgba(32, 29, 29, 0.12), 0px 4px 4px -2px rgba(32, 29, 29, 0.08)",
    2: "0px 4px 6px -4px rgba(32, 29, 29, 0.12), 0px 8px 8px -4px rgba(32, 29, 29, 0.08)",
    3: "0px 6px 8px -6px rgba(32, 29, 29, 0.12), 0px 8px 16px -6px rgba(32, 29, 29, 0.08)",
    4: "0px 6px 12px -6px rgba(32, 29, 29, 0.12), 0px 8px 24px -4px rgba(32, 29, 29, 0.08)",
    5: "0px 6px 14px -6px rgba(32, 29, 29, 0.12), 0px 10px 32px -4px rgba(32, 29, 29, 0.1)",
    6: "0px 8px 18px -6px rgba(181, 167, 167, 0.12), 0px 12px 42px -4px rgba(181, 167, 167, 0.12)",
    7: "0px 8px 22px -6px rgba(32, 29, 29, 0.12), 0px 14px 64px -4px rgba(32, 29, 29, 0.12)",
    8: "0px 8px 28px -6px rgba(129, 49, 49, 0.12), 0px 18px 88px -4px rgba(129, 49, 49, 0.12)",
    outline: "0 0 0 3px #F4D0C0",
  },
  fonts: {
    ...chakraTheme.fonts,
    body: `"Ansage", sans-serif`,
    heading: `"Ansage", sans-serif`,
  },
  colors: {
    brand: {
      black: "#000000",
      warmBlack: "#201D1D",
      text: "#333333",
      darkRed: "#813131",
      lightRed: "#C95454",
      orange: "#E95848",
      softOrange: "#F4D0C0",
      lightOrange: "#FFF4EF",
      grey: "#B5A7A7",
      softGrey: "#E8E8E8",
      lightGrey: "#FDFCFC",
      white: "#FFFFFF",
      lightOrangeModal: "rgba(255, 244, 239, 0.8)",
      blue: "#1C77FF",
    },
  },
  components: {
    Input: {
      baseStyle: {
        borderRadius: 8,
      },
    },
    TextArea: {
      baseStyle: {
        borderRadius: 8,
      },
    },
    Text: {
      variants: {
        "brand.underline": {
          fontWeight: 500,
          textDecoration: "underline",
          transition: "all 400ms ease-in-out",
          _hover: {
            opacity: 0.7,
          },
        },
      },
    },
    Link: {
      variants: {
        "brand.underline": {
          fontWeight: 500,
          textDecoration: "underline",
          transition: "all 400ms ease-in-out",
          _hover: {
            opacity: 0.7,
          },
        },
      },
    },
    Button: {
      baseStyle: { fontWeight: 600 },
      variants: {
        "brand.solid": {
          borderWidth: 1,
          borderRadius: 8,
          fontSize: { base: "sm", md: "md" },
          color: "brand.white",
          backgroundColor: "brand.warmBlack",
          _hover: {
            color: "brand.white",
            backgroundColor: "brand.lightRed",
          },
        },
        "brand.solidRed": {
          borderWidth: 1,
          borderRadius: 8,
          color: "brand.white",
          fontSize: { base: "sm", md: "md" },
          backgroundColor: "brand.lightRed",
          opacity: 1,
          _hover: { opacity: 0.8 },
        },
        "brand.disabled": {
          borderWidth: 1,
          borderRadius: 8,
          color: "brand.white",
          fontSize: { base: "sm", md: "md" },
          backgroundColor: "brand.grey",
          opacity: 1,
          _hover: { opacity: 0.8 },
        },
        "brand.ghost": {
          borderWidth: 1,
          borderRadius: 8,
          color: "brand.warmBlack",
          borderColor: "transparent",
          fontSize: { base: "sm", md: "md" },
          backgroundColor: "brand.lightGrey",
          opacity: 1,
          _hover: { opacity: 0.8 },
        },
        "brand.outline": {
          borderWidth: 2,
          borderRadius: 8,
          color: "brand.warmBlack",
          fontWeight: 500,
          fontSize: { base: "sm", md: "md" },
          backgroundColor: "transparent",
          borderColor: "brand.warmBlack",
          opacity: 1,
          _hover: { opacity: 0.8 },
        },
      },
    },
  },
});
