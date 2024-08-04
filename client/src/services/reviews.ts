import http from 'utils/http';

import { Any, MenuItem } from 'types/common';

import api from 'constants/api';
import { MenuReview } from 'interface/review';

export async function fetchReviews(params: Any, signal?: AbortSignal): Promise<Array<MenuReview>> {
  const url = api.reviews;

  const { data } = await http.get(url, { signal, params });

  return data;
}
