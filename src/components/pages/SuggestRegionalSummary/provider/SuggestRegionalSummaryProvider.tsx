import { ReactNode, createContext } from 'react';

import useInit from '../hooks/useInit';

import { State } from '../types';

export const SummaryFormContext = createContext<State['formData']>(null);

export default function SuggestRegionalSummaryProvider({ children }: { children: ReactNode }) {
  const formData = useInit();

  return <SummaryFormContext.Provider value={formData}>{children}</SummaryFormContext.Provider>;
}
