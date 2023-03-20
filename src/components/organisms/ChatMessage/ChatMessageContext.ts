import { createContext } from 'react';

interface IChatMessageContext {
  variant?: 'gray' | 'nego';
}

const ChatMessageContext = createContext<IChatMessageContext>({});

export default ChatMessageContext;
