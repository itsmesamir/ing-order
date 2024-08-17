import { useQuery } from '@tanstack/react-query';

import { fetchMenus } from 'services/menus';

import { Any, DefaultObject } from 'types/common';

import queryKey from 'constants/queryKey';

export const useMenusQuery = (params?: DefaultObject, enabled?: boolean) => {
  const menusQuery = useQuery({
    queryKey: [queryKey.menus, params],
    queryFn: ({ signal }: Any) => fetchMenus(params, signal),
    enabled: enabled && !!params,
  });

  return menusQuery;
};
