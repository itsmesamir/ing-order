import { useQuery } from '@tanstack/react-query';

import { fetchLeaveRequests } from 'services/leaveRequest';

import { Any, DefaultObject } from 'types/common';

import queryKey from 'constants/queryKey';

export const useLeaveRequestsQuery = (params?: DefaultObject) => {
  const leaveRequestsQuery = useQuery({
    queryKey: [queryKey.leaveRequests],
    queryFn: ({ signal }: Any) => fetchLeaveRequests(params, signal),
    enabled: !!params,
  });

  return leaveRequestsQuery;
};
