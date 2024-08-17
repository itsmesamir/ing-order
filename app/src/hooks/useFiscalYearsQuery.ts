import { useQuery } from '@tanstack/react-query';

import { fetchFiscalYears } from 'services/fiscalYears';

import { Any, DefaultObject } from 'types/common';

import queryKey from 'constants/queryKey';

export const useFiscalYearsQuery = (params: DefaultObject = {}) => {
  const fiscalYearsQuery = useQuery({
    queryKey: [queryKey.leaveCredits],
    queryFn: ({ signal }: Any) => fetchFiscalYears(params, signal),
    enabled: !!params,
  });

  return fiscalYearsQuery;
};
