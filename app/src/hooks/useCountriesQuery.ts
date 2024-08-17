import { useQuery } from '@tanstack/react-query';

import { fetchCountries } from 'services/countries';

import { Any, DefaultObject } from 'types/common';

import queryKey from 'constants/queryKey';

export const useCountriesQuery = (params?: DefaultObject) => {
  const countriesQuery = useQuery({
    queryKey: [queryKey.countries],
    queryFn: ({ signal }: Any) => fetchCountries(params, signal),
    enabled: !!params,
  });

  return countriesQuery;
};
