import { Avatar, Chip, Moment, Numeral } from '@/components/atoms';
import React, { useMemo } from 'react';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import { GetSuggestDetailResponse } from '@/apis/suggest/getSuggestDetail';
import { formatCreatedTime } from '@/utils/formatsTime';
import { RealestateTypeChipVariant, RealestateTypeString, TimeTypeString } from '@/constants/strings';
import { BuyOrRent, DanjiOrRegionalType, RealestateType } from '@/constants/enums';
import tw, { styled } from 'twin.macro';

import { ExpandableText } from '@/components/molecules';

const Wrraper = styled('div')``;

function NegotiableChip() {
  return (
    <div tw="text-gray-900 rounded text-info [font-size: 11px] bg-white px-1.5 h-5 border border-gray-300">
      협의가능
    </div>
  );
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

export default function BasicInfo({ data }: { data?: GetSuggestDetailResponse }) {
  const realestateTypes = useMemo(
    () =>
      Array.from(
        new Set(
          data?.realestate_types
            ?.split(',')
            .map((d) => Number(d))
            .map((d) => (d === RealestateType.Yunrip ? RealestateType.Dasaedae : d)) ?? [],
        ),
      ),
    [data?.realestate_types],
  );

  const buyOrRentText = useMemo(
    () => (Number(data?.buy_or_rents) === BuyOrRent.Buy ? '매매' : '전월세'),
    [data?.buy_or_rents],
  );

  return (
    <>
      <div tw="flex gap-1 items-center px-5">
        <Avatar alt="" src={data?.user_profile_image_url || defaultAvatar.src} size={24} />
        {data?.updated_time && <span tw="text-gray-700 text-info [letter-spacing: -0.4px]">{data?.user_nickname}</span>}
        {data?.created_time && (
          <span tw="text-gray-700 text-info [letter-spacing: -0.4px] ml-auto">
            {formatCreatedTime(data.created_time)}
          </span>
        )}
      </div>

      <div tw="flex gap-1 items-center mt-4 px-5">
        {realestateTypes.map((type) => (
          <Chip key={type} variant={RealestateTypeChipVariant[type]}>
            {RealestateTypeString[type]}
          </Chip>
        ))}

        {data?.danji_or_regional === DanjiOrRegionalType.Danji ? (
          <span tw="text-gray-1000 text-info line-clamp-1">{data.request_target_text}</span>
        ) : (
          <span tw="text-gray-1000 text-info line-clamp-1">{data?.request_target_text.split(' ').slice(-1)}</span>
        )}
      </div>

      <div tw="flex gap-1 items-center mt-1 mb-1 px-5 font-bold">
        <span tw="text-b1">{buyOrRentText}</span>
        <PriceText
          tradeOrDepositPrice={data?.trade_or_deposit_price ?? 0}
          monthlyRentFee={data?.monthly_rent_fee ?? 0}
          quickSale={data?.quick_sale ?? false}
        />
        {data?.negotiable && <NegotiableChip />}
      </div>

      {data?.pyoung_text && <div tw="px-5 text-gray-700 text-info">평형 {data?.pyoung_text}</div>}

      {data?.move_in_date && (
        <div tw="text-gray-700 text-info px-5">
          입주희망일 <Moment format="YY.MM.DD">{data?.move_in_date}</Moment> {TimeTypeString[data.move_in_date_type]}
        </div>
      )}

      {data?.purpose === '투자' && (
        <div tw="text-gray-700 text-info px-5">
          투자예산 <Numeral koreanNumber>{data?.invest_amount}</Numeral>
        </div>
      )}

      <Wrraper tw="px-5 pb-10" css={[data?.note ? tw`pt-3` : tw`pt-0`]}>
        {data?.note && <ExpandableText>{data?.note}</ExpandableText>}
      </Wrraper>
    </>
  );
}
