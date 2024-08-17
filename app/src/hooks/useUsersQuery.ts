import { useQuery } from '@tanstack/react-query';

import { fetchUsers } from 'services/users';

import { Any, DefaultObject } from 'types/common';

import queryKey from 'constants/queryKey';

export const useUsersQuery = (params?: DefaultObject) => {
  const usersQuery = useQuery({
    queryKey: [queryKey.users],
    queryFn: ({ signal }: Any) => fetchUsers(params, signal),
    enabled: !!params,
  });

  return usersQuery;
};
