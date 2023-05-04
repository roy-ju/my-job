import { Button, Numeral } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import getPercentOf from '@/utils/getPercentOf';
import { ChangeEventHandler, useCallback, useMemo } from 'react';

export interface InterimAmountProps {
  listingPrice?: number;
  listingInterimAmount?: number;

  value?: boolean | null;
  onChange?: (value: boolean) => void;
  amount?: string;
  onChangeAmount?: (value: string) => void;
}

export default function InterimAmount({
  listingPrice = 0,
  listingInterimAmount = 0,

  value: valueProp,
  amount: amountProp,
  onChange,
  onChangeAmount,
}: InterimAmountProps) {
  const [value, setValue] = useControlled({ controlled: valueProp, default: null });
  const [amount, setAmount] = useControlled({ controlled: amountProp, default: '' });

  const handleChange = useCallback(
    (v: boolean) => {
      setValue(v);
      onChange?.(v);
    },
    [setValue, onChange],
  );

  const handleChangeAmount = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setAmount(e.target.value);
      onChangeAmount?.(e.target.value);
    },
    [setAmount, onChangeAmount],
  );

  const percentage = useMemo(
    () => getPercentOf(listingInterimAmount, listingPrice),
    [listingPrice, listingInterimAmount],
  );

  return (
    <div>
      <div tw="py-7 px-5">
        <div tw="font-bold">중도금을 더 지급할 수 있으신가요?</div>
        <div tw="text-info text-gray-700 mb-4">
          집주인은 실지급금액의 {percentage}%(<Numeral koreanNumber>{listingInterimAmount}</Numeral>)를 희망해요
        </div>
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
          <div tw="font-bold">총 넣을 수 있는 중도금을 적어주세요.</div>
          <div>
            <TextField variant="outlined">
              <TextField.PriceInput label="중도금" value={amount} onChange={handleChangeAmount} />
            </TextField>
            <TextField.PriceHelperMessage>{amount}</TextField.PriceHelperMessage>
          </div>
        </div>
      )}
    </div>
  );
}
