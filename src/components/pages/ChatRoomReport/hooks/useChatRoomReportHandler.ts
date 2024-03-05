import { useCallback, useMemo } from 'react';

import { usePlatform } from '@/providers/PlatformProvider';

import { useRouter } from '@/hooks/utils';

import { useRouter as useNextRouter } from 'next/router';

import { toast } from 'react-toastify';

import Routes from '@/router/routes';

import { apiService } from '@/services';

import useChatRoomReportStore from './useChatRoomReportStore';

export default function useChatRoomReportHandler() {
  const store = useChatRoomReportStore();

  const platform = usePlatform();

  const router = useRouter(platform?.depth);

  const nextRouter = useNextRouter();

  const targetName = useMemo(() => {
    if (!store?.data) return '';

    return store.data.deregistered ? '탈퇴한 회원' : `${store.data.other_name}`;
  }, [store?.data]);

  const onClickReportButton = useCallback(
    async (value: string) => {
      const chatRoomID = store?.data?.chat_room_id ?? 0;

      if (!value || !chatRoomID) return;

      await apiService.listingReportCreate({
        chat_room_id: chatRoomID,
        message: value,
      });

      setTimeout(() => {
        toast.success('신고되었습니다.', { toastId: 'reportSuccess' });

        setTimeout(() => {
          if (platform?.platform === 'pc') {
            router.pop();
          } else {
            nextRouter.back();
          }
        }, 50);
      }, 50);
    },
    [nextRouter, platform?.platform, router, store?.data?.chat_room_id],
  );

  const onClickBackButton = useCallback(() => {
    const chatRoomID = store?.data?.chat_room_id ?? 0;

    if (platform?.platform === 'pc') {
      router.replace(`${Routes.ChatRoom}`, {
        persistParams: true,
        searchParams: { chatRoomID: `${chatRoomID}` },
      });
    } else {
      nextRouter.back();
    }
  }, [nextRouter, platform?.platform, router, store?.data?.chat_room_id]);

  return { targetName, onClickReportButton, onClickBackButton };
}
