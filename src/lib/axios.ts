import { refresh } from '@/apis/user/refresh';
import Keys from '@/constants/storage_keys';
import instance from 'axios';
import { mutate } from 'swr';

const axios = instance.create({
  baseURL: process.env.NEXT_PUBLIC_NEGOCIO_REST_API_BASE_URL,
});

axios.interceptors.request.use((config) => {
  config.headers.Accept = 'application/json';
  if (typeof localStorage !== 'undefined') {
    const item = localStorage.getItem(Keys.ACCESS_TOKEN);
    const accessToken = item ? JSON.parse(item) : '';
    if (accessToken !== '') {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config: originalRequest, response } = error;
    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const item = localStorage.getItem(Keys.REFRESH_TOKEN);
      if (item) {
        const refreshRes = await refresh({ token: JSON.parse(item) });
        if (refreshRes?.access_token) {
          localStorage.setItem(Keys.ACCESS_TOKEN, JSON.stringify(refreshRes.access_token));
          localStorage.setItem(Keys.REFRESH_TOKEN, JSON.stringify(refreshRes.refresh_token));
          return axios(originalRequest);
        }
        localStorage.removeItem(Keys.ACCESS_TOKEN);
        localStorage.removeItem(Keys.REFRESH_TOKEN);
        mutate(() => true, undefined);
      }
    }
    return Promise.reject(error);
  },
);

export default axios;
