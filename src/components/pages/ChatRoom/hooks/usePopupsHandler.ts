import { useCallback, useState } from 'react';

import { usePlatform } from '@/providers/PlatformProvider';

import { useRouter as useNextRouter } from 'next/router';

import { useRouter } from '@/hooks/utils';

import { toast } from 'react-toastify';

import { mutate } from 'swr';

import { v4 } from 'uuid';

import closeChatRoom from '@/apis/chat/closeChatRoom';

import uploadPhotos from '@/apis/chat/uploadPhotos';

import Routes from '@/router/routes';

import getFileFromUrl from '@/utils/getFileFromUrl';

import useChatRoomStore from './useChatRoomStore';

import useChatRoomDispatch from './useChatRoomDispatch';

type UsePopupsHandlerProps = { callbackFn?: (message: string) => void };

export default function usePopupsHandler({ callbackFn }: UsePopupsHandlerProps) {
  const [isLoadingCloseAPI, setIsLoadingCloseAPI] = useState(false);

  const platform = usePlatform();

  const router = useRouter(platform?.depth);

  const nextRouter = useNextRouter();

  const store = useChatRoomStore();

  const dispatch = useChatRoomDispatch();

  const onClosePopup = useCallback(() => {
    dispatch?.({ type: 'set_Popup', payLoad: '' });
  }, [dispatch]);

  const onLeaveChatRoom = useCallback(async () => {
    const chatRoomID = Number(router.query.chatRoomID);

    await closeChatRoom(chatRoomID);

    setIsLoadingCloseAPI(true);

    await mutate('/chat/room/list');

    setIsLoadingCloseAPI(false);

    toast.success('채팅방 나가기가 완료되었습니다.');

    dispatch?.({ type: 'set_Popup', payLoad: '' });

    if (platform?.platform === 'pc') {
      router.pop();
    } else {
      nextRouter.replace(`/${Routes.EntryMobile}/${Routes.ChatRoomList}`);
    }
  }, [dispatch, nextRouter, platform?.platform, router]);

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
        const res = await uploadPhotos(f);

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
