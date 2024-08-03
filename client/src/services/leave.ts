/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { buildUrl } from 'utils/string';
import http from 'utils/http';
import { interpolate } from 'utils/interpolate';

import { Leave, LeaveStatusEnum } from 'types/Leave';

import api from 'constants/api';

export async function fetchLeaves(params: any, signal?: AbortSignal): Promise<Leave[]> {
  const url = buildUrl(api.leaveRequests);

  const { data } = await http.get(url, { signal, params });

  return data;
}

export const createLeave = async (data: Leave) => {
  const response = await http.post(api.leave, data);

  return response.data;
};

export const updateLeave = async (data: Leave) => {
  const response = await axios.post(api.leave, data);

  return response.data;
};

export const updateLeaveStatus = async (id: number, data: { status: LeaveStatusEnum }) => {
  const url = buildUrl(api.baseUrl, interpolate(api.updateLeaveStatus, { id }));

  const response = await http.post(url, data);

  return response.data;
};
