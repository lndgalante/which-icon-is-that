import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
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
    },
  },
  components: {
    Button: {
      variants: {
        "brand.solid": {
          borderWidth: 1,
          borderRadius: 8,
          fontWeight: "bold",
          color: "brand.white",
          borderColor: "brand.warmBlack",
          backgroundColor: "brand.warmBlack",
          _hover: {
            color: "brand.warmBlack",
            backgroundColor: "transparent",
          },
        },
        "brand.outline": {
          color: "brand.warmBlack",
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "brand.warmBlack",
          opacity: 0.8,
          _hover: {
            opacity: 1,
          },
        },
      },
    },
  },
});
