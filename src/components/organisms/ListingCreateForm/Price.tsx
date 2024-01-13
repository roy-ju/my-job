import { TextField } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';
import useControlled from '@/hooks/useControlled';
import { ChangeEventHandler, useCallback, useMemo } from 'react';
import CheckIcon from '@/assets/icons/check.svg';
import { Button } from '@/components/atoms';
import CloseContained from '@/assets/icons/close_contained.svg';

interface PriceProps {
  buyOrRent: number;
  price?: string;
  monthlyRentFee?: string;
  quickSale?: boolean;
  onChangePrice?: (newValue: string) => void;
  onChangeMonthlyRentFee?: (newValue: string) => void;
  onChangeQuickSale?: (newValue: boolean) => void;
  onClickQuestion?: () => void;
}

export default function Price({
  buyOrRent,
  price: priceProp,
  monthlyRentFee: monthlyRentFeeProp,
  quickSale: quickSaleProp,
  onChangePrice,
  onChangeMonthlyRentFee,
  onChangeQuickSale,
}: PriceProps) {
  const [price, setPrice] = useControlled({ controlled: priceProp, default: '' });
  const [monthlyRentFee, setMonthlyRentFee] = useControlled({ controlled: monthlyRentFeeProp, default: '' });
  const [quickSale, setQuickSale] = useControlled({ controlled: quickSaleProp, default: false });

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

  const handleDeletePrice = useCallback(() => {
    setPrice('');
    onChangePrice?.('');
  }, [setPrice, onChangePrice]);

  const handleDeleteMonthlyRentFee = useCallback(() => {
    setMonthlyRentFee('');
    onChangeMonthlyRentFee?.('');
  }, [setMonthlyRentFee, onChangeMonthlyRentFee]);

  const handleChangeQuickSale = useCallback(
    (value: boolean) => {
      setQuickSale(value);
      onChangeQuickSale?.(value);
    },
    [setQuickSale, onChangeQuickSale],
  );

  const priceLabel: string = useMemo(() => {
    if (buyOrRent === BuyOrRent.Buy) return price ? '매매가' : '매매가 입력';
    if (buyOrRent === BuyOrRent.Jeonsae) return price ? '전세금' : '전세금 입력';
    return price ? '보증금' : '보증금 입력';
  }, [buyOrRent, price]);

  const priceLabelMonthlyRentFee: string = useMemo(() => (price ? '월차임' : '월차임 입력'), [price]);

  return (
    <div>
      <div tw="mb-3 flex items-center">
        <div tw="text-b1 leading-none font-bold">희망가</div>
        {buyOrRent === BuyOrRent.Buy && (
          <Button
            size="small"
            variant="gray"
            tw="ml-auto"
            selected={quickSale}
            onClick={() => handleChangeQuickSale(!quickSale)}
          >
            <CheckIcon tw="mr-2 text-gray-600" />
            급매
          </Button>
        )}
      </div>
      <div tw="text-info text-gray-700">
        {buyOrRent === BuyOrRent.Buy ? (
          <p>
            가격협상 중에는 언제든 희망가를 수정할 수 있습니다.
            <br />
            급매 표시 및 변경은 중개사를 통하여 가능합니다.
            <br />
            급매인 경우, 평균가 대비 할인율 등이 표시될 수 있습니다.
          </p>
        ) : (
          <p>가격협상 중에는 언제든 희망가를 수정할 수 있습니다.</p>
        )}
      </div>
      <div tw="mt-3 flex flex-col gap-4">
        <div>
          <TextField variant="outlined" tw="relative">
            <TextField.PriceInput label={priceLabel} value={price} onChange={handleChangePrice} />
            {price && (
              <TextField.Trailing tw="absolute right-12 bottom-3 cursor-pointer" onClick={handleDeletePrice}>
                <CloseContained />
              </TextField.Trailing>
            )}
          </TextField>
          <TextField.PriceHelperMessage tw="mr-4">{price}</TextField.PriceHelperMessage>
        </div>
        {buyOrRent === BuyOrRent.Wolsae && (
          <div>
            <TextField variant="outlined">
              <TextField.PriceInput
                label={priceLabelMonthlyRentFee}
                value={monthlyRentFee}
                onChange={handleChangeMonthlyRentFee}
              />
              {monthlyRentFee && (
                <TextField.Trailing tw="absolute right-12 bottom-3 cursor-pointer" onClick={handleDeleteMonthlyRentFee}>
                  <CloseContained />
                </TextField.Trailing>
              )}
            </TextField>
            <TextField.PriceHelperMessage tw="mr-4">{monthlyRentFee}</TextField.PriceHelperMessage>
          </div>
        )}
      </div>
    </div>
  );
}
