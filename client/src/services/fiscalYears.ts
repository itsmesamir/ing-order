import { buildUrl } from 'utils/string';
import http from 'utils/http';

import { Any, FiscalYear } from 'types/common';

import api from 'constants/api';

export async function fetchFiscalYears(params: Any, signal?: AbortSignal): Promise<FiscalYear[]> {
  const url = buildUrl(api.fiscalYears);

  const { data } = await http.get(url, { signal, params });
  return data;
}
