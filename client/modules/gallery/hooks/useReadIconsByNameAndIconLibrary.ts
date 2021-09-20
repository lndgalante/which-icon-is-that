import { useQuery } from "react-query";

// common
import { api } from "@modules/common/utils/api";
import { IconsFindResponse } from "@modules/common/utils/types";

// fetcher
const getIconsByIconNameAndIconLibrary = ({ queryKey }): Promise<IconsFindResponse> => {
  const { 2: iconName, 3: iconLibrary = "" } = queryKey;
  return api.getIconsFindByIconNameAndIconLibrary(iconName, iconLibrary);
};

// query hook
export function useReadIconsByNameAndIconLibrary(iconName: string, iconLibrary: string) {
  return useQuery<IconsFindResponse, Error>(
    ["icons", "find", iconName, iconLibrary],
    getIconsByIconNameAndIconLibrary,
    {
      enabled: Boolean(iconName || iconLibrary),
    },
  );
}
