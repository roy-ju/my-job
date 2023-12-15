import { ReactNode, createContext } from 'react';

import { useFetchDanjiDetail } from '@/services/danji/useFetchDanjiDetail';

import PopupProvider from '@/providers/PopupProvider';

import { State } from '../types';

export const DanjiDetailContext = createContext<Nullable<State>>(null);

export default function DanjiDetailProvider({ children }: { children: ReactNode }) {
  const value = useFetchDanjiDetail({});

  return (
    <PopupProvider>
      <DanjiDetailContext.Provider value={value}>{children}</DanjiDetailContext.Provider>
    </PopupProvider>
  );
}
