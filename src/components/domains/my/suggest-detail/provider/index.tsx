import { ReactNode, createContext } from 'react';

import useInit from '../hooks/useInit';

import { State } from '../types';

export const MySuggestDetailContext = createContext<Nullable<State>>(null);

export default function MySuggestDetailProvider({ children }: { children: ReactNode }) {
  const value = useInit();

  return <MySuggestDetailContext.Provider value={value}>{children}</MySuggestDetailContext.Provider>;
}
