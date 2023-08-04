import { OverlayPresenter, Popup, TextField } from '@/components/molecules';
import ChatInputSubmitIcon from '@/assets/icons/chat_input_submit.svg';

import tw, { styled, theme } from 'twin.macro';
import { ChangeEventHandler, KeyboardEventHandler, useCallback, useMemo, useRef, useState } from 'react';
import { useControlled, useIsomorphicLayoutEffect } from '@/hooks/utils';
import { checkPlatform } from '@/utils/checkPlatform';
import { Button, Loading } from '@/components/atoms';
import PlusIcon from '@/assets/icons/plus.svg';
import { toast } from 'react-toastify';
import loadImage from 'blueimp-load-image';
import CloseIcon from '@/assets/icons/close.svg';
import getFileFromUrl from '@/utils/getFileFromUrl';
import uploadPhotos from '@/apis/chat/uploadPhotos';
import { v4 } from 'uuid';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 8px;
`;

interface Props {
  disabled?: boolean;
  photosUrls?: string[];
  inputRef?: (element: HTMLTextAreaElement | null) => void;
  onSendMessage?: (message: string) => void;
  onChangePhotosUrls?: (url: string[]) => void;
}

export default function ChatRoomTextField({
  disabled = false,
  photosUrls,
  inputRef,
  onSendMessage,
  onChangePhotosUrls,
}: Props) {
  const defaultUrls = useMemo(() => [], []);

  const [values, setValues] = useControlled({
    controlled: photosUrls,
    default: defaultUrls,
  });

  const inputPhotoRef = useRef<HTMLInputElement | null>(null);

  const [platForm, setPlatForm] = useState('');

  const [value, setValue] = useState('');

  const [focused, setFocused] = useState(false);

  const [openPopup, setOpenPopup] = useState(false);

  const [photoSending, setPhotoSending] = useState(false);

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((e) => {
    setValue(e.target.value);
  }, []);

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const handleSendMessage = useCallback(() => {
    onSendMessage?.(value);
    setValue('');
  }, [value, onSendMessage]);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>(
    (e) => {
      if (e.which !== 229) {
        // Wait until IME settled.
        if (e.key === 'Escape') {
          e.currentTarget.blur();
        } else if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      }
    },
    [handleSendMessage],
  );

  const handleKeyDownMobile = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>((e) => {
    if (e.which !== 229) {
      // Wait until IME settled.
      if (e.key === 'Escape') {
        e.currentTarget.blur();
      } else if (e.key === 'Enter' && !e.shiftKey) {
        setValue((prevMessage) => `${prevMessage}\n`);
        // If Shift key is not pressed, prevent default behavior (sending the message).
        e.preventDefault();
        // Handle the line break here if needed (e.g., append a new line to the textarea).
        // Do not call handleSendMessage() to prevent sending the message.
      }
    }
  }, []);

  const openFileChooser = useCallback(() => {
    inputPhotoRef.current?.click();
  }, []);

  const handleChangePhotos = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (e) => {
      let validated = true;

      const newFiles: File[] = [];

      Array.from(e.target.files ?? []).forEach((item) => {
        const ext = item.name.split('.').pop();

        if (!ext || !['PNG', 'JPEG', 'JPG', 'png', 'jpg', 'jpeg'].includes(ext)) {
          validated = false;
        }
      });

      if (!validated) {
        toast.error('png, jpg, jpeg 확장자만 업로드 가능합니다.');
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

      const newValues = [...values, ...fileUrls];

      setValues(newValues);

      onChangePhotosUrls?.(newValues);

      if (inputPhotoRef.current) {
        inputPhotoRef.current.value = '';
      }

      if (newValues.length > 6) {
        setOpenPopup(false);
      } else {
        setOpenPopup(true);
      }
    },
    [setValues, onChangePhotosUrls, values, inputPhotoRef],
  );

  const handleDeleteByIndex = useCallback(
    (index: number) => {
      const newValues = [...values];
      newValues.splice(index, 1);
      setValues(newValues);
      onChangePhotosUrls?.(newValues);
    },
    [setValues, values, onChangePhotosUrls],
  );

  useIsomorphicLayoutEffect(() => {
    setPlatForm(checkPlatform());
  }, []);

  const handleClosePopup = useCallback(() => {
    setValues([]);
    onChangePhotosUrls?.([]);
    setOpenPopup(false);
  }, [onChangePhotosUrls, setValues]);

  const onClickSendPhotos = useCallback(async () => {
    setPhotoSending(true);

    try {
      const uploadPromises = values.map(async (item) => {
        const f = await getFileFromUrl(item, v4());
        const res = await uploadPhotos(f);

        return res?.full_file_paths;
      });

      const results = await Promise.all(uploadPromises);

      const promises = results.map(async (url) => {
        if (url) {
          await onSendMessage?.(
            `<img alt='삭제된 이미지 입니다.' src='${url[0] as string}' className='negocioChatImg'/>`,
          );
        }
      });

      await Promise.all(promises);

      setValues([]);
      onChangePhotosUrls?.([]);

      setPhotoSending(false);
      setOpenPopup(false);
    } catch (e) {
      setValues([]);
      onChangePhotosUrls?.([]);

      setPhotoSending(false);
      setOpenPopup(false);
    }
  }, [values, setValues, onSendMessage, onChangePhotosUrls]);

  return (
    <>
      <div>
        {platForm === 'mobile' && !disabled && (
          <div tw="flex flex-row items-center gap-1 mb-2">
            <input
              tw="opacity-0 absolute left-0 right-0 pointer-events-none"
              ref={inputPhotoRef}
              type="file"
              multiple
              accept="image/png, image/jpg, image/jpeg"
              onChange={handleChangePhotos}
            />
            <Button variant="ghost" tw="px-1.5 h-8" onClick={openFileChooser}>
              <Container tw="bg-red-700 hover:bg-red-300">
                <PlusIcon color="white" width="16" height="16" />
              </Container>
            </Button>

            <Button variant="ghost" tw="px-1.5 h-8">
              <Container tw="bg-yellow-700 hover:bg-yellow-300">
                <PlusIcon color="white" width="16" height="16" />
              </Container>
            </Button>

            <Button variant="ghost" tw="px-1.5 h-8">
              <Container tw="bg-green-700 hover:bg-green-300">
                <PlusIcon color="white" width="16" height="16" />
              </Container>
            </Button>
          </div>
        )}
        <TextField
          tw="w-full"
          css={[tw`border items-end rounded-[20px]`, focused ? tw`border-gray-1000` : tw`border-gray-300`]}
        >
          <TextField.TextArea
            disabled={disabled}
            value={value}
            ref={inputRef}
            placeholder={disabled ? '메시지를 입력할 수 없어요' : '메시지를 입력하세요'}
            tw="text-b2 leading-4 py-3 max-h-[106px] min-h-[40px]"
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={handleChange}
            onKeyDown={platForm === 'mobile' ? handleKeyDownMobile : handleKeyDown}
          />
          <TextField.Trailing tw="mb-2">
            <button
              disabled={value.length < 1}
              type="button"
              onClick={handleSendMessage}
              tw="w-full h-full flex items-center justify-center"
            >
              <ChatInputSubmitIcon color={value.length > 0 ? theme`colors.gray.1000` : theme`colors.gray.400`} />
            </button>
          </TextField.Trailing>
        </TextField>

        {platForm === 'pc' && !disabled && (
          <div tw="flex flex-row items-center gap-1 mt-2">
            <input
              tw="opacity-0 absolute left-0 right-0 pointer-events-none"
              ref={inputPhotoRef}
              type="file"
              multiple
              accept="image/png, image/jpg, image/jpeg"
              onChange={handleChangePhotos}
            />
            <Button variant="ghost" tw="px-1.5 h-8" onClick={openFileChooser}>
              <Container tw="bg-red-700 hover:bg-red-300">
                <PlusIcon color="white" width="16" height="16" />
              </Container>
            </Button>

            <Button variant="ghost" tw="px-1.5 h-8">
              <Container tw="bg-yellow-700 hover:bg-yellow-300">
                <PlusIcon color="white" width="16" height="16" />
              </Container>
            </Button>

            <Button variant="ghost" tw="px-1.5 h-8">
              <Container tw="bg-green-700 hover:bg-green-300">
                <PlusIcon color="white" width="16" height="16" />
              </Container>
            </Button>
          </div>
        )}
      </div>

      {openPopup && values.length > 0 && (
        <OverlayPresenter>
          <Popup>
            {!photoSending && (
              <Popup.ContentGroup tw="[text-align: center]">
                <Popup.SmallTitle>{values?.length || 0}장의 사진을 전송하시겠습니까?</Popup.SmallTitle>
                <div>
                  {(values?.length ?? 0) > 0 && (
                    <div tw="flex min-w-0 flex-wrap gap-3.5">
                      {values.map((item, index) => (
                        <div
                          key={item}
                          tw="relative w-[30%] h-24 bg-gray-100 rounded-lg bg-no-repeat bg-center bg-cover"
                          style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${item}')`,
                          }}
                        >
                          <Button
                            onClick={() => handleDeleteByIndex(index)}
                            variant="ghost"
                            size="none"
                            tw="w-5 h-5 bg-white absolute top-2 right-2 rounded-lg hover:bg-gray-400"
                          >
                            <CloseIcon />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Popup.ContentGroup>
            )}

            {photoSending && (
              <Popup.ContentGroup tw="[text-align: center]">
                <Popup.SmallTitle>전송중</Popup.SmallTitle>
                <Loading />
              </Popup.ContentGroup>
            )}

            {!photoSending && (
              <Popup.ButtonGroup>
                <Popup.ActionButton onClick={onClickSendPhotos}>전송하기</Popup.ActionButton>
                <Popup.CancelButton onClick={handleClosePopup}>취소</Popup.CancelButton>
              </Popup.ButtonGroup>
            )}
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}
