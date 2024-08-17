import { useQuery } from '@tanstack/react-query';

import { fetchLeaveCredits } from 'services/leaveCredits';

import { Any, DefaultObject } from 'types/common';

import queryKey from 'constants/queryKey';

export const useLeaveCreditsQuery = (params: DefaultObject = {}) => {
  const leaveCreditsQuery = useQuery({
    queryKey: [queryKey.leaveCredits],
    queryFn: ({ signal }: Any) => fetchLeaveCredits(params, signal),
    enabled: !!params,
  });

  return leaveCreditsQuery;
};
