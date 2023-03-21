import { TextField } from '@/components/molecules';
import ChatInputSubmitIcon from '@/assets/icons/chat_input_submit.svg';
import tw, { theme } from 'twin.macro';
import { ChangeEventHandler, KeyboardEventHandler, useCallback, useState } from 'react';

interface Props {
  disabled?: boolean;
  inputRef?: (element: HTMLTextAreaElement | null) => void;
  onSendMessage?: (message: string) => void;
}

export default function ChatRoomTextField({ disabled = false, inputRef, onSendMessage }: Props) {
  const [value, setValue] = useState('');

  const [focused, setFocused] = useState(false);

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

  return (
    <TextField css={[tw`border items-end rounded-[20px]`, focused ? tw`border-gray-1000` : tw`border-gray-300`]}>
      <TextField.TextArea
        disabled={disabled}
        value={value}
        ref={inputRef}
        placeholder={disabled ? '메시지를 입력할 수 없어요' : '메시지를 입력하세요'}
        tw="text-b2 leading-4 py-3 placeholder:text-gray-700 max-h-[106px]"
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
  );
}
