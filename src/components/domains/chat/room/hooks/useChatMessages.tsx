import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { customAlphabet } from 'nanoid';

import { VariableSizeList } from 'react-window';

import useLatest from '@/hooks/useLatest';

import ChatMessageWrapper from '../ChatMessages';

import useChatRoomStore from './useChatRoomStore';

export default function useChatMessages() {
  const nanoID = customAlphabet('123456789');

  const [lists, setLists] = useState<VariableSizeList<any> | null>(null);

  const [scrolled, setScrolled] = useState(false);

  const store = useChatRoomStore();

  const isLoading = useMemo(() => store?.renderCondition !== 'success', [store?.renderCondition]);

  const clientChatMessages = useMemo(() => {
    if (store?.chatMessages && store?.photoSending && store?.photosUrls && store.photosUrls.length > 0) {
      const photosUrls = store.photosUrls;

      const chatMessages = store?.chatMessages;

      const list = photosUrls.map(() => ({
        id: Number(nanoID()),
        name: '',
        profileImagePath: '',
        message: '',
        chatUserType: 1,
        sentTime: '',
        agentReadTime: null,
        photoLoading: true,
      }));

      return chatMessages.concat([...list]);
    }

    return store?.chatMessages || [];
  }, [nanoID, store?.chatMessages, store?.photoSending, store?.photosUrls]);

  const chatUserType = useMemo(() => store?.data?.chat_user_type, [store?.data?.chat_user_type]);

  const sizeMap = useRef<Record<number, number>>({});

  const getItemSize = useCallback((index: number) => sizeMap.current[index] ?? 0, []);

  useEffect(() => {
    lists?.resetAfterIndex(0);

    lists?.scrollToItem(clientChatMessages.length - 1, 'start');

    setTimeout(() => {
      lists?.scrollToItem(clientChatMessages.length - 1, 'start');
      setScrolled(true);
    }, 100);
  }, [lists, clientChatMessages]);

  const messagesRef = useLatest(clientChatMessages);

  const renderRow = useCallback(
    ({ index, style }: { index: number; style: CSSProperties }) => {
      const chat = messagesRef.current?.[index];

      const prevChat = messagesRef.current?.[index - 1];
      const nextChat = messagesRef.current?.[index + 1];

      return (
        <div key={chat.id} style={style}>
          <div
            ref={(el) => {
              if (el) {
                sizeMap.current[index] = el?.getBoundingClientRect().height;
              }
            }}
          >
            <ChatMessageWrapper
              chat={chat}
              prevChat={prevChat}
              nextChat={nextChat}
              chatRoomUserType={chatUserType || 0}
            />
          </div>
        </div>
      );
    },
    [messagesRef, chatUserType, sizeMap],
  );

  return {
    isLoading,
    chatMessages: clientChatMessages || [],
    chatUserType,
    scrolled,
    lists,
    setLists,
    getItemSize,
    renderRow,
  };
}
