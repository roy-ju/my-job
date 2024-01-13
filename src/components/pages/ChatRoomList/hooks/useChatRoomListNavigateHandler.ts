import { useCallback } from 'react';

import { usePlatform } from '@/providers/PlatformProvider';

import { useRouter as useNextRouter } from 'next/router';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

import useChatRoomListStore from './useChatRoomListStore';

export default function useChatRoomListNavigateHandler() {
  const store = useChatRoomListStore();

  const platform = usePlatform();

  const router = useNextRouter();

  const customRouter = useCustomRouter(platform?.depth);

  const handleClickChatRoomListItem = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { value } = e.currentTarget;
      if (platform?.platform === 'pc') {
        customRouter.push(Routes.ChatRoom, {
          searchParams: { chatRoomID: `${value}` },
        });

        store?.mutate();
      } else {
        router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${value}`);
      }
    },
    [customRouter, router, platform, store],
  );

  const handleClickSuggestForm = useCallback(() => {
    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
      query: { entry: Routes.ChatRoomList },
    });
  }, [router]);

  return {
    handleClickChatRoomListItem,
    handleClickSuggestForm,
  };
}
