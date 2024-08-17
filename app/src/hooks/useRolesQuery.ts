import { useQuery } from '@tanstack/react-query';

import { fetchRoles } from 'services/roles';

import { Any, DefaultObject } from 'types/common';

import paths from 'constants/paths';

export const useRolesQuery = (params?: DefaultObject) => {
  const rolesQuery = useQuery({
    queryKey: [paths.role],
    queryFn: ({ signal }: Any) => fetchRoles(params, signal),
    enabled: !!params,
  });

  return rolesQuery;
};
