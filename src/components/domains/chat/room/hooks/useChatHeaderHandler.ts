import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import useChatRoomDispatch from './useChatRoomDispatch';

import useChatRoomStore from './useChatRoomStore';

export default function useChatHeaderHandler() {
  const store = useChatRoomStore();

  const { platform } = useCheckPlatform();

  const router = useRouter();

  const dispatch = useChatRoomDispatch();

  const onClickReportButton = useCallback(() => {
    const chatRoomID = (store?.data?.chat_room_id || 0).toString();

    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        if (depth1 === Routes.ChatRoom) {
          router.push({ pathname: `/${Routes.ChatRoomReport}/${depth2}`, query: { ...query, chatRoomID } });
        } else {
          router.push({ pathname: `/${depth1}/${Routes.ChatRoomReport}`, query: { ...query, chatRoomID } });
        }
      } else if (depth1 && !depth2) {
        router.push({ pathname: `/${Routes.ChatRoomReport}`, query: { ...query, chatRoomID } });
      }
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.ChatRoomReport}?chatRoomID=${chatRoomID}`);
    }
  }, [store?.data?.chat_room_id, platform, router]);

  const isExistBackButton = useMemo(() => router.query.back || platform !== 'pc', [platform, router.query.back]);

  const handleClickBack = useCallback(() => {
    if (!isExistBackButton) {
      return;
    }

    if (router.query.back) {
      router.replace(router.query.back as string);
      return;
    }

    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router, isExistBackButton]);

  const headerItems = useMemo(
    () => [
      { label: '신고하기', onClick: () => onClickReportButton() },

      { label: '채팅방 나가기', onClick: () => dispatch?.({ type: 'set_Popup', payLoad: 'close_chatroom' }) },
    ],
    [dispatch, onClickReportButton],
  );

  const title = useMemo(() => {
    if (store?.data?.deregistered || store?.data?.chat_room_closed_time) return '탈퇴한 회원';

    if (store?.data?.other_name) return store.data.other_name;

    return '';
  }, [store?.data?.chat_room_closed_time, store?.data?.deregistered, store?.data?.other_name]);

  return {
    headerItems,
    title,
    isExistBackButton,
    handleClickBack,
    deregistered: store?.data?.deregistered || store?.data?.chat_room_closed_time,
  };
}
