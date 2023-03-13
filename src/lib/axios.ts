import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEGOCIO_REST_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.Accept = 'application/json';
  return config;
});

export default instance;
