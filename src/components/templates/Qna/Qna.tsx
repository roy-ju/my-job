import { TextField } from '@/components/molecules';
import React, { ChangeEvent } from 'react';

interface IQnaProps {
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Qna({ placeholder, value, onChange }: IQnaProps) {
  return (
    <div tw="px-5 mt-7">
      <TextField variant="outlined">
        <TextField.TextArea
          value={value}
          placeholder={placeholder}
          tw="placeholder:text-b2 min-h-[74px] text-b2"
          onChange={onChange}
          spellCheck={false}
        />
      </TextField>
      <TextField.HelperMessage>{value!.length}/100</TextField.HelperMessage>
    </div>
  );
}
