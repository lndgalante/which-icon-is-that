import { As } from "@chakra-ui/react";

// icons
import * as Heroicons from "react-icons/hi";
import * as FeatherIcons from "react-icons/fi";

export function getIconComponent(packName: string, reactIconName: string): As {
  if (packName === "feather") {
    return FeatherIcons[reactIconName] as As;
  }

  if (packName === "heroicons") {
    return Heroicons[reactIconName] as As;
  }
}
