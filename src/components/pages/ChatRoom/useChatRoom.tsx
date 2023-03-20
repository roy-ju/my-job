import useAPI_ChatRoomDetail from '@/apis/chat/getChatRoomDetail';
// import Keys from '@/constants/storage_keys';
// import { useLocalStorage } from '@/hooks/utils';
// import useWebSocket from '@/hooks/utils/useWebSocket';
import { useCallback, useMemo } from 'react';

export default function useChatRoom(chatRoomID: number) {
  const { data, isLoading } = useAPI_ChatRoomDetail(chatRoomID);
  // const [accessToken] = useLocalStorage(Keys.ACCESS_TOKEN, '');

  // const webSocketUrl = useMemo(() => {
  //   if (!chatRoomID || !accessToken) return '';
  //   const baseURL = process.env.NEXT_PUBLIC_NEGOCIO_WEBSOCKET_BASE_URL;
  //   return `${baseURL}/chat/ws/${chatRoomID}/${accessToken}`;
  // }, [accessToken, chatRoomID]);

  // const { connect } = useWebSocket(webSocketUrl, {
  //   onOpen: () => {
  //     console.log('opened!');
  //   },
  //   onClose: () => {
  //     console.log('closed!');
  //   },
  //   onError: () => {
  //     console.log('error!');
  //   },
  // });

  const chatMessages = useMemo(
    () =>
      data?.list?.map((chat) => ({
        id: chat.id,
        name: data?.agent_name,
        message: chat.message,
        chatUserType: chat.chat_user_type,
        sentTime: chat.created_time,
      })) ?? [],
    [data],
  );

  // useEffect(() => {
  //   if (webSocketUrl !== '') {
  //     connect();
  //   }
  // }, [connect, webSocketUrl]);

  const handleSendMessage = useCallback(() => {
    // console.log(message);
  }, []);

  return {
    listingTitle: data?.listing_title,
    agentName: data?.agent_name,
    agentOfficeName: data?.agent_office_name,
    agentDescription: data?.agent_description,
    chatMessages,
    isLoading,
    handleSendMessage,
  };
}
