import { DatePicker } from '@/components/molecules';
import { useRef } from 'react';

interface Props {
  date?: Date | null;
  onChangeDate?: (value: Date | null) => void;
}

export default function RentEndDate({ date, onChangeDate }: Props) {
  const minDate = useRef(new Date());
  return (
    <div>
      <div>
        <div tw="flex justify-between mb-4">
          <div tw="text-b1 leading-none font-bold">기존 임대차 계약</div>
        </div>
        <div tw="flex">
          <DatePicker
            minDate={minDate.current}
            variant="outlined"
            tw="flex-1 min-w-0"
            placeholder="날짜 선택"
            value={date}
            onChange={(value) => onChangeDate?.(value)}
          />
        </div>
      </div>
    </div>
  );
}
