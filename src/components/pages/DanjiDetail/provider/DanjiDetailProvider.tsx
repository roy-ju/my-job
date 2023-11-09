/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import { ReactNode, createContext } from 'react';

export const DanjiContext = createContext<GetDanjiDetailResponse | null>(null);

export default function Provider({ children }: { children: ReactNode }) {
  return <div />;
}
