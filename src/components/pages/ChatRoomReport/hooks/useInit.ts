import { useMemo } from 'react';

import { useRouter } from 'next/router';

import useFetchChatRoomDetail from '@/services/chat/useFetchChatRoomDetail';

export default function useInit() {
  const router = useRouter();

  const id = useMemo(() => {
    if (router?.query?.chatRoomID && Number(router.query.chatRoomID) > 0) {
      return Number(router.query.chatRoomID);
    }

    return 0;
  }, [router?.query]);

  const { data, isLoading } = useFetchChatRoomDetail(id);

  return { data, isLoading };
}
