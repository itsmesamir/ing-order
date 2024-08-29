import { useQuery } from '@tanstack/react-query';

import { fetchMenuUnitById } from 'services/menus';

import { Any } from 'types/common';

import queryKey from 'constants/queryKey';

export const useMenuUnitsByIdQuery = (id: number | undefined) => {
  const menusUnitsQuery = useQuery({
    queryKey: [queryKey.menus, id],
    queryFn: ({ signal }: Any) => fetchMenuUnitById(id as number, signal),
    enabled: id !== undefined,
  });

  return menusUnitsQuery;
};
