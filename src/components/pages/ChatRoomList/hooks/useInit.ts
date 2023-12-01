import useAPI_ChatRoomList from '@/apis/chat/getChatRoomList';

export default function useInit() {
  const { data, isLoading, mutate } = useAPI_ChatRoomList();

  return { data, isLoading, mutate };
}
