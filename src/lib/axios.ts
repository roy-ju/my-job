import Keys from '@/constants/storage_keys';
import instance from 'axios';

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

export default axios;
