import { useQuery } from '@tanstack/react-query';

import { fetchDesignations } from 'services/designation';

import { Any, DefaultObject } from 'types/common';

import paths from 'constants/paths';

export const useDesignationsQuery = (params?: DefaultObject) => {
  const designationsQuery = useQuery({
    queryKey: [paths.designation],
    queryFn: ({ signal }: Any) => fetchDesignations(params, signal),
    enabled: !!params,
  });

  return designationsQuery;
};
