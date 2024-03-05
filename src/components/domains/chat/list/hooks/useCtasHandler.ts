import { useCallback } from 'react';

import { KeyedMutator } from 'swr';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import Routes from '@/router/routes';

import { ChatRoomListResponse } from '@/services/chat/type';

export default function useCtasHandler({ mutateFunc }: { mutateFunc: KeyedMutator<ChatRoomListResponse> }) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const handleClickChatRoomListItem = useCallback(
    (id: number) => {
      if (platform === 'pc') {
        router.push({
          pathname: `/${Routes.ChatRoomList}/${Routes.ChatRoom}`,
          query: {
            chatRoomID: `${id}`,
          },
        });

        mutateFunc();
      }

      if (platform === 'mobile') {
        router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${id}`);
      }
    },
    [mutateFunc, platform, router],
  );

  const handleClickSuggestForm = useCallback(() => {
    if (platform === 'pc') {
      router.push({
        pathname: `/${Routes.SuggestForm}`,
        query: {
          entry: Routes.ChatRoomList,
        },
      });

      mutateFunc();
    }

    if (platform === 'mobile') {
      if (inAppInfo.isInAppBrowser) {
        handleOpenAppInstallPopup();
        return;
      }

      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
        query: { entry: Routes.ChatRoomList },
      });
    }
  }, [handleOpenAppInstallPopup, inAppInfo.isInAppBrowser, mutateFunc, platform, router]);

  return { handleClickChatRoomListItem, handleClickSuggestForm };
}
