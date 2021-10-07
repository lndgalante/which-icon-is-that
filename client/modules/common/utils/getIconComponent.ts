import { As } from "@chakra-ui/react";

// icons
import * as Heroicons from "react-icons/hi";
import * as FeatherIcons from "react-icons/fi";
import * as BootstrapIcons from "react-icons/bs";
import * as AntdesignIcons from "react-icons/ai";
import * as BoxIcons from "react-icons/bi";

export function getIconComponent(packName: string, reactIconName: string): As {
  if (packName === "bootstrap") {
    return BootstrapIcons[reactIconName] as As;
  }

  if (packName === "feather") {
    return FeatherIcons[reactIconName] as As;
  }

  if (packName === "heroicons") {
    return Heroicons[reactIconName] as As;
  }

  if (packName === "antdesign") {
    return AntdesignIcons[reactIconName] as As;
  }

  if (packName === "boxicons") {
    return BoxIcons[reactIconName] as As;
  }
}
