import useSWR from 'swr';

import { SuggestDetailResponse } from './types';

export default function useFetchSuggestDetail({ suggestID }: { suggestID: number | undefined | null }) {
  return useSWR<SuggestDetailResponse | null>(
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
    { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnMount: true },
  );
}
