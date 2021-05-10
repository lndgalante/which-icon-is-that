import { useQuery } from 'react-query';

// common
import { api } from '@lib/api';
import { IconFoundResponse } from '@lib/types';

// fetcher
const getFoundTimes = ({ queryKey }): Promise<IconFoundResponse> => {
  const { 2: hash } = queryKey;
  return api.getIconFoundData(hash);
};

// query hook
export function useReadFoundTimes(hash: string) {
  return useQuery<IconFoundResponse, Error>(['icon', 'found-times', hash], getFoundTimes);
}
