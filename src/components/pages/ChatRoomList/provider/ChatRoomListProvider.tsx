import { ReactNode, createContext } from 'react';

import useInit from '../hooks/useInit';

import { State } from '../types';

export const ChatRoomListContext = createContext<Nullable<State>>(null);

export default function ChatRoomListProvider({ children }: { children: ReactNode }) {
  const value = useInit();

  return <ChatRoomListContext.Provider value={value}>{children}</ChatRoomListContext.Provider>;
}
