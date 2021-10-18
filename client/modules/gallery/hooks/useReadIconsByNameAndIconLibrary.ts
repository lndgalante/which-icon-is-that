import { useQuery } from "react-query";

// common
import { api } from "@modules/common/utils/api";
import { IconsFoundResponse } from "@modules/common/utils/types";

// fetcher
const getIconsByIconNameAndIconLibrary = ({ queryKey }): Promise<IconsFoundResponse> => {
  const { 2: iconName, 3: iconLibrary = "", 4: viewAllIconLibrary = "" } = queryKey;
  return api.getIconsFindByIconNameAndIconLibrary(viewAllIconLibrary || iconLibrary, iconName);
};

// query hook
export function useReadIconsByNameAndIconLibrary(iconName: string, iconLibrary: string, viewAllIconLibrary: string) {
  return useQuery<IconsFoundResponse, Error>(
    ["icons", "find", iconName, iconLibrary, viewAllIconLibrary],
    getIconsByIconNameAndIconLibrary,
    {
      enabled: Boolean(iconName || viewAllIconLibrary),
    },
  );
}
