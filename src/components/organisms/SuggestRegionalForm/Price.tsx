import { TextField } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';
import { Label, Checkbox } from '@/components/atoms';

export interface PriceProps {
  buyOrRent?: number;
  price?: string;
  monthlyRentFee?: string;
  onChangePrice?: (value: string) => void;
  onChangeMonthlyRentFee?: (value: string) => void;
  hasError?: boolean;
  negotiable?: boolean;
  onChangeNegotiable?: (value: boolean) => void;
  update?: boolean;
}

export default function Price({
  buyOrRent,
  price,
  monthlyRentFee,
  onChangePrice,
  onChangeMonthlyRentFee,
  hasError,
  negotiable,
  onChangeNegotiable,
  update,
}: PriceProps) {
  return (
    <div>
      <div tw="mb-4">
        <div tw="font-bold">{update ? '거래 금액을 확인해 주세요.' : '금액을 입력해 주세요.'}</div>
      </div>
      <div tw="flex flex-col">
        {buyOrRent !== BuyOrRent.Buy ? (
          <div tw="flex flex-col gap-4">
            <div>
              <TextField variant="outlined">
                <TextField.PriceInput
                  label={price ? '보증금 가격' : '보증금 가격 입력'}
                  value={price}
                  onChange={(e) => onChangePrice?.(e.target.value)}
                />
              </TextField>
              <TextField.PriceHelperMessage tw="mr-4">{price ?? '0'}</TextField.PriceHelperMessage>
              {hasError && <TextField.ErrorMessage>보증금을 입력해 주세요.</TextField.ErrorMessage>}
            </div>
            <div>
              <TextField variant="outlined">
                <TextField.PriceInput
                  label={monthlyRentFee ? '월차임 가격' : '월차임 가격 입력'}
                  value={monthlyRentFee}
                  onChange={(e) => onChangeMonthlyRentFee?.(e.target.value)}
                />
              </TextField>
              <TextField.PriceHelperMessage tw="mr-4">{monthlyRentFee ?? '0'}</TextField.PriceHelperMessage>
            </div>
          </div>
        ) : (
          <div>
            <TextField variant="outlined">
              <TextField.PriceInput
                label={price ? '매매 가격' : '매매 가격 입력'}
                value={price}
                onChange={(e) => onChangePrice?.(e.target.value)}
              />
            </TextField>
            <TextField.PriceHelperMessage tw="mr-4">{price ?? '0'}</TextField.PriceHelperMessage>
            {hasError && <TextField.ErrorMessage>매매가를 입력해 주세요.</TextField.ErrorMessage>}
          </div>
        )}
      </div>
      {!!buyOrRent && (
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
