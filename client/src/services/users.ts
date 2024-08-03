import { buildUrl } from 'utils/string';
import http from 'utils/http';

import { Any } from 'types/common';
import { User } from 'types/User';

import api from 'constants/api';

export async function fetchUsers(params: Any, signal?: AbortSignal): Promise<User[]> {
  const url = buildUrl(api.users);

  const { data } = await http.get(url, { signal, params });

  return data;
}

export async function fetchUserById(id: number, params: Any, signal?: AbortSignal): Promise<User> {
  const url = buildUrl(api.users, id);

  const { data } = await http.get(url, { signal, params });

  return data;
}

export async function updateUserById(id: number, body: Any, signal?: AbortSignal): Promise<User[]> {
  const url = buildUrl(api.users, id);

  const { data } = await http.put(url, body, { signal });

  return data;
}
