import { useQuery } from '@tanstack/react-query';

import { fetchMenuUnits } from 'services/menus';

import { Any, DefaultObject } from 'types/common';

import queryKey from 'constants/queryKey';

export const useMenuUnitsQuery = (params?: DefaultObject) => {
  const menusUnitsQuery = useQuery({
    queryKey: [queryKey.menuUnits],
    queryFn: ({ signal }: Any) => fetchMenuUnits(params, signal),
    enabled: !!params,
  });

  return menusUnitsQuery;
};
