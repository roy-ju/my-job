import React from 'react';
import { Label, Checkbox, Radio } from '@/components/atoms';
import { BuyOrRent as BuyOrRentType } from '@/constants/enums';
import { TextField, RadioGroup } from '@/components/molecules';

interface Props {
  value?: number;
  onChange?: (value: number) => void;
  price?: string;
  monthlyRentFee?: string;
  onChangePrice?: (value: string) => void;
  onChangeMonthlyRentFee?: (value: string) => void;
  negotiable?: boolean;
  onChangeNegotiable?: (value: boolean) => void;
  quickSale?: string;
  onChangeQuickSale?: (value: string) => void;
  hasError?: boolean;
  update?: boolean;
  buyOrRent?: number;
}

enum QuickSaleType {
  QuickSale = '1',
}

export default function Price({
  price,
  monthlyRentFee,
  onChangeMonthlyRentFee,
  onChangePrice,
  negotiable,
  onChangeNegotiable,
  quickSale,
  onChangeQuickSale,
  hasError,
  update,
  buyOrRent,
}: Props) {
  return (
    <div>
      <div tw="mb-4">
        <div tw="font-bold">{update ? '거래 금액을 확인해 주세요.' : '거래 종류 및 금액을 입력해 주세요.'}</div>
      </div>
      <div tw="flex flex-col mt-7">
        {buyOrRent === BuyOrRentType.Jeonsae && (
          <div tw="flex flex-col gap-4">
            <div>
              <TextField variant="outlined" hasError={hasError}>
                <TextField.PriceInput
                  label={price ? '보증금' : '보증금 입력'}
                  value={price}
                  onChange={(e) => onChangePrice?.(e.target.value)}
                />
              </TextField>
              <TextField.PriceHelperMessage tw="mr-4">{price ?? '0'}</TextField.PriceHelperMessage>
              {hasError && <TextField.ErrorMessage>보증금을 입력해주세요.</TextField.ErrorMessage>}
            </div>
            <div>
              <TextField variant="outlined">
                <TextField.PriceInput
                  label={monthlyRentFee ? '월차임' : '월차임 입력'}
                  value={monthlyRentFee}
                  onChange={(e) => onChangeMonthlyRentFee?.(e.target.value)}
                />
              </TextField>
              <TextField.PriceHelperMessage tw="mr-4">{monthlyRentFee ?? '0'}</TextField.PriceHelperMessage>
            </div>
          </div>
        )}{' '}
        {buyOrRent === BuyOrRentType.Buy && (
          <div>
            <RadioGroup
              tw="flex gap-4 mb-4"
              value={quickSale}
              onChange={(e) => {
                onChangeQuickSale?.(e.target.value);
                onChangePrice?.('');
              }}
            >
              <Label control={<Radio />} value="0" label="금액 입력" />
              <Label control={<Radio />} value="1" label="급매물 제안받을래요." />
            </RadioGroup>

            <TextField variant="outlined" hasError={hasError}>
              <TextField.PriceInput
                label={price ? '매매가' : '매매가 입력'}
                value={price}
                onChange={(e) => onChangePrice?.(e.target.value)}
                disabled={quickSale === QuickSaleType.QuickSale}
              />
            </TextField>
            <TextField.PriceHelperMessage tw="mr-4">{price ?? '0'}</TextField.PriceHelperMessage>
            {hasError && <TextField.ErrorMessage>매매가를 입력해주세요.</TextField.ErrorMessage>}
          </div>
        )}
      </div>

      {!!buyOrRent && quickSale !== QuickSaleType.QuickSale && (
        <>
          <div tw="mt-4">
            <Label
              checked={negotiable}
              onChange={(e) => onChangeNegotiable?.(e.target.checked)}
              label="금액 협의 가능해요."
              control={<Checkbox name="negotiable" />}
            />
          </div>
          <div tw="text-info text-gray-700 mt-4">
            실거래가를 참고하여 합리적 가격을 제시할 경우 거래가능성이 높아집니다.
          </div>
        </>
      )}
    </div>
  );
}
