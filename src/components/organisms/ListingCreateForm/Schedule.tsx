import { Label, Radio } from '@/components/atoms';
import { DatePicker, Dropdown, RadioGroup } from '@/components/molecules';
import { useEffect, useState } from 'react';

interface Props {
  date?: Date | null;
  dateType?: string;
  onChangeType?: (value: string) => void;
  onChangeDate?: (value: Date | null) => void;
  onChangeDateType?: (value: string) => void;
}

export default function Schedule({ date, dateType, onChangeDate, onChangeDateType }: Props) {
  const [type, setType] = useState('0');

  useEffect(() => {
    if (date && type === '0') {
      setType('1');
    }
  }, [date, type]);

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
              onChangeDate?.(null);
              onChangeDateType?.('이전');
            }
            setType(e.target.value);
          }}
        >
          <Label control={<Radio />} value="0" label="협의 후 결정" />
          <Label control={<Radio />} value="1" label="날짜 지정" />
        </RadioGroup>
        {type === '1' && (
          <div tw="flex gap-3">
            <DatePicker
              variant="outlined"
              tw="flex-1 min-w-0"
              label="날짜"
              value={date}
              onChange={(value) => onChangeDate?.(value)}
            />
            <Dropdown tw="flex-1 min-w-0" variant="outlined" value={dateType} onChange={onChangeDateType}>
              <Dropdown.Option value="이전">이전</Dropdown.Option>
              <Dropdown.Option value="이후">이후</Dropdown.Option>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
}
