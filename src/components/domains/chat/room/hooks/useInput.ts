import { ChangeEventHandler, KeyboardEventHandler, useCallback, useState } from 'react';

import useCheckPlatform from '@/hooks/useCheckPlatform';

type UseInputProps = { callbackFn?: (message: string) => void };

export default function useInput({ callbackFn }: UseInputProps) {
  const [text, setText] = useState('');

  const { platform } = useCheckPlatform();

  const handleChangeInput = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((e) => {
    const { value } = e.target;

    setText(value);
  }, []);

  const sendMessage = useCallback(() => {
    callbackFn?.(text);
    setText('');
  }, [callbackFn, text]);

  const handleKeyDownMobile = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>((e) => {
    if (e.which !== 229) {
      // Wait until IME settled.
      if (e.key === 'Escape') {
        e.currentTarget.blur();
      } else if (e.key === 'Enter' && !e.shiftKey) {
        setText((prevMessage) => `${prevMessage}\n`);

        // If Shift key is not pressed, prevent default behavior (sending the message).
        e.preventDefault();
        // Handle the line break here if needed (e.g., append a new line to the textarea).
        // Do not call handleSendMessage() to prevent sending the message.
      }
    }
  }, []);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>(
    (e) => {
      if (e.which !== 229) {
        // Wait until IME settled.
        if (e.key === 'Escape') {
          e.currentTarget.blur();
        } else if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      }
    },
    [sendMessage],
  );

  return {
    text,
    handleChangeInput,
    setText,
    handleKeyDown: platform === 'pc' ? handleKeyDown : handleKeyDownMobile,
    sendMessage,
  };
}
