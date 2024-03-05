import { useState, useCallback } from 'react';

import tw, { theme } from 'twin.macro';

import { Button } from '@/components/atoms';

import { TextField } from '@/components/molecules';

import PhotoIcon from '@/assets/icons/photo.svg';

import ChatInputSubmitIcon from '@/assets/icons/chat_input_submit.svg';

import useSendMessageHandler from './hooks/useSendMessageHandler';

import useInput from './hooks/useInput';

type SendMessageProps = { handleSendMessage: (v: string) => void };

export default function SendMessage({ handleSendMessage }: SendMessageProps) {
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const { inputPhotoRef, disabled, handleChangePhotos, openFileChooser } = useSendMessageHandler();

  const { text, handleChangeInput, handleKeyDown, sendMessage } = useInput({ callbackFn: handleSendMessage });

  return (
    <div tw="pb-10 [box-shadow:  0px 0px 24px 0px #00000014;]">
      <div tw="px-5 pt-4">
        <div tw="flex items-center gap-4">
          <input
            tw="opacity-0 absolute left-0 right-0 pointer-events-none"
            ref={inputPhotoRef}
            type="file"
            multiple
            accept="image/png, image/jpg, image/jpeg, image/jfif"
            onChange={handleChangePhotos}
          />
          {!disabled && (
            <Button variant="ghost" tw="p-0 h-fit" onClick={openFileChooser}>
              <PhotoIcon />
            </Button>
          )}
          <TextField
            tw="w-full"
            css={[tw`border items-end rounded-[20px]`, focused ? tw`border-gray-1000` : tw`border-gray-300`]}
          >
            <TextField.TextArea
              disabled={disabled}
              value={text}
              placeholder={disabled ? '메시지를 입력할 수 없어요' : '메시지를 입력하세요'}
              tw="text-b2 leading-4 py-3 max-h-[106px] min-h-[40px]"
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={handleChangeInput}
              onKeyDown={handleKeyDown}
            />
            <TextField.Trailing tw="mb-2">
              <button
                disabled={disabled || text.length < 1}
                type="button"
                onClick={sendMessage}
                tw="w-full h-full flex items-center justify-center"
              >
                <ChatInputSubmitIcon
                  color={
                    disabled
                      ? theme`colors.gray.400`
                      : text.length > 0
                      ? theme`colors.gray.1000`
                      : theme`colors.gray.400`
                  }
                />
              </button>
            </TextField.Trailing>
          </TextField>
        </div>
      </div>
    </div>
  );
}
