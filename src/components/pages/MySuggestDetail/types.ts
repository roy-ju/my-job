import { KeyedMutator } from 'swr';

import { GetMySuggestRecommendsResponse } from '@/apis/suggest/getMySuggestRecommends';
import { GetSuggestDetailResponse } from '@/apis/suggest/getSuggestDetail';

export type State = {
  isLoading: boolean;
  suggestDetailData?: GetSuggestDetailResponse | null | undefined;
  suggestRecommendsData: GetMySuggestRecommendsResponse['list'];
  count: number;
  suggestStatus: number;
  mutate: KeyedMutator<GetMySuggestRecommendsResponse[]>;
  onNext: () => void;
};
