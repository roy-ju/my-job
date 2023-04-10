import React, { useCallback, ChangeEventHandler } from 'react';
import { useControlled } from '@/hooks/utils';
import { TextField } from '@/components/molecules';

interface DescriptionsProps {
  value?: string;
  onChangeValue?: (value: string) => void;
}

export default function Description({ value, onChangeValue }: DescriptionsProps) {
  const [descriptions, setDescriptions] = useControlled({ controlled: value, default: '' });

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (e) => {
      if (e.target.value.length > 100) {
        return;
      }
      setDescriptions(e.target.value);
      onChangeValue?.(e.target.value);
    },
    [setDescriptions, onChangeValue],
  );

  return (
    <div>
      <div tw="text-b1 leading-none font-bold">특이사항 및 매물 설명</div>
      <div tw="mt-4">
        <TextField variant="outlined" size="medium">
          <TextField.TextArea
            value={descriptions}
            onChange={handleChange}
            tw="min-h-[72px]"
            placeholder="내용을 입력하세요&#13;&#10;매물에 대한 문의는 중개사에게 문의하기를 이용하세요"
            spellCheck="false"
          />
        </TextField>
        <TextField.HelperMessage>{descriptions.length} / 100</TextField.HelperMessage>
      </div>
    </div>
  );
}
