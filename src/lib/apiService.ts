import Router from 'next/router';

import { mutate } from 'swr';

import axios, { AxiosInstance } from 'axios';

import { toast } from 'react-toastify';

import { refresh } from '@/apis/user/refresh';

import Keys from '@/constants/storage_keys';

import Routes from '@/router/routes';

class ApiService {
  public instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_NEGOCIO_REST_API_BASE_URL,
    });

    this._requestInterceptor();

    this._responseInterceptor();
  }

  static redirectOnError = () => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      if (navigator.userAgent.indexOf('Mobi') > 1) {
        Router.replace(`/${Routes.EntryMobile}`);
      } else {
        Router.replace(`/`);
      }
    }
  };

  private _requestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
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
  };

  private _responseInterceptor = () => {
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { config, response } = error;
        if (response?.status === 500 && typeof window !== 'undefined') {
          toast.error('문제가 발생했습니다. 잠시 뒤 다시 시도해 주세요.');
          ApiService.redirectOnError();
        }

        if (response?.status === 401 && !config._retry) {
          await this.handleTokenRefresh(config);
        }

        return Promise.reject(error);
      },
    );
  };

  private async handleTokenRefresh(config: any) {
    try {
      config._retry = true;
      const item = localStorage.getItem(Keys.REFRESH_TOKEN);

      if (item) {
        const refreshRes = await refresh({ token: JSON.parse(item) });

        if (refreshRes?.access_token) {
          localStorage.setItem(Keys.ACCESS_TOKEN, JSON.stringify(refreshRes.access_token));

          localStorage.setItem(Keys.REFRESH_TOKEN, JSON.stringify(refreshRes.refresh_token));

          switch (config.method.toLowerCase()) {
            case 'get':
              return this.instance.get(config.url, config);
            case 'post':
              return this.instance.post(config.url, config.data, config);

            default:
              return this.instance.request(config);
          }
        } else {
          localStorage.removeItem(Keys.ACCESS_TOKEN);

          localStorage.removeItem(Keys.REFRESH_TOKEN);

          mutate(() => true, undefined);
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ApiService;
