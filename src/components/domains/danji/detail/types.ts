import { ForwardedRef, ReactNode } from 'react';

import { DanjiDetailResponse } from '@/services/danji/types';

export type SectionProps = {
  children: ReactNode;
  forwardedRef?: ForwardedRef<HTMLDivElement>;
};

export interface CommonDanjiDetailProps {
  danji: DanjiDetailResponse;
}
