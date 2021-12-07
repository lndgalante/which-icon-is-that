import { useQuery } from "react-query";

// utils
import { api } from "@modules/common/utils/api";

// types
import { RelatedIconsResponse } from "@modules/common/utils/types";

// fetcher
const getRelatedIcons = ({ queryKey }) => {
  const { 1: hash } = queryKey;
  return api.getNotFoundSimilarIcons(hash);
};

// query hook
export function useReadRelatedIcons(hash: string) {
  return useQuery<RelatedIconsResponse, Error>(["not-found", hash], getRelatedIcons, {
    enabled: Boolean(hash),
  });
}
