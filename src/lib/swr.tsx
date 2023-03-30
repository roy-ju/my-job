import { ReactNode, useMemo } from 'react';
import axios from '@/lib/axios';
import { SWRConfig as Config } from 'swr';
import Keys from '@/constants/storage_keys';

function fetcher(arg: string | [string, any]) {
  if (typeof arg === 'string') {
    return axios.post(arg).then((res) => res.data);
  }
  return axios.post(arg[0], arg[1]).then((res) => res.data);
}

export function authFetcher(arg: string | [string, any]): Promise<any> {
  if (typeof window !== 'undefined' && localStorage.getItem(Keys.ACCESS_TOKEN)) {
    return fetcher(arg);
  }
  return Promise.resolve(null);
}

export default function SWRConfig({ children }: { children?: ReactNode }) {
  const configs = useMemo(
    () => ({
      shouldRetryOnError: false,
      fetcher,
    }),
    [],
  );

  return <Config value={configs}>{children}</Config>;
}
