import { Label, Radio } from '@/components/atoms';
import { Dropdown, RadioGroup, TextField } from '@/components/molecules';
import { useState } from 'react';

interface Props {
  date?: string;
  beforeOrAfter?: string;
  onChangeType?: (value: string) => void;
  onChangeDate?: (value: string) => void;
  onChangeBeforeOrAfter?: (value: string) => void;
}

export default function Schedule({ date, beforeOrAfter, onChangeDate, onChangeBeforeOrAfter }: Props) {
  const [type, setType] = useState('0');

  return (
    <div>
      <div>
        <div tw="flex justify-between mb-4">
          <div tw="text-info">일정</div>
        </div>
        <RadioGroup
          tw="flex gap-4 mb-4"
          value={type}
          onChange={(e) => {
            if (e.target.value === '0') {
              onChangeDate?.('');
              onChangeBeforeOrAfter?.('이전');
            }
            setType(e.target.value);
          }}
        >
          <Label control={<Radio />} value="0" label="협의 후 결정" />
          <Label control={<Radio />} value="1" label="날짜 지정" />
        </RadioGroup>
        {type === '1' && (
          <div tw="flex gap-3">
            <TextField tw="flex-1 min-w-0" variant="outlined">
              <TextField.Input label="날짜" value={date} onChange={(e) => onChangeDate?.(e.target.value)} />
            </TextField>
            <Dropdown tw="flex-1 min-w-0" variant="outlined" value={beforeOrAfter} onChange={onChangeBeforeOrAfter}>
              <Dropdown.Option value="이전">이전</Dropdown.Option>
              <Dropdown.Option value="이후">이후</Dropdown.Option>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
}
