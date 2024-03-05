import useSWR from 'swr';

import { SuggestDetailResponse } from './types';

export default function useFetchSuggestDetail({ suggestID }: { suggestID: number | undefined | null }) {
  return useSWR<(SuggestDetailResponse & ErrorResponse) | null>(
    suggestID
      ? [
          '/suggest/detail',
          {
            suggest_id: suggestID,
          },
          null,
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: true, revalidateOnMount: true },
  );
}
