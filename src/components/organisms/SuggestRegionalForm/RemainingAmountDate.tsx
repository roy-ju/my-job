import { DatePicker, Dropdown } from '@/components/molecules';

export interface RemainingAmountDateProps {
  remainingAmountDate?: Date | null;
  onChangeRemainingAmountDate?: (value: Date | null) => void;
  remainingAmountDateType?: string;
  onChangeRemainingAmountDateType?: (value: string) => void;
}

export default function RemainingAmountDate({
  remainingAmountDate,
  onChangeRemainingAmountDate,
  remainingAmountDateType,
  onChangeRemainingAmountDateType,
}: RemainingAmountDateProps) {
  return (
    <div>
      <div tw="font-bold mb-4">잔금일</div>
      <div tw="flex gap-3">
        <DatePicker
          variant="outlined"
          tw="flex-1 min-w-0"
          label="날짜"
          value={remainingAmountDate}
          onChange={(v) => onChangeRemainingAmountDate?.(v)}
        />
        <Dropdown
          tw="flex-1 min-w-0"
          variant="outlined"
          value={remainingAmountDateType}
          onChange={onChangeRemainingAmountDateType}
        >
          <Dropdown.Option value="이전">이전</Dropdown.Option>
          <Dropdown.Option value="이후">이후</Dropdown.Option>
          <Dropdown.Option value="당일">당일</Dropdown.Option>
        </Dropdown>
      </div>
    </div>
  );
}
