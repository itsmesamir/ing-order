import { buildUrl } from 'utils/string';
import http from 'utils/http';

import { Any, LeaveCredit } from 'types/common';

import api from 'constants/api';

export async function fetchLeaveCredits(params: Any, signal?: AbortSignal): Promise<LeaveCredit[]> {
  const url = buildUrl(api.leaveCredits);

  const { data } = await http.get(url, { signal, params });
  return data;
}
