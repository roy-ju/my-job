import { useCallback, useEffect, useMemo } from 'react';

import useAPI_ChatRoomList from '@/apis/chat/getChatRoomList';

import { updateChatMessagesRead } from '@/apis/chat/updateChatMessagesRead';

import { ChatUserType } from '@/constants/enums';

import Keys from '@/constants/storage_keys';

import useLocalStorage from '@/hooks/useLocalStorage';

import usePageVisibility from '@/hooks/usePageVisibility';

import useWebSocket, { WebSocketReadyState } from '@/hooks/useWebSocket';

import { ChatMessages, WebSocketMessage } from '../types';

import useChatRoomStore from './useChatRoomStore';

import useChatRoomDispatch from './useChatRoomDispatch';

export default function useClientWebsocket() {
  const pageVisible = usePageVisibility();

  const [accessToken] = useLocalStorage(Keys.ACCESS_TOKEN, '');

  const store = useChatRoomStore();

  const dispatch = useChatRoomDispatch();

  const { mutate } = useAPI_ChatRoomList();

  const webSocketUrl = useMemo(() => {
    if (!store?.data?.chat_room_id) return '';

    if (store?.data?.deregistered || store?.data.chat_room_closed_time) return '';

    if (!accessToken) return '';

    const chatRoomID = store.data.chat_room_id;

    const baseURL = process.env.NEXT_PUBLIC_NEGOCIO_WEBSOCKET_BASE_URL;

    return `${baseURL}/chat/ws/${chatRoomID}/${accessToken}`;
  }, [accessToken, store?.data?.chat_room_id, store?.data?.deregistered, store?.data?.chat_room_closed_time]);

  const handleAgentReadMessages = useCallback(() => {
    if (store?.chatMessages && store.chatMessages.length > 0) {
      const chatMessages = store.chatMessages;

      const updatedChatMessages = chatMessages.map((item) =>
        item.agentReadTime ? item : { ...item, agentReadTime: new Date() },
      );

      dispatch?.({ type: 'set_ChatMessages', payLoad: updatedChatMessages });
    }
  }, [dispatch, store?.chatMessages]);

  const { connect, disconnect, sendMessage, readyState } = useWebSocket(webSocketUrl, {
    onOpen: () => {
      dispatch?.({ type: 'set_TextFieldDisabled', payLoad: false });
    },

    onClose: () => {
      dispatch?.({ type: 'set_TextFieldDisabled', payLoad: true });
    },

    onError: () => {},

    onMessage: (event) => {
      const chat = JSON.parse(event.data) as WebSocketMessage;

      if (chat.chat_user_type === ChatUserType.Agent && chat.read_chat_id) {
        handleAgentReadMessages();
      }

      if (chat.chat_id && chat.message) {
        const updateChatMessage = {
          id: chat.chat_id,
          name: `${store?.data?.other_name}`,
          profileImagePath: store?.data?.other_profile_image_full_path,
          message: chat.message,
          chatUserType: chat.chat_user_type,
          sentTime: new Date().toISOString(),
          agentReadTime: null,
        };

        const prevMessages: ChatMessages = store?.chatMessages || [];
        const updateChatMessages = [...prevMessages, updateChatMessage];

        dispatch?.({ type: 'set_ChatMessages', payLoad: updateChatMessages });
      }
    },
  });

  useEffect(() => {
    if (!webSocketUrl) return;

    if (pageVisible) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [pageVisible, connect, disconnect, webSocketUrl]);

  useEffect(() => {
    if (store?.chatMessages && store?.data) {
      const { chatMessages, data } = store;
      const lastChat = chatMessages[chatMessages.length - 1];

      if (
        lastChat &&
        data?.chat_user_type &&
        (readyState === WebSocketReadyState.Open || readyState === WebSocketReadyState.Closed)
      ) {
        updateChatMessagesRead(data.chat_room_id).then(() => mutate());

        if (readyState === WebSocketReadyState.Open) {
          sendMessage(
            JSON.stringify({
              chat_user_type: data?.chat_user_type,
              read_chat_id: lastChat.id,
            }),
          );
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store?.data?.chat_room_id, store?.chatMessages?.length, store?.data?.chat_user_type, sendMessage, readyState]);

  const handleSendMessage = useCallback(
    (message: string) => {
      if (!store?.data?.chat_user_type) return;

      sendMessage(
        JSON.stringify({
          message,
          chat_user_type: store.data?.chat_user_type,
        }),
      );
    },
    [sendMessage, store?.data?.chat_user_type],
  );

  return {
    handleSendMessage,
  };
}
