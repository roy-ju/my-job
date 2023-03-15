import useUser from '@/states/user';
import useSWR from 'swr';

export default function useAPI_ChatRoomList() {
  const { user, isLoading: isLoadingUser } = useUser();
  const { data, isLoading } = useSWR(user ? '/chat/room/list' : null);
  return { data, isLoading: isLoading || isLoadingUser };
}
