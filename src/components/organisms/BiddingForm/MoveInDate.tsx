import { DatePicker, Dropdown } from '@/components/molecules';
import { useRef } from 'react';

export interface MoveInDateProps {
  value?: boolean | null;
  onChange?: (value: boolean) => void;
  date?: Date | null;
  dateType?: string;
  onChangeDate?: (value: Date | null) => void;
  onChangeDateType?: (value: string) => void;
}

export default function MoveInDate({ date, onChangeDate, dateType, onChangeDateType }: MoveInDateProps) {
  const minDate = useRef(new Date());
  return (
    <div tw="flex flex-col gap-4 py-7 px-5">
      <div tw="font-bold">입주가 가능한 가장 빠른 날을 선택해주세요.</div>
      <div tw="flex gap-3">
        <DatePicker
          minDate={minDate.current}
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
  );
}
