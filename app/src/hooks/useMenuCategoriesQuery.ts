import { useQuery } from '@tanstack/react-query';

import { fetchMenuCategories } from 'services/menus';

import { Any, DefaultObject } from 'types/common';

import queryKey from 'constants/queryKey';

export const useMenuCategoriesQuery = (params?: DefaultObject) => {
  const menusCategoriesQuery = useQuery({
    queryKey: [queryKey.menuCategories],
    queryFn: ({ signal }: Any) => fetchMenuCategories(params, signal),
    enabled: !!params,
  });

  return menusCategoriesQuery;
};
