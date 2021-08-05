import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      ".chakra-modal__content-container": {
        backdropFilter: "blur(6px)",
      },
    },
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
    },
  },
  components: {
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
      baseStyle: { _focus: { boxShadow: "0 0 0 3px #F4D0C0" } },
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
      baseStyle: { _focus: { boxShadow: "0 0 0 3px #F4D0C0" } },
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
          fontSize: { base: "sm", md: "md" },
          color: "brand.white",
          backgroundColor: "brand.lightRed",
        },
        "brand.outline": {
          borderWidth: 2,
          borderRadius: 8,
          color: "brand.warmBlack",
          fontSize: { base: "sm", md: "md" },
          backgroundColor: "transparent",
          borderColor: "brand.warmBlack",
          opacity: 0.8,
          _hover: { opacity: 1 },
        },
      },
    },
  },
});
