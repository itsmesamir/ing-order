import { useQuery } from '@tanstack/react-query';

import { fetchLeaves } from 'services/leave';

import { Any, DefaultObject } from 'types/common';

import paths from 'constants/paths';

export const useLeaveQuery = (params: DefaultObject = {}) => {
  const leaveQuery = useQuery({
    queryKey: [paths.leave],
    queryFn: ({ signal }: Any) => fetchLeaves(params, signal),
    enabled: !!params,
  });

  return leaveQuery;
};
