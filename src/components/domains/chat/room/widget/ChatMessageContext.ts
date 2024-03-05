import { createContext } from 'react';

interface IChatMessageContext {
  variant?: 'gray' | 'nego' | 'system';
}

const ChatMessageContext = createContext<IChatMessageContext>({});

export default ChatMessageContext;
