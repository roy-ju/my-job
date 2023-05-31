import { TextField } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';

export interface PriceProps {
  buyOrRent?: number;
  price?: string;
  monthlyRentFee?: string;
  onChangePrice?: (value: string) => void;
  onChangeMonthlyRentFee?: (value: string) => void;
}

export default function Price({ buyOrRent, price, monthlyRentFee, onChangePrice, onChangeMonthlyRentFee }: PriceProps) {
  return (
    <div>
      <div tw="mb-4">
        <div tw="font-bold">매물의 가격대를 알려주세요.</div>
      </div>
      <div tw="flex flex-col">
        {buyOrRent === BuyOrRent.Jeonsae ? (
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
          </div>
        )}
      </div>
      <div tw="text-info text-gray-700 mt-4">
        희망하시는 가격을 기준으로 거래 가능한 매물을 추천해드립니다. 시세와 과도하게 차이가 나는 가격을 제시하면
        추천받을 수 있는 매물 수가 적거나 없을 수 있습니다
      </div>
    </div>
  );
}
