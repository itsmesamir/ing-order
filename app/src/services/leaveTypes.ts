import { buildUrl } from 'utils/string';
import http from 'utils/http';

import { Any, LeaveType } from 'types/common';

import api from 'constants/api';

export async function fetchLeaveTypes(params: Any, signal?: AbortSignal): Promise<LeaveType[]> {
  const url = buildUrl(api.leaveTypes);

  const { data } = await http.get(url, { signal, params });
  return data;
}
