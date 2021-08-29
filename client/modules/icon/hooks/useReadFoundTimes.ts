import { useQuery } from "react-query";

// common
import { api } from "@modules/common/utils/api";
import { IconFoundResponse } from "@modules/common/utils/types";

// fetcher
const getFoundTimes = ({ queryKey }): Promise<IconFoundResponse> => {
  const { 2: hash } = queryKey;
  return api.getIconFoundTimes(hash);
};

// query hook
export function useReadFoundTimes(hash: string) {
  return useQuery<IconFoundResponse, Error>(["icon", "found-times", hash], getFoundTimes);
}
