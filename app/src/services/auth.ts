import { buildUrl } from 'utils/string';
// eslint-disable-next-line import/no-cycle
import http from 'utils/http';

import { Any, DefaultObject } from 'types/common';

import api from 'constants/api';

export const signUp = async (data: Partial<Any>) => {
  const response = await http.post(api.signUp, data);

  return response.data;
};

export const signIn = async (data: { email: string; password: string }) => {
  const response = await http.post(api.signIn, data);

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await http.get(buildUrl(api.baseUrl, api.currentUser));

  return response.data;
};

export const logout = async () => {
  const response = await http.get(buildUrl(api.baseUrl, api.logout));

  return response?.data;
};

export const fetchUsers = async (params: DefaultObject = {}) => {
  const response = await http.get(buildUrl(api.baseUrl, api.users), { params });

  return response.data;
};
