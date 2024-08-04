import { useQuery } from '@tanstack/react-query';

import { fetchReviews } from 'services/reviews';

import { Any, DefaultObject } from 'types/common';

import queryKey from 'constants/queryKey';

export const useReviewsQuery = (params?: DefaultObject, enabled?: boolean) => {
  const menusQuery = useQuery({
    queryKey: [queryKey.menus, params],
    queryFn: ({ signal }: Any) => fetchReviews(params, signal),
    enabled: enabled && !!params,
  });

  return menusQuery;
};
