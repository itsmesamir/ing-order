import { buildUrl } from 'utils/string';
import http from 'utils/http';

import { Any, Role } from 'types/common';

import api from 'constants/api';

export async function fetchRoles(params: Any, signal?: AbortSignal): Promise<Role[]> {
  const url = buildUrl(api.roles);

  const { data } = await http.get(url, { signal, params });
  return data;
}
