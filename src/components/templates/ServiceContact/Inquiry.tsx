import { TextField } from '@/components/molecules';
import { ChangeEvent } from 'react';

interface IInquiryProps {
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Inquiry({ placeholder, value, onChange }: IInquiryProps) {
  return (
    <div tw="px-5 h-[calc(100%_-_88px)]">
      {/* 스토리북 ui 테스트를 위해 TextField 컴포넌트의 높이를 임시로 50%로 지정하였습니다. 30rem으로 수정해야 함. */}
      <TextField variant="outlined" tw="h-[50%]">
        <TextField.TextArea
          value={value}
          placeholder={placeholder}
          tw="placeholder:text-b2 min-h-full  max-h-full resize-none text-b2"
          onChange={onChange}
          maxLength={100}
        />
      </TextField>
      <p tw="text-info mt-1.5">{value!.length}/100</p>
    </div>
  );
}
