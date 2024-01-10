import { useCallback } from 'react';

import { usePlatform } from '@/providers/PlatformProvider';

import { useRouter as useNextRouter } from 'next/router';

import { useRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

import useChatRoomListStore from './useChatRoomListStore';

export default function useChatRoomListNavigateHandler() {
  const store = useChatRoomListStore();

  const platform = usePlatform();

  const nextRouter = useNextRouter();

  const router = useRouter(platform?.depth);

  const handleClickChatRoomListItem = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { value } = e.currentTarget;
      if (platform?.platform === 'pc') {
        router.push(Routes.ChatRoom, {
          searchParams: { chatRoomID: `${value}` },
        });

        store?.mutate();
      } else {
        nextRouter.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${value}`);
      }
    },
    [router, nextRouter, platform, store],
  );

  const handleClickSuggestForm = useCallback(() => {
    if (platform?.platform === 'pc') {
      router.replace(Routes.SuggestForm, {
        searchParams: {
          entry: 'chatRooomList',
        },
      });
    } else {
      nextRouter.push({
        pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
        query: { entry: 'chatRooomList' },
      });
    }
  }, [router, nextRouter, platform]);

  return {
    handleClickChatRoomListItem,
    handleClickSuggestForm,
  };
}
