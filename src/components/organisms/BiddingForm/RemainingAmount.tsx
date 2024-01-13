import { Button, Moment } from '@/components/atoms';
import { DatePicker, Dropdown } from '@/components/molecules';
import useControlled from '@/hooks/useControlled';
import { useCallback, useRef } from 'react';
import tw from 'twin.macro';

export interface RemainingAmountProps {
  listingRemainingAmountDate?: string | null;

  value?: boolean | null;
  onChange?: (value: boolean) => void;
  date?: Date | null;
  dateType?: string;
  onChangeDate?: (value: Date | null) => void;
  onChangeDateType?: (value: string) => void;
}

export default function RemainingAmount({
  listingRemainingAmountDate = null,

  value: valueProp,
  onChange,
  date,
  onChangeDate,
  dateType,
  onChangeDateType,
}: RemainingAmountProps) {
  const [value, setValue] = useControlled({ controlled: valueProp, default: null });
  const minDate = useRef(new Date());
  const handleChange = useCallback(
    (v: boolean) => {
      setValue(v);
      onChange?.(v);
    },
    [setValue, onChange],
  );

  const shouldShowYesOrNo = listingRemainingAmountDate !== null;
  const shouldShowDateField = !shouldShowYesOrNo || value === true;

  return (
    <div>
      {listingRemainingAmountDate !== null && (
        <div tw="py-7 px-5">
          <div tw="font-bold">잔금 기일을 앞당길 수 있으신가요?</div>
          {listingRemainingAmountDate && (
            <div tw="text-info text-gray-700">
              집주인은 <Moment format="yyyy년 MM월 DD일">{listingRemainingAmountDate}</Moment>을 희망해요.
            </div>
          )}
          <div tw="flex gap-3 mt-4">
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
      )}
      {shouldShowDateField && (
        <div css={[tw`flex flex-col gap-4 px-5 py-7`, shouldShowYesOrNo && tw`border-t border-t-gray-300`]}>
          <div tw="font-bold">잔금 지급이 가능한 날을 선택해주세요.</div>
          <div tw="flex gap-3">
            <DatePicker
              variant="outlined"
              tw="flex-1 min-w-0"
              placeholder="날짜"
              value={date}
              minDate={minDate.current}
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
