import { ReactNode, createContext } from 'react';

import { State } from '../types';

import useInit from '../hooks/useInit';

export const ChatRoomReportContext = createContext<Nullable<State>>(null);

export default function ChatRoomReportProvider({ children }: { children: ReactNode }) {
  const value = useInit();

  return <ChatRoomReportContext.Provider value={value}>{children}</ChatRoomReportContext.Provider>;
}
