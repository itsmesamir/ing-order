import { buildUrl } from 'utils/string';
import http from 'utils/http';

import { Any } from 'types/common';
import { LeaveRequest } from 'types/Leave';

import api from 'constants/api';

export async function fetchLeaveRequests(
  params: Any,
  signal?: AbortSignal
): Promise<LeaveRequest[]> {
  const url = buildUrl(api.leaveRequests);

  const { data } = await http.get(url, { signal, params });

  return data;
}

export const createLeaveRequest = async (data: Partial<LeaveRequest>) => {
  const url = buildUrl(api.baseUrl, api.leaveRequests);

  const response = await http.post(url, data);

  return response.data;
};
