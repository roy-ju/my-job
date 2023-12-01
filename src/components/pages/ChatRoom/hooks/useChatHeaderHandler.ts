import { useCallback, useMemo } from 'react';

import { usePlatform } from '@/providers/PlatformProvider';

import { useRouter } from '@/hooks/utils';

import { useRouter as useNextRouter } from 'next/router';

import Routes from '@/router/routes';

import useChatRoomStore from './useChatRoomStore';

import useChatRoomDispatch from './useChatRoomDispatch';

export default function useChatHeaderHandler() {
  const platform = usePlatform();

  const nextRouter = useNextRouter();

  const router = useRouter(platform?.depth);

  const store = useChatRoomStore();

  const dispatch = useChatRoomDispatch();

  const onClickReportButton = useCallback(() => {
    const chatRoomID = (store?.data?.chat_room_id || 0).toString();

    if (platform?.platform === 'pc') {
      router.replace(`${Routes.ChatRoomReport}`, {
        persistParams: true,
        searchParams: { chatRoomID },
      });
    } else {
      nextRouter.push(`/${Routes.EntryMobile}/${Routes.ChatRoomReport}?chatRoomID=${chatRoomID}`);
    }
  }, [nextRouter, platform?.platform, router, store?.data?.chat_room_id]);

  const isExistBackButton = useMemo(
    () => router.query.back || platform?.platform !== 'pc',
    [platform?.platform, router.query.back],
  );

  const onClickBack = useCallback(() => {
    if (!isExistBackButton) {
      return;
    }

    if (router.query.back) {
      nextRouter.replace(router.query.back as string);
      return;
    }

    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        nextRouter.back();
      } else {
        nextRouter.replace('/');
      }
    }
  }, [nextRouter, isExistBackButton, router.query.back]);

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
  }, [store?.data?.deregistered, store?.data?.other_name, store?.data?.chat_room_closed_time]);

  return {
    headerItems,
    title,
    isExistBackButton,
    onClickBack,
    deregistered: store?.data?.deregistered || store?.data?.chat_room_closed_time,
  };
}
