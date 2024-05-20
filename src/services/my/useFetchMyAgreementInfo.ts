import useSWR from 'swr';

import { MyAgreementInfoResponse } from './types';

export default function useFetchAgreementInfo(loi: string, token: string) {
  const { data, isLoading, mutate } = useSWR<MyAgreementInfoResponse & ErrorResponse>(
    loi && token
      ? [
          '/my/agreement/info',
          {
            loi: Number(loi),
            token,
          },
        ]
      : null,
  );

  return { data, isLoading, mutate };
}
