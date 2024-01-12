import useAPI_ChatRoomDetail from '@/apis/chat/getChatRoomDetail';
import useAPI_ChatRoomList from '@/apis/chat/getChatRoomList';
import { updateChatMessagesRead } from '@/apis/chat/updateChatMessagesRead';
import { IChatMessage } from '@/components/templates/ChatRoom/ChatMessageWrapper';
import { ChatUserType } from '@/constants/enums';
import Keys from '@/constants/storage_keys';
import { useLocalStorage } from '@/hooks/utils';
import usePageVisibility from '@/hooks/utils/usePageVisibility';
import useWebSocket, { WebSocketReadyState } from '@/hooks/utils/useWebSocket';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

interface WebSocketMessage {
  message: string;
  read_chat_id: number | null;
  chat_id: number;
  chat_user_type: number;
}

export default function useChatRoom(chatRoomID: number) {
  const pageVisible = usePageVisibility();

  const [isLoading, setIsLoading] = useState(true);
  const { data, mutate } = useAPI_ChatRoomDetail(chatRoomID);
  const [accessToken] = useLocalStorage(Keys.ACCESS_TOKEN, '');
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [photosUrls, setPhotosUrls] = useState<string[]>([]);
  const [textFieldDisabled, setTextFieldDisabled] = useState(false);

  const { mutate: mutateChatRoomList } = useAPI_ChatRoomList();

  const webSocketUrl = useMemo(() => {
    if (!chatRoomID || !accessToken) return '';
    const baseURL = process.env.NEXT_PUBLIC_NEGOCIO_WEBSOCKET_BASE_URL;
    return `${baseURL}/chat/ws/${chatRoomID}/${accessToken}`;
  }, [accessToken, chatRoomID]);

  const handleAgentReadMessages = useCallback(() => {
    setChatMessages((prev) => prev.map((item) => (item.agentReadTime ? item : { ...item, agentReadTime: new Date() })));
  }, []);

  const { connect, disconnect, sendMessage, readyState } = useWebSocket(webSocketUrl, {
    onOpen: () => {
      setTextFieldDisabled(false);
    },
    onClose: () => {
      setTextFieldDisabled(true);
    },
    onError: () => {},
    onMessage: (event) => {
      const chat = JSON.parse(event.data) as WebSocketMessage;

      if (chat.chat_user_type === ChatUserType.Agent && chat.read_chat_id) {
        handleAgentReadMessages();
      }

      if (chat.chat_id && chat.message) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: chat.chat_id,
            name: `${data?.other_name}`,
            profileImagePath: data?.other_profile_image_full_path,
            message: chat.message,
            chatUserType: chat.chat_user_type,
            sentTime: new Date().toISOString(),
            agentReadTime: null,
          },
        ]);
      }
    },
  });

  const handleChangePhotoUrls = useCallback((values: string[]) => {
    if (values.length > 6) {
      toast.error('6개까지 추가 가능합니다.');
      return;
    }

    setPhotosUrls(values);
  }, []);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
    if (data?.list) {
      setChatMessages(
        data?.list?.map((chat) => ({
          id: chat.id,
          name: data.deregistered ? '탈퇴한 회원' : `${data?.other_name}`,
          profileImagePath: data.deregistered
            ? process.env.NEXT_PUBLIC_NEGOCIO_DELETED_PROFILE_IMG_PATH
            : data?.other_profile_image_full_path,

          message: chat.message,
          chatUserType: chat.chat_user_type,
          sentTime: chat.created_time,
          agentReadTime: chat.user2_read_time ? new Date(chat.user2_read_time) : null,
        })) ?? [],
      );
    }
  }, [data]);

  useEffect(() => {
    if (pageVisible && webSocketUrl !== '') {
      connect();
    }
    return () => disconnect();
  }, [pageVisible, connect, disconnect, webSocketUrl]);

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

  useEffect(() => {
    const lastChat = chatMessages[chatMessages.length - 1];

    if (lastChat && data?.chat_user_type && readyState === WebSocketReadyState.Open) {
      updateChatMessagesRead(chatRoomID).then(() => mutateChatRoomList());
      sendMessage(
        JSON.stringify({
          chat_user_type: data?.chat_user_type,
          read_chat_id: lastChat.id,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomID, chatMessages.length, data?.chat_user_type, sendMessage, readyState]);

  useEffect(() => {
    if (data?.chat_room_closed_time) {
      setTextFieldDisabled(true);
    }
  }, [data?.chat_room_closed_time]);

  return {
    isTextFieldDisabled: textFieldDisabled,

    otherName: data?.other_name,
    deregistered: data?.deregistered,

    chatMessages,
    photosUrls,
    isLoading,

    handleSendMessage,
    handleChangePhotoUrls,

    chatUserType: data?.chat_user_type,
    chatRoomType: data?.chat_room_type,

    accordionDetails: {
      listingItem1Count: data?.listing_item1_count || 0,
      listingItem1Arr: data?.listing_item1,

      listingItem2Count: data?.listing_item2_count || 0,
      listingItem2Arr: data?.listing_item2,

      suggestCount: data?.suggest_item_count || 0,
      suggestItemArr: data?.suggest_item,

      recommendCount: data?.recommend_item_count || 0,
      recommendItemArr: data?.recommend_item,
    },

    mutate,
  };
}
