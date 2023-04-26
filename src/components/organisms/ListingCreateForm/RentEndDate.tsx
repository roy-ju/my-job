import { DatePicker } from '@/components/molecules';

interface Props {
  date?: Date | null;
  onChangeDate?: (value: Date | null) => void;
}

export default function RentEndDate({ date, onChangeDate }: Props) {
  return (
    <div>
      <div>
        <div tw="flex justify-between mb-4">
          <div tw="text-b1 leading-none font-bold">기존 임대차 계약</div>
        </div>
        <div tw="flex">
          <DatePicker
            variant="outlined"
            tw="flex-1 min-w-0"
            placeholder="종료일"
            value={date}
            onChange={(value) => onChangeDate?.(value)}
          />
        </div>
      </div>
    </div>
  );
}
