import { ReactNode, useMemo } from 'react';

import { SWRConfig as Config } from 'swr';

import fetcher from './fetcher';

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
