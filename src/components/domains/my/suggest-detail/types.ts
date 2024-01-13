import { KeyedMutator } from 'swr';

import { SuggestDetailResponse } from '@/services/suggests/types';

import { MySuggestRecommendsResponse } from '@/services/my/types';

export type State = {
  isLoading: boolean;
  suggestDetailData?: SuggestDetailResponse | null;
  suggestRecommendsData: MySuggestRecommendsResponse['list'];
  count: number;
  suggestStatus: number;
  mutate: KeyedMutator<MySuggestRecommendsResponse[]>;
  onNext: () => void;
};
