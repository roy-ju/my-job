import { KeyedMutator } from 'swr';

import { DanjiDetailResponse } from '@/services/danji/types';

import React from 'react';

export type State = {
  danji: DanjiDetailResponse;
  isLoading: false;
  mutate: KeyedMutator<DanjiDetailResponse>;
  error: any;
};

export type TabIndex = 0 | 1 | 2 | 3;


  
