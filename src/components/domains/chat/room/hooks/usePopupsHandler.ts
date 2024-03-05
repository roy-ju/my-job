import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { mutate } from 'swr';

import { v4 } from 'uuid';

import Routes from '@/router/routes';

import getFileFromUrl from '@/utils/getFileFromUrl';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { apiService } from '@/services';

import useChatRoomStore from './useChatRoomStore';

import useChatRoomDispatch from './useChatRoomDispatch';

type UsePopupsHandlerProps = { callbackFn?: (message: string) => void };

export default function usePopupsHandler({ callbackFn }: UsePopupsHandlerProps) {
  const [isLoadingCloseAPI, setIsLoadingCloseAPI] = useState(false);

  const { platform } = useCheckPlatform();

  const router = useRouter();

  const store = useChatRoomStore();

  const dispatch = useChatRoomDispatch();

  const onClosePopup = useCallback(() => {
    dispatch?.({ type: 'set_Popup', payLoad: '' });
  }, [dispatch]);

  const onLeaveChatRoom = useCallback(async () => {
    const chatRoomID = Number(router.query.chatRoomID);

    await apiService.closeChatRoom(chatRoomID);

    setIsLoadingCloseAPI(true);

    await mutate('/chat/room/list');

    setIsLoadingCloseAPI(false);

    toast.success('채팅방 나가기가 완료되었습니다.');

    dispatch?.({ type: 'set_Popup', payLoad: '' });

    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';

      const depth2 = router?.query?.depth2 ?? '';

      const query = router.query;

      delete query.depth1;
      delete query.depth2;
      delete query.chatRoomID;

      if (depth1 && depth2) {
        router.replace({ pathname: `/${depth1}`, query: { ...query } });
      } else if (depth1 && !depth2) {
        router.replace(`/`);
      }
    } else {
      router.replace(`/${Routes.EntryMobile}/${Routes.ChatRoomList}`);
    }
  }, [dispatch, router, platform]);

  const onCloseSendPhotosPopup = useCallback(() => {
    dispatch?.({ type: 'set_Popup', payLoad: '' });
    dispatch?.({ type: 'set_PhotosUrls', payLoad: [] });
  }, [dispatch]);

  const onClickSendPhotos = useCallback(async () => {
    dispatch?.({ type: 'set_Popup', payLoad: '' });
    dispatch?.({ type: 'set_PhotoSending', payLoad: true });

    const values = store?.photosUrls || [];

    try {
      const uploadPromises = values.map(async (item) => {
        const f = await getFileFromUrl(item, v4());
        const res = await apiService.uploadPhotos(f);

        return res?.full_file_paths;
      });

      const results = await Promise.all(uploadPromises);

      const promises = results.map(async (url) => {
        if (url) {
          await callbackFn?.(`<img alt='삭제된 이미지 입니다.' src='${url[0] as string}' className='negocioChatImg'/>`);
        }
      });

      await Promise.all(promises);

      dispatch?.({ type: 'set_PhotosUrls', payLoad: [] });
      dispatch?.({ type: 'set_PhotoSending', payLoad: false });
    } catch (e) {
      dispatch?.({ type: 'set_PhotosUrls', payLoad: [] });
      dispatch?.({ type: 'set_PhotoSending', payLoad: false });
    }
  }, [dispatch, callbackFn, store?.photosUrls]);

  return {
    isLoadingCloseAPI,
    onClickSendPhotos,
    onCloseSendPhotosPopup,
    onClosePopup,
    onLeaveChatRoom,
  };
}
