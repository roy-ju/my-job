import { Button } from '@/components/atoms';
import { DatePicker, Dropdown } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { useCallback } from 'react';

export interface RemainingAmountProps {
  value?: boolean | null;
  onChange?: (value: boolean) => void;
  date?: Date | null;
  dateType?: string;
  onChangeDate?: (value: Date | null) => void;
  onChangeDateType?: (value: string) => void;
}

export default function RemainingAmount({
  value: valueProp,
  onChange,
  date,
  onChangeDate,
  dateType,
  onChangeDateType,
}: RemainingAmountProps) {
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
        <div tw="font-bold">잔금 기일을 앞당길 수 있으신가요?</div>
        <div tw="text-info text-gray-700 mb-4">집주인은 2023년 04월 25일을 희망해요.</div>
        <div tw="flex gap-3">
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === true}
            onClick={() => handleChange?.(true)}
          >
            가능
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === false}
            onClick={() => handleChange?.(false)}
          >
            불가능
          </Button>
        </div>
      </div>
      {value && (
        <div tw="flex flex-col gap-4 py-7 px-5 border-t border-t-gray-300">
          <div tw="font-bold">잔금 지급이 가능한 날을 선택해주세요.</div>
          <div tw="flex gap-3">
            <DatePicker
              variant="outlined"
              tw="flex-1 min-w-0"
              label="날짜"
              value={date}
              onChange={(v) => onChangeDate?.(v)}
            />
            <Dropdown tw="flex-1 min-w-0" variant="outlined" value={dateType} onChange={onChangeDateType}>
              <Dropdown.Option value="이전">이전</Dropdown.Option>
              <Dropdown.Option value="이후">이후</Dropdown.Option>
            </Dropdown>
          </div>
        </div>
      )}
    </div>
  );
}
