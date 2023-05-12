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
        <div tw="font-bold">추천받고 싶은 매물의 가격을 알려주세요</div>
      </div>
      <div tw="flex flex-col">
        {buyOrRent === BuyOrRent.Jeonsae ? (
          <div tw="flex flex-col gap-4">
            <div>
              <TextField variant="outlined">
                <TextField.PriceInput label="보증금" value={price} onChange={(e) => onChangePrice?.(e.target.value)} />
              </TextField>
              <TextField.PriceHelperMessage tw="mr-4">{price ?? '0'}</TextField.PriceHelperMessage>
            </div>
            <div>
              <TextField variant="outlined">
                <TextField.PriceInput
                  label="월차임 가격"
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
                label={buyOrRent === BuyOrRent.Jeonsae ? '전세금' : '매매가'}
                value={price}
                onChange={(e) => onChangePrice?.(e.target.value)}
              />
            </TextField>
            <TextField.PriceHelperMessage tw="mr-4">{price ?? '0'}</TextField.PriceHelperMessage>
          </div>
        )}
      </div>
      <div tw="text-info text-gray-700 mt-3">
        허위가격 입력으로 정상적인 거래진행 및 중개사님의 업무에 영향이 갈것으로 판단될 경우, 요청/요청이 삭제될 수
        있습니다.
      </div>
    </div>
  );
}
