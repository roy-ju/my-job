import { ReactNode, createContext, useReducer } from 'react';

import { ChatRoomReducer, initialState } from '../reducer';

import { Action, State } from '../types';

export const ChatRoomContext = createContext<Nullable<State>>(null);

export const ChatRoomDisaptchContext = createContext<React.Dispatch<Action> | null>(null);

export default function ChatRoomProvider({ children }: { children: ReactNode }) {
  const [value, dispatch] = useReducer(ChatRoomReducer, initialState);

  return (
    <ChatRoomContext.Provider value={value}>
      <ChatRoomDisaptchContext.Provider value={dispatch}>{children}</ChatRoomDisaptchContext.Provider>
    </ChatRoomContext.Provider>
  );
}
