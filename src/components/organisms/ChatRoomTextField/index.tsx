import { TextField } from '@/components/molecules';
import ChatInputSubmitIcon from '@/assets/icons/chat_input_submit.svg';
import tw, { theme } from 'twin.macro';
import { ChangeEventHandler, useCallback, useState } from 'react';

export default function ChatRoomTextField() {
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

  return (
    <TextField css={[tw`border items-end rounded-[20px]`, focused ? tw`border-gray-1000` : tw`border-gray-300`]}>
      <TextField.TextArea
        placeholder="메시지를 입력하세요"
        tw="text-b2 leading-4 py-3 placeholder:text-gray-700 max-h-[106px]"
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
      />
      <TextField.Trailing tw="mb-2">
        <button disabled={value.length > 0} type="button" tw="w-full h-full flex items-center justify-center">
          <ChatInputSubmitIcon color={value.length > 0 ? theme`colors.gray.1000` : theme`colors.gray.400`} />
        </button>
      </TextField.Trailing>
    </TextField>
  );
}
