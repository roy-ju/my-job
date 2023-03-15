import { ReactNode, useMemo } from 'react';
import axios from '@/lib/axios';
import { SWRConfig as Config } from 'swr';

type ArgType = [string, any];

function fetcher(...args: ArgType) {
  const url = args[0];
  const data = args[1];

  return axios.post(url, data).then((res) => res.data);
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
