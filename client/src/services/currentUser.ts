import { buildUrl } from 'utils/string';
import http from 'utils/http';

import { User } from 'types/User';

import api from 'constants/api';

export async function fetchCurrentUser(signal?: AbortSignal): Promise<User> {
  const url = buildUrl(api.currentUser);

  const { data } = await http.get(url, { signal });
  return data;
}
