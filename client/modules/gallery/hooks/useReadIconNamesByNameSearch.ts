import { useQuery } from "react-query";

// common
import { api } from "@modules/common/utils/api";
import { IconsFindResponse } from "@modules/common/utils/types";

// fetcher
const getIconNames = ({ queryKey }): Promise<IconsFindResponse> => {
  const { 2: name } = queryKey;
  return api.getIconNamesFindByName(name);
};

// query hook
export function useReadIconNamesByNameSearch(name: string) {
  return useQuery<IconsFindResponse, Error>(["icon-names", "find", name], getIconNames, {
    enabled: Boolean(name.length),
  });
}
