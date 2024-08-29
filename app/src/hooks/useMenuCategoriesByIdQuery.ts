import { useQuery } from '@tanstack/react-query';

import { fetchMenuCategoriesById } from 'services/menus';

import { Any } from 'types/common';

import queryKey from 'constants/queryKey';

export const useMenuCategoriesByIdQuery = (id: number | undefined) => {
  const menusCategoriesQuery = useQuery({
    queryKey: [queryKey.menus, id],
    queryFn: ({ signal }: Any) => fetchMenuCategoriesById(id as number, signal),
    enabled: id !== undefined,
  });

  return menusCategoriesQuery;
};
