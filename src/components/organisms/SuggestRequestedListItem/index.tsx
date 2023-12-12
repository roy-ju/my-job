import { GetMySuggestListResponse } from '@/apis/suggest/getMySuggestList';
import { Chip, Moment, Numeral } from '@/components/atoms';
import { RealestateType, BuyOrRent } from '@/constants/enums';
import { RealestateTypeString } from '@/constants/strings';
import { useCallback, useMemo } from 'react';
import ChevronIcon from '@/assets/icons/my_chevron_16_black.svg';
import NewIcon from '@/assets/icons/new.svg';

const chipVariantByRealestateType: Record<number, 'nego' | 'green' | 'red' | 'blue' | 'orange'> = {
  [RealestateType.Apartment]: 'nego',
  [RealestateType.Officetel]: 'green',
  [RealestateType.Dandok]: 'red',
  [RealestateType.Dagagoo]: 'blue',
  [RealestateType.Yunrip]: 'orange',
  [RealestateType.Dasaedae]: 'orange',
};

interface Props {
  item?: NonNullable<GetMySuggestListResponse['list']>[0];
  onClick?: () => void;
}

function PriceText({
  tradeOrDepositPrice,
  monthlyRentFee,
  quickSale,
}: {
  tradeOrDepositPrice: number;
  monthlyRentFee: number;
  quickSale: boolean;
}) {
  if (quickSale) return <span>급매 구해요</span>;

  if (monthlyRentFee) {
    return (
      <>
        <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral> / <Numeral koreanNumber>{monthlyRentFee}</Numeral>
      </>
    );
  }
  return <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral>;
}

function NegotiableChip() {
  return (
    <div tw="text-gray-900 rounded text-info [font-size: 11px] bg-white px-1.5 h-5 border border-gray-300">
      협의가능
    </div>
  );
}

export default function SuggestRequestedListItem({ item, onClick }: Props) {
  const buyOrRentText = Number(item?.buy_or_rents) === BuyOrRent.Buy ? '매매' : '전월세';

  const realestateTypes = useMemo(
    () =>
      Array.from(
        new Set(
          item?.realestate_types
            ?.split(',')
            .map((d) => Number(d))
            .map((d) => (d === RealestateType.Yunrip ? RealestateType.Dasaedae : d)) ?? [],
        ),
      ),
    [item?.realestate_types],
  );

  const pyoungText = useCallback((d?: NonNullable<GetMySuggestListResponse['list']>[0]) => {
    if (d?.pyoung_text) {
      return <div tw="text-info text-gray-700">평형 {d.pyoung_text}</div>;
    }
    return null;
  }, []);

  const createdTimeText = useCallback((d?: NonNullable<GetMySuggestListResponse['list']>[0]) => {
    if (d?.created_time) {
      return (
        <div tw="text-info text-gray-700">
          <span>요청일 : </span>
          <Moment format="relative">{d.created_time}</Moment>
        </div>
      );
    }
    return null;
  }, []);

  const recommendCountText = useCallback((d?: NonNullable<GetMySuggestListResponse['list']>[0]) => {
    if (d?.suggest_recommended_count) {
      return (
        <div tw="flex items-center text-info text-nego-1000 gap-1.5">
          {!!d?.has_new && (
            <div>
              <NewIcon />
            </div>
          )}
          <span>추천</span>
          <span tw="font-bold text-b2">{d?.suggest_recommended_count ?? 0}</span>
        </div>
      );
    }

    return <div tw="flex items-center text-info text-gray-600">추천 전</div>;
  }, []);

  return (
    <div>
      <button type="button" tw="w-full text-start px-5 hover:bg-gray-100" onClick={onClick}>
        <div tw="py-5">
          <div tw="flex justify-between items-center">
            <div tw="flex gap-1">
              {realestateTypes?.map((d) => (
                <Chip key={d} variant={chipVariantByRealestateType[d]}>
                  {RealestateTypeString[d]}
                </Chip>
              ))}
              <span tw="line-clamp-1 text-gray-1000 text-info"> {item?.title}</span>
            </div>
            <div>
              <ChevronIcon tw="shrink-0 mb-0.5" />
            </div>
          </div>

          <div tw="flex items-center my-1 gap-1">
            <div tw="text-b1 font-bold text-gray-1000">
              {buyOrRentText}{' '}
              <PriceText
                tradeOrDepositPrice={item?.trade_or_deposit_price ?? 0}
                monthlyRentFee={item?.monthly_rent_fee ?? 0}
                quickSale={item?.quick_sale ?? false}
              />
            </div>
            {item?.negotiable && <NegotiableChip />}
          </div>
          {pyoungText(item)}
          <div tw="flex justify-between mt-1">
            {createdTimeText(item)}
            {recommendCountText(item)}
          </div>
        </div>
      </button>
    </div>
  );
}
