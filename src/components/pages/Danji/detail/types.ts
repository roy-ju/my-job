import { KeyedMutator } from 'swr';

import {
  DanjiDetailResponse,
  DanjiListingsListItem,
  DanjiListingsListResponse,
  DanjiSuggestListItem,
  DanjiSuggestListResponse,
  NaverDanjiResponse,
} from '@/services/danji/types';

export type State = {
  danji: DanjiDetailResponse;
  isLoading: false;
  mutate: KeyedMutator<DanjiDetailResponse>;
  error: any;
};

export type TabIndex = 0 | 1 | 2 | 3;

export type SuggestsOrListingsState = {
  tab: 1 | 2;

  listingsList: {
    isLoading: boolean;
    data: DanjiListingsListItem[];
    totalCount: number;
    size: number;
    increamentPageNumber: () => void;
    setSize: (size: number | ((_size: number) => number)) => Promise<DanjiListingsListResponse[] | undefined>;
    mutate: KeyedMutator<DanjiListingsListResponse[]>;
  };

  suggestsList: {
    isLoading: boolean;
    data: DanjiSuggestListItem[];
    totalCount: number;
    size: number;
    increamentPageNumber: () => void;
    setSize: (size: number | ((_size: number) => number)) => Promise<DanjiSuggestListResponse[] | undefined>;
    mutate: KeyedMutator<DanjiSuggestListResponse[]>;
  };

  naverMap: {
    mobileNaverURL: string;
    pcNaverURL: string;
    isLoading: false;
    mutate: KeyedMutator<NaverDanjiResponse>;
    error: any;
  };

  recommendationService: {
    possible: boolean;
  };
};

export type SuggestsOrListingsStateAction = { type: 'set_tab'; payLoad: 1 | 2 } | { type: 'set_data'; payLoad: any };
