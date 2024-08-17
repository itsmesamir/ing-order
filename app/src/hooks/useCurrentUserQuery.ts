import { useQuery } from '@tanstack/react-query';

import { fetchCurrentUser } from 'services/currentUser';

import { handleError } from 'utils/handleError';

import { User } from 'types/User';

import queryKey from 'constants/queryKey';

export const useCurrentUserQuery = () => {
  const currentUserQuery = useQuery<User>({
    queryKey: [queryKey.currentUser],
    queryFn: ({ signal }) => fetchCurrentUser(signal),
  });

  if (currentUserQuery.isError && currentUserQuery.error) {
    handleError(currentUserQuery.error);
  }

  return currentUserQuery;
};
