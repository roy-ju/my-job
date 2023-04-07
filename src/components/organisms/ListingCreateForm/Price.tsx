import { TextField } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';
import { useControlled } from '@/hooks/utils';
import { ChangeEventHandler, useCallback } from 'react';
import QuestionIcon from '@/assets/icons/question.svg';
import { Button } from '@/components/atoms';

interface PriceProps {
  buyOrRent: number;
  price?: string;
  monthlyRentFee?: string;
  onChangePrice?: (newValue: string) => void;
  onChangeMonthlyRentFee?: (newValue: string) => void;
  onClickQuestion?: () => void;
}

export default function Price({
  buyOrRent,
  price: priceProp,
  monthlyRentFee: monthlyRentFeeProp,
  onChangePrice,
  onChangeMonthlyRentFee,
  onClickQuestion,
}: PriceProps) {
  const [price, setPrice] = useControlled({ controlled: priceProp, default: '' });
  const [monthlyRentFee, setMonthlyRentFee] = useControlled({ controlled: monthlyRentFeeProp, default: '' });

  const handleChangePrice = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setPrice(e.target.value);
      onChangePrice?.(e.target.value);
    },
    [setPrice, onChangePrice],
  );

  const handleChangeMonthlyRentFee = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setMonthlyRentFee(e.target.value);
      onChangeMonthlyRentFee?.(e.target.value);
    },
    [setMonthlyRentFee, onChangeMonthlyRentFee],
  );

  return (
    <div>
      <div tw="mb-3 flex items-center gap-1">
        <div tw="text-b1 leading-none font-bold">희망가</div>
        <Button variant="ghost" size="none" tw="pb-px" onClick={onClickQuestion}>
          <QuestionIcon />
        </Button>
      </div>
      <div tw="text-info text-gray-700">가격협상 중에는 언제든 희망가를 수정할 수 있습니다.</div>
      <div tw="mt-3 flex flex-col gap-4">
        <TextField variant="outlined">
          <TextField.Input label="매매가" value={price} onChange={handleChangePrice} />
        </TextField>
        {buyOrRent === BuyOrRent.Wolsae && (
          <TextField variant="outlined">
            <TextField.Input label="월차임" value={monthlyRentFee} onChange={handleChangeMonthlyRentFee} />
          </TextField>
        )}
      </div>
    </div>
  );
}
