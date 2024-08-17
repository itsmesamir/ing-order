import { useQuery } from '@tanstack/react-query';

import { fetchLeaveTypes } from 'services/leaveTypes';

import { Any, DefaultObject } from 'types/common';

import queryKey from 'constants/queryKey';

export const useLeaveTypesQuery = (params?: DefaultObject) => {
  const leaveTypesQuery = useQuery({
    queryKey: [queryKey.leaveTypes],
    queryFn: ({ signal }: Any) => fetchLeaveTypes(params, signal),
    enabled: !!params,
  });

  return leaveTypesQuery;
};
