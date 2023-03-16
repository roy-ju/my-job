import { useAuth } from '@/hooks/services';
import useSWR from 'swr';

export default function useAPI_ChatRoomList() {
  const { user, isLoading: isLoadingUser } = useAuth();
  const { data, isLoading } = useSWR(user ? '/chat/room/list' : null);
  return { data, isLoading: isLoading || isLoadingUser };
}
