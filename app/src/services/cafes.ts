import { buildUrl } from 'utils/string';
import http from 'utils/http';

import { Any, Cafe } from 'types/common';

import api from 'constants/api';

export async function fetchCafes(params: Any, signal?: AbortSignal): Promise<Cafe[]> {
  const url = buildUrl(api.cafes);

  const { data } = await http.get(url, { signal, params });

  return data;
}
