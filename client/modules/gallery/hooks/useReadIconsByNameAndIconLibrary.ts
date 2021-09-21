import { useQuery } from "react-query";

// common
import { api } from "@modules/common/utils/api";
import { IconsFoundResponse } from "@modules/common/utils/types";

// fetcher
const getIconsByIconNameAndIconLibrary = ({ queryKey }): Promise<IconsFoundResponse> => {
  const { 2: iconName, 3: iconLibrary = "" } = queryKey;
  return api.getIconsFindByIconNameAndIconLibrary(iconLibrary, iconName);
};

// query hook
export function useReadIconsByNameAndIconLibrary(iconName: string, iconLibrary: string) {
  return useQuery<IconsFoundResponse, Error>(
    ["icons", "find", iconName, iconLibrary],
    getIconsByIconNameAndIconLibrary,
    {
      enabled: Boolean(iconName || iconLibrary !== "all"),
    },
  );
}
