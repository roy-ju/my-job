import { ChangeEventHandler, useCallback, useMemo, useRef } from 'react';

import loadImage from 'blueimp-load-image';

import { toast } from 'react-toastify';

import useChatRoomStore from './useChatRoomStore';

import useChatRoomDispatch from './useChatRoomDispatch';

export default function useSendMessageHandler() {
  const inputPhotoRef = useRef<HTMLInputElement | null>(null);

  const store = useChatRoomStore();

  const dispatch = useChatRoomDispatch();

  const disabled = useMemo(() => !!store?.textFieldDisabled, [store?.textFieldDisabled]);

  const openFileChooser = useCallback(() => {
    inputPhotoRef?.current?.click();
  }, []);

  const handleChangePhotoUrls = useCallback(
    (values: string[]) => {
      if (values.length > 6) {
        toast.error('6개까지 추가 가능합니다.');
        return;
      }

      dispatch?.({ type: 'set_PhotosUrls', payLoad: values });
    },
    [dispatch],
  );

  const handleChangePhotos = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (e) => {
      let validated = true;

      const newFiles: File[] = [];

      Array.from(e.target.files ?? []).forEach((item) => {
        const ext = item.name.split('.').pop();

        if (!ext || !['PNG', 'JPEG', 'JPG', 'JFIF', 'png', 'jpg', 'jpeg', 'jfif'].includes(ext.toLowerCase())) {
          validated = false;
        }
      });

      if (!validated) {
        toast.error('png, jpg, jpeg, jfif 확장자만 업로드 가능합니다.');
        return;
      }

      const processFile = async (file: File) =>
        new Promise<void>((resolve) => {
          loadImage(
            file,
            // @ts-ignore
            (img, _) => {
              // @ts-ignore
              img.toBlob((blob) => {
                const rotateFile = new File([blob], file.name, {
                  type: file.type,
                });
                newFiles.push(rotateFile);
                resolve();
              }, file.type);
            },
            {
              canvas: true,
              meta: true,
              orientation: true,
            },
          );
        });

      const filePromises = Array.from(e.target.files ?? []).map(processFile);

      await Promise.all(filePromises);

      const fileUrls = Array.from(newFiles ?? []).map((item) => URL.createObjectURL(item));

      const value = store?.photosUrls || [];

      const newValues = [...value, ...fileUrls];

      handleChangePhotoUrls(newValues);

      if (inputPhotoRef.current) {
        inputPhotoRef.current.value = '';
      }

      if (newValues.length > 6) {
        dispatch?.({ type: 'set_Popup', payLoad: '' });
      } else {
        dispatch?.({ type: 'set_Popup', payLoad: 'send_photo' });
      }
    },
    [dispatch, handleChangePhotoUrls, store?.photosUrls],
  );

  const handleDeleteByIndex = useCallback(
    (index: number) => {
      const values = store?.photosUrls || [];

      const newValues = [...values];

      newValues.splice(index, 1);

      if (newValues.length === 0) {
        dispatch?.({ type: 'set_Popup', payLoad: '' });
      }

      handleChangePhotoUrls(newValues);
    },
    [store?.photosUrls, handleChangePhotoUrls, dispatch],
  );

  return { inputPhotoRef, disabled, openFileChooser, handleChangePhotos, handleDeleteByIndex };
}
