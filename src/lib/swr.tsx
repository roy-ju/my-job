import { ReactNode, useMemo } from 'react';
import axios from '@/lib/axios';
import { SWRConfig as Config } from 'swr';

function fetcher(arg: string | [string, any]) {
  if (typeof arg === 'string') {
    return axios.post(arg).then((res) => res.data);
  }
  return axios.post(arg[0], arg[1]).then((res) => res.data);
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
