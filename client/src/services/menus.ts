import { buildUrl } from 'utils/string';
import http from 'utils/http';
import { interpolate } from 'utils/interpolate';

import { Any, MenuItem } from 'types/common';

import api from 'constants/api';

export async function fetchMenus(params: Any, signal?: AbortSignal): Promise<MenuItem[]> {
  const url = buildUrl(api.menus);

  const { data } = await http.get(url, { signal, params });

  return data;
}

export async function fetchMenuById(id: number, signal?: AbortSignal): Promise<MenuItem> {
  const url = buildUrl(interpolate(api.menuItemById, { id }));

  const { data } = await http.get(url, { signal });

  return data;
}

export async function updateMenuById(
  id: number,
  body: Any,
  signal?: AbortSignal
): Promise<MenuItem[]> {
  const url = buildUrl(api.menus, id);

  const { data } = await http.put(url, body, { signal });

  return data;
}

export async function fetchMenuCategories(params: Any, signal?: AbortSignal): Promise<MenuItem[]> {
  const url = buildUrl(api.menuCategories);

  const { data } = await http.get(url, { signal, params });

  return data;
}
