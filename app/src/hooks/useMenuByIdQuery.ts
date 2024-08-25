import { useQuery } from '@tanstack/react-query';

import { fetchMenuById, fetchMenus } from 'services/menus';

import { Any } from 'types/common';

import queryKey from 'constants/queryKey';

export const useMenuByIdQuery = (id: number | undefined) => {
  const menusQuery = useQuery({
    queryKey: [queryKey.menus, id],
    queryFn: ({ signal }: Any) => fetchMenuById(id as number, signal),
    enabled: id !== undefined,
  });

  return menusQuery;
};
