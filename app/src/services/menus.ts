import { buildUrl } from 'utils/string';
import http from 'utils/http';
import { interpolate } from 'utils/interpolate';

import { Any, MenuCategory, MenuItem, MenuUnit } from 'types/common';

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

export async function createMenuItem(body: Any): Promise<MenuItem[]> {
  const url = buildUrl(api.menus);

  const { data } = await http.post(url, body);

  return data;
}

export async function updateMenuById(
  id: number,
  body: Any,
  signal?: AbortSignal
): Promise<MenuItem> {
  const url = buildUrl(api.menus, id);

  const { data } = await http.put(url, body, { signal });

  return data;
}

export async function fetchMenuCategories(
  params: Any,
  signal?: AbortSignal
): Promise<MenuCategory[]> {
  const url = buildUrl(api.menuCategories);

  const { data } = await http.get(url, { signal, params });

  return data;
}

export async function createMenuCategories(body: Any): Promise<MenuCategory[]> {
  const url = buildUrl(api.menuCategories);

  const { data } = await http.post(url, body);

  return data;
}

export async function fetchMenuCategoriesById(
  id: number,
  signal?: AbortSignal
): Promise<MenuCategory> {
  const url = buildUrl(interpolate(api.menuCategoriesById, { id }));

  const { data } = await http.get(url, { signal });

  return data;
}

export async function updateMenuCategories(
  id: number,
  body: Any,
  signal?: AbortSignal
): Promise<MenuCategory[]> {
  const url = buildUrl(api.menuCategories, id);

  const { data } = await http.put(url, body, { signal });

  return data;
}

export async function fetchMenuUnits(params: Any, signal?: AbortSignal): Promise<MenuUnit[]> {
  const url = buildUrl(api.menuUnits);

  const { data } = await http.get(url, { signal, params });

  return data;
}

export async function createMenuUnits(body: Any): Promise<MenuUnit[]> {
  const url = buildUrl(api.menuUnits);

  const { data } = await http.post(url, body);

  return data;
}

export async function fetchMenuUnitById(id: number, signal?: AbortSignal): Promise<MenuUnit> {
  const url = buildUrl(interpolate(api.menuUnitsById, { id }));

  const { data } = await http.get(url, { signal });

  return data;
}

export async function updateMenuUnits(
  id: number,
  body: Any,
  signal?: AbortSignal
): Promise<MenuUnit[]> {
  const url = buildUrl(api.menuUnits, id);

  const { data } = await http.put(url, body, { signal });

  return data;
}
