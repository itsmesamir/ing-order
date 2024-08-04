import { useQuery } from '@tanstack/react-query';

import { fetchMenuById, fetchMenus } from 'services/menus';

import { Any, DefaultObject } from 'types/common';

import queryKey from 'constants/queryKey';

export const useMenuByIdQuery = (id: number) => {
  const menusQuery = useQuery({
    queryKey: [queryKey.menus, id],
    queryFn: ({ signal }: Any) => fetchMenuById(id, signal),
  });

  return menusQuery;
};
