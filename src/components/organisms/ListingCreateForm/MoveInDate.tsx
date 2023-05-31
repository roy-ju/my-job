import { Label, Radio } from '@/components/atoms';
import { DatePicker, Dropdown, RadioGroup } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { useCallback, useEffect } from 'react';

interface Props {
  date?: Date | null;
  dateType?: string;
  hasDate?: string;
  onChangeDate?: (value: Date | null) => void;
  onChangeDateType?: (value: string) => void;
  onChangeHasDate?: (value: string) => void;
}

export default function MoveInDate({
  date,
  dateType,
  hasDate,
  onChangeDate,
  onChangeDateType,
  onChangeHasDate,
}: Props) {
  const [type, setType] = useControlled({
    controlled: hasDate,
    default: '0',
  });

  const handleChangeHasDate = useCallback(
    (value: string) => {
      setType(value);
      onChangeHasDate?.(value);
    },
    [onChangeHasDate, setType],
  );

  useEffect(() => {
    if (date && type === '0') {
      handleChangeHasDate('1');
    }
  }, [date, type, handleChangeHasDate]);

  return (
    <div>
      <div>
        <div tw="flex justify-between mb-3">
          <div tw="text-b1 leading-none font-bold">입주 가능 시기</div>
        </div>
        <RadioGroup
          tw="flex gap-4 mb-4"
          value={type}
          onChange={(e) => {
            if (e.target.value === '0') {
              onChangeDate?.(null);
              onChangeDateType?.('이전');
            }
            handleChangeHasDate(e.target.value);
          }}
        >
          <Label control={<Radio />} value="0" label="즉시 입주 가능" />
          <Label control={<Radio />} value="1" label="날짜 지정" />
        </RadioGroup>
        {type === '1' && (
          <div tw="flex gap-3">
            <DatePicker
              variant="outlined"
              tw="flex-1 min-w-0"
              placeholder="날짜"
              value={date}
              onChange={(value) => onChangeDate?.(value)}
              minDate={new Date()}
            />
            <Dropdown tw="flex-1 min-w-0" variant="outlined" value={dateType} onChange={onChangeDateType}>
              <Dropdown.Option value="이전">이전</Dropdown.Option>
              <Dropdown.Option value="이후">이후</Dropdown.Option>
              <Dropdown.Option value="당일">당일</Dropdown.Option>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
}
