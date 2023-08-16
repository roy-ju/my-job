import { Numeral } from '@/components/atoms';
import { Tabs, TextField } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';

interface Props {
  buyOrRent?: number;
  listingPrice?: number;
  listingMonthlyRentFee?: number;
  price?: string;
  onChangePrice?: (value: string) => void;
  monthlyRentFee?: string;
  onChangeMonthlyRentFee?: (value: string) => void;
  tabValue?: number;
  onChangeTabValue?: (value: number) => void;
}

export default function Price({
  listingPrice,
  listingMonthlyRentFee,
  buyOrRent,
  tabValue,
  onChangeTabValue,
  price,
  onChangePrice,
  monthlyRentFee,
  onChangeMonthlyRentFee,
}: Props) {
  const priceInputLabelText = (() => {
    if (buyOrRent === BuyOrRent.Wolsae) {
      return price ? '보증금' : '보증금 입력';
    }

    if (buyOrRent === BuyOrRent.Jeonsae) {
      return price ? '전세 제안가' : '전세 제안가 입력';
    }
    return price ? '매매 제안가' : '매매 제안가 입력';
  })();

  return (
    <div tw="py-10 px-5">
      <div tw="font-bold">
        현재 집주인 희망가는
        <br />
        {buyOrRent === BuyOrRent.Wolsae ? (
          <span tw="text-nego-1000">
            <Numeral koreanNumber>{listingPrice}</Numeral> / <Numeral koreanNumber>{listingMonthlyRentFee}</Numeral>
            {' 원'}
          </span>
        ) : (
          <span tw="text-nego-1000">
            <Numeral koreanNumber>{listingPrice}</Numeral>
            {' 원'}
          </span>
        )}{' '}
        이에요.
      </div>
      <div tw="my-5">
        <Tabs variant="contained" value={tabValue} onChange={onChangeTabValue}>
          <Tabs.Tab value={1}>네고가 제안</Tabs.Tab>
          <Tabs.Tab value={2}>네고없이 거래</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs>
      </div>
      {tabValue === 1 && (
        <div tw="flex flex-col gap-3">
          <div tw="font-bold text-b1">어느 정도 가격에 네고를 제안하고 싶으신가요?</div>
          <div>
            <TextField variant="outlined">
              <TextField.PriceInput
                value={price}
                onChange={(e) => onChangePrice?.(e.target.value)}
                label={priceInputLabelText}
              />
            </TextField>
            <TextField.PriceHelperMessage tw="mr-4">{price ?? '0'}</TextField.PriceHelperMessage>
          </div>
          {buyOrRent === BuyOrRent.Wolsae && (
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
          )}
          <div tw="flex flex-col gap-2 text-info text-gray-700">
            <div>
              허위가격 입력으로 정상적인 거래진행 및 중개사님의 업무에 영향이 갈것으로 판단될 경우, 요청이 삭제될 수
              있습니다.
            </div>
            <div>거래와 관련된 추가 조건을 입력하시면, 위 제안가로 거래가능성이 높아질 수 있습니다.</div>
          </div>
        </div>
      )}
      {tabValue === 2 && <div tw="font-bold">집주인의 희망가에 거래를 진행하시겠습니까?</div>}
    </div>
  );
}
