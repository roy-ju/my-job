import { Avatar, Chip, Moment, Numeral } from '@/components/atoms';
import { RealestateType, BuyOrRent } from '@/constants/enums';
import { RealestateTypeString } from '@/constants/strings';
import { useCallback, useMemo } from 'react';
import ChevronIcon from '@/assets/icons/my_chevron_16_gray.svg';

import { GetMySuggestRecommendedListResponse } from '@/apis/suggest/getMySuggestRecommendedList';
import tw from 'twin.macro';

const chipVariantByRealestateType: Record<number, 'nego' | 'green' | 'red' | 'blue' | 'orange'> = {
  [RealestateType.Apartment]: 'nego',
  [RealestateType.Officetel]: 'green',
  [RealestateType.Dandok]: 'red',
  [RealestateType.Dagagoo]: 'blue',
  [RealestateType.Yunrip]: 'orange',
  [RealestateType.Dasaedae]: 'orange',
};

interface Props {
  item: NonNullable<GetMySuggestRecommendedListResponse['list']>[0];
  onClick?: (id: number) => void;
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

export default function Item({ item, onClick }: Props) {
  const buyOrRentText = Number(item?.buy_or_rents) === BuyOrRent.Buy ? '매매' : '전월세';
  const title = item?.deregistered ? item?.suggestor_nickname : `${item?.suggestor_nickname}님의 구하기`;

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

  const pyoungText = useCallback((d?: NonNullable<GetMySuggestRecommendedListResponse['list']>[0]) => {
    if (d?.pyoung_text) {
      return <div tw="text-info text-gray-700">평형 {d.pyoung_text}</div>;
    }
    return null;
  }, []);

  return (
    <div tw="not-last-of-type:border-b not-last-of-type:border-gray-300">
      <button
        type="button"
        tw="w-full text-start px-5 hover:bg-gray-100"
        onClick={() => {
          onClick?.(item.suggest_id);
        }}
      >
        <div tw="py-6 flex flex-col gap-4">
          <div tw="flex justify-between items-center">
            <div tw="flex items-center gap-1">
              <Avatar
                size={24}
                alt="profile_img"
                src={
                  item?.deregistered
                    ? process.env.NEXT_PUBLIC_NEGOCIO_DELETED_PROFILE_IMG_PATH
                    : item?.suggestor_profile_image_url
                }
              />
              <span css={item.deregistered && tw`text-gray-900`} tw="text-subhead_02">
                {title}
              </span>
            </div>

            <ChevronIcon tw="shrink-0 mb-0.5 " />
          </div>
          <div tw="flex flex-col gap-2">
            <div tw="flex justify-between items-center">
              <div tw="flex gap-1">
                {realestateTypes?.map((d) => (
                  <Chip tw="[font-size: 11px]" key={d} variant={chipVariantByRealestateType[d]}>
                    {RealestateTypeString[d]}
                  </Chip>
                ))}
                <span tw="line-clamp-1 text-gray-1000 text-body_01"> {item?.request_target_text}</span>
              </div>
            </div>
            <div tw="flex items-center gap-1">
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
          </div>
          <div tw="p-4 bg-gray-100 flex justify-between rounded-lg text-gray-700 text-body_01">
            <span>
              추천일: <Moment format="relative">{item.latest_recommended_time}</Moment>
            </span>
            <span css={[item.suggest_recommend_ever_user_accepted && tw`text-nego-800`]}>
              {item.suggest_recommend_ever_user_accepted ? '협의 중' : '협의 개시 전'}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
