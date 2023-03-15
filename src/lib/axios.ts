import Keys from '@/constants/storage_keys';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEGOCIO_REST_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
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

export default instance;
