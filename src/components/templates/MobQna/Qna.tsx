import { TextField } from '@/components/molecules';
import { ChangeEvent } from 'react';

interface IQnaProps {
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Qna({ placeholder, value, onChange }: IQnaProps) {
  return (
    <div tw="px-5">
      <TextField variant="outlined" tw="h-[30rem]">
        <TextField.TextArea
          value={value}
          placeholder={placeholder}
          tw="placeholder:text-b2 min-h-full max-h-full resize-none text-b2"
          onChange={onChange}
          maxLength={100}
        />
      </TextField>
      <p tw="text-info mt-1.5">{value!.length}/100</p>
    </div>
  );
}
