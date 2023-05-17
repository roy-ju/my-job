import { Button } from '@/components/atoms';
import { DatePicker, Dropdown } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { useCallback } from 'react';

export interface MoveInDateProps {
  value?: boolean | null;
  onChange?: (value: boolean) => void;
  date?: Date | null;
  dateType?: string;
  onChangeDate?: (value: Date | null) => void;
  onChangeDateType?: (value: string) => void;
}

export default function MoveInDate({
  value: valueProp,
  onChange,
  date,
  onChangeDate,
  dateType,
  onChangeDateType,
}: MoveInDateProps) {
  const [value, setValue] = useControlled({ controlled: valueProp, default: null });

  const handleChange = useCallback(
    (v: boolean) => {
      setValue(v);
      onChange?.(v);
    },
    [setValue, onChange],
  );

  return (
    <div>
      <div tw="py-7 px-5">
        <div tw="font-bold mb-4">빠른 입주 가능해요</div>
        <div tw="flex gap-3">
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === true}
            onClick={() => handleChange?.(true)}
          >
            네
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === false}
            onClick={() => handleChange?.(false)}
          >
            아니요
          </Button>
        </div>
      </div>
      {value && (
        <div tw="flex flex-col gap-4 py-7 px-5 border-t border-t-gray-300">
          <div tw="font-bold">입주가 가능한 가장 빠른 날을 선택해주세요.</div>
          <div tw="flex gap-3">
            <DatePicker
              minDate={new Date()}
              variant="outlined"
              tw="flex-1 min-w-0"
              placeholder="날짜"
              value={date}
              onChange={(v) => onChangeDate?.(v)}
            />
            <Dropdown tw="flex-1 min-w-0" variant="outlined" value={dateType} onChange={onChangeDateType}>
              <Dropdown.Option value="이전">이전</Dropdown.Option>
              <Dropdown.Option value="이후">이후</Dropdown.Option>
              <Dropdown.Option value="당일">당일</Dropdown.Option>
            </Dropdown>
          </div>
        </div>
      )}
    </div>
  );
}
