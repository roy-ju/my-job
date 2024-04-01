import useSWR from 'swr';

import { SubHomeRealestatedocumentDetailResponse } from './types';

export default function useFetchSubHomeRealestateDocumentDetail({ id }: { id: number | undefined | null }) {
  return useSWR<(SubHomeRealestatedocumentDetailResponse & ErrorResponse) | null>(
    id
      ? [
          '/subhome/realestatedocument/detail',
          {
            user_realestate_history_id: id,
          },
          null,
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: true, revalidateOnMount: true },
  );
}
