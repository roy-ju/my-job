import { ReactNode, createContext, useReducer } from 'react';

import { DanjiSuggestsOrListingsReducer, initialState } from '../reducer';

import { SuggestsOrListingsState, SuggestsOrListingsStateAction } from '../types';

export const DanjiSuggestsOrListingsContext = createContext<SuggestsOrListingsState>(initialState);

export const DanjiSuggestsOrListingsDispatchContext =
  createContext<React.Dispatch<SuggestsOrListingsStateAction> | null>(null);

export default function DanjiSuggestsOrListingsProvider({ children }: { children: ReactNode }) {
  const [value, dispatch] = useReducer(DanjiSuggestsOrListingsReducer, initialState);

  return (
    <DanjiSuggestsOrListingsContext.Provider value={value}>
      <DanjiSuggestsOrListingsDispatchContext.Provider value={dispatch}>
        {children}
      </DanjiSuggestsOrListingsDispatchContext.Provider>
    </DanjiSuggestsOrListingsContext.Provider>
  );
}
