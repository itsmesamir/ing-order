import { useQuery } from '@tanstack/react-query';

import { fetchCafes } from 'services/cafes';

import { Any, DefaultObject } from 'types/common';

import queryKey from 'constants/queryKey';

export const useCafesQuery = (params?: DefaultObject) => {
  const cafesQuery = useQuery({
    queryKey: [queryKey.cafes],
    queryFn: ({ signal }: Any) => fetchCafes(params, signal),
    enabled: !!params,
  });

  return cafesQuery;
};
