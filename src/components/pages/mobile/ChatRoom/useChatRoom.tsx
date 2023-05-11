import useAPI_ChatRoomDetail from '@/apis/chat/getChatRoomDetail';
import useAPI_ChatRoomList from '@/apis/chat/getChatRoomList';
import { IChatMessage } from '@/components/templates/ChatRoom/ChatMessageWrapper';
import { ChatUserType } from '@/constants/enums';
import Keys from '@/constants/storage_keys';
import { useLocalStorage } from '@/hooks/utils';
import useLatest from '@/hooks/utils/useLatest';
import useWebSocket from '@/hooks/utils/useWebSocket';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface WebSocketMessage {
  message: string;
  read_chat_id: number | null;
  chat_id: number;
  chat_user_type: number;
}

export default function useChatRoom(chatRoomID: number) {
  const [isLoading, setIsLoading] = useState(true);
  const { data } = useAPI_ChatRoomDetail(chatRoomID);
  const [accessToken] = useLocalStorage(Keys.ACCESS_TOKEN, '');
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [textFieldDisabled, setTextFieldDisabled] = useState(false);
  const { mutate: mutateChatRoomList } = useAPI_ChatRoomList();
  const mutateListRef = useLatest(mutateChatRoomList);

  const webSocketUrl = useMemo(() => {
    if (!chatRoomID || !accessToken) return '';
    const baseURL = process.env.NEXT_PUBLIC_NEGOCIO_WEBSOCKET_BASE_URL;
    return `${baseURL}/chat/ws/${chatRoomID}/${accessToken}`;
  }, [accessToken, chatRoomID]);

  const handleAgentReadMessages = useCallback(() => {
    setChatMessages((prev) => prev.map((item) => (item.agentReadTime ? item : { ...item, agentReadTime: new Date() })));
  }, []);

  const { connect, sendMessage } = useWebSocket(webSocketUrl, {
    onOpen: () => {},
    onClose: () => {
      setTextFieldDisabled(true);
    },
    onError: (event) => {
      console.error(event);
    },
    onMessage: (event) => {
      const chat = JSON.parse(event.data) as WebSocketMessage;

      if (chat.chat_user_type === ChatUserType.Agent && chat.read_chat_id) {
        handleAgentReadMessages();
      }

      if (chat.chat_id && chat.message) {
        mutateListRef.current();
        setChatMessages((prev) => [
          ...prev,
          {
            id: chat.chat_id,
            name: `공인중개사 ${data?.agent_name}`,
            profileImagePath: data?.agent_profile_image_full_path,
            message: chat.message,
            chatUserType: chat.chat_user_type,
            sentTime: new Date().toISOString(),
            agentReadTime: null,
          },
        ]);
      }
    },
  });

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
    if (data?.list) {
      setChatMessages(
        data?.list?.map((chat) => ({
          id: chat.id,
          name: `공인중개사 ${data?.agent_name}`,
          profileImagePath: data?.agent_profile_image_full_path,
          message: chat.message,
          chatUserType: chat.chat_user_type,
          sentTime: chat.created_time,
          agentReadTime: chat.agent_read_time ? new Date(chat.agent_read_time) : null,
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
    additionalListingCount: data?.additional_listing_count,
    chatMessages,
    isLoading,
    handleSendMessage,
    chatUserType: data?.chat_user_type,

    hasContractCompleteListings: data?.has_contract_complete_listings,
    hasPreContractCompleteListings: data?.has_pre_contract_complete_listings,
  };
}
