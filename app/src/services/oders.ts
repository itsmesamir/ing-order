import { buildUrl } from 'utils/string';
import http from 'utils/http';
import { interpolate } from 'utils/interpolate';

import { Any, Order } from 'types/common';

import api from 'constants/api';

export async function fetchOrders(params: Any, signal?: AbortSignal): Promise<Order[]> {
  const url = buildUrl(api.order.orders);

  const { data } = await http.get(url, { signal, params });

  return data;
}

export async function fetchOrderById(
  id: number,
  params: Any,
  signal?: AbortSignal
): Promise<Order> {
  const url = buildUrl(api.order.orders, id);

  const { data } = await http.get(url, { signal, params });

  return data;
}

export async function updateOrderById(id: number, body: Any, signal?: AbortSignal) {
  // ): Promise<Order[]> {
  const url = buildUrl(api.order.orders, id);

  const { data } = await http.put(url, body, { signal });

  return data;
}

export async function updateOrderStatusById(id: number, body: Any, signal?: AbortSignal) {
  const url = buildUrl(interpolate(api.order.orderStatusById, { id }));

  const { data } = await http.put(url, body, { signal });

  return data;
}

// post order
export async function createOrder(body: Any, signal?: AbortSignal): Promise<Order> {
  const url = buildUrl(api.order.orders);

  const { data } = await http.post(url, body, { signal });

  return data;
}
