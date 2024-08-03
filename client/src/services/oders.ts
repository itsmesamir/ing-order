import { buildUrl } from 'utils/string';
import http from 'utils/http';

import { Any, Order, OrderItem } from 'types/common';

import api from 'constants/api';

export async function fetchOrders(params: Any, signal?: AbortSignal): Promise<Order[]> {
  const url = buildUrl(api.orders);

  const { data } = await http.get(url, { signal, params });

  return data;
}

export async function fetchOrderById(
  id: number,
  params: Any,
  signal?: AbortSignal
): Promise<Order> {
  const url = buildUrl(api.orders, id);

  const { data } = await http.get(url, { signal, params });

  return data;
}

export async function updateOrderById(
  id: number,
  body: Any,
  signal?: AbortSignal
): Promise<Order[]> {
  const url = buildUrl(api.orders, id);

  const { data } = await http.put(url, body, { signal });

  return data;
}
