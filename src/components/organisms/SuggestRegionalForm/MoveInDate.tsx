import { DatePicker, Dropdown } from '@/components/molecules';

export interface DateProps {
  moveInDate?: Date | null;
  onChangeMoveInDate?: (value: Date | null) => void;
  moveInDateType?: string;
  onChangeMoveInDateType?: (value: string) => void;
}

export default function MoveInDate({
  moveInDate,
  onChangeMoveInDate,
  moveInDateType,
  onChangeMoveInDateType,
}: DateProps) {
  return (
    <div>
      <div tw="font-bold mb-4">입주일</div>
      <div tw="flex gap-3">
        <DatePicker
          variant="outlined"
          tw="flex-1 min-w-0"
          placeholder="날짜"
          value={moveInDate}
          onChange={(v) => onChangeMoveInDate?.(v)}
        />
        <Dropdown tw="flex-1 min-w-0" variant="outlined" value={moveInDateType} onChange={onChangeMoveInDateType}>
          <Dropdown.Option value="이전">이전</Dropdown.Option>
          <Dropdown.Option value="이후">이후</Dropdown.Option>
          <Dropdown.Option value="당일">당일</Dropdown.Option>
        </Dropdown>
      </div>
    </div>
  );
}
