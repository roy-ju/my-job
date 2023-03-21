import useAPI_ChatRoomDetail from '@/apis/chat/getChatRoomDetail';
import { IChatMessage } from '@/components/templates/ChatRoom/ChatMessageWrapper';
import Keys from '@/constants/storage_keys';
import { useLocalStorage } from '@/hooks/utils';
import useWebSocket from '@/hooks/utils/useWebSocket';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface WebSocketMessage {
  message: string;
  read_chat_id: number | null;
  chat_id: number;
  chat_user_type: number;
}

export default function useChatRoom(chatRoomID: number) {
  const { data, isLoading } = useAPI_ChatRoomDetail(chatRoomID);
  const [accessToken] = useLocalStorage(Keys.ACCESS_TOKEN, '');
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [textFieldDisabled, setTextFieldDisabled] = useState(false);

  const webSocketUrl = useMemo(() => {
    if (!chatRoomID || !accessToken) return '';
    const baseURL = process.env.NEXT_PUBLIC_NEGOCIO_WEBSOCKET_BASE_URL;
    return `${baseURL}/chat/ws/${chatRoomID}/${accessToken}`;
  }, [accessToken, chatRoomID]);

  const { connect, sendMessage } = useWebSocket(webSocketUrl, {
    onOpen: () => {
      console.log('socket connection opened');
    },
    onClose: () => {
      setTextFieldDisabled(true);
    },
    onError: (event) => {
      console.error(event);
    },
    onMessage: (event) => {
      const chat = JSON.parse(event.data) as WebSocketMessage;
      if (chat.chat_id && chat.message) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: chat.chat_id,
            name: `공인중개사 ${data?.agent_name}`,
            profileImagePath: data?.agent_profile_image_full_path,
            message: chat.message,
            chatUserType: chat.chat_user_type,
            sentTime: new Date().toISOString(),
          },
        ]);
      }
    },
  });

  useEffect(() => {
    if (data?.list) {
      setChatMessages(
        data?.list?.map((chat) => ({
          id: chat.id,
          name: `공인중개사 ${data?.agent_name}`,
          profileImagePath: data?.agent_profile_image_full_path,
          message: chat.message,
          chatUserType: chat.chat_user_type,
          sentTime: chat.created_time,
        })) ?? [],
      );
    }
  }, [data]);

  useEffect(() => {
    if (webSocketUrl !== '') {
      connect();
    }
  }, [connect, webSocketUrl]);

  const handleSendMessage = useCallback(
    (message: string) => {
      if (!data?.chat_user_type) return;
      sendMessage(
        JSON.stringify({
          message,
          chat_user_type: data.chat_user_type,
        }),
      );
    },
    [sendMessage, data?.chat_user_type],
  );

  return {
    isTextFieldDisabled: textFieldDisabled,
    agentProfileImagePath: data?.agent_profile_image_full_path,
    listingTitle: data?.listing_title,
    agentName: data?.agent_name,
    agentOfficeName: data?.agent_office_name,
    agentDescription: data?.agent_description,
    chatMessages,
    isLoading,
    handleSendMessage,
  };
}
