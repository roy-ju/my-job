import { Chip, Moment, Numeral } from '@/components/atoms';
import React, { useMemo, useState } from 'react';
import { GetSuggestDetailResponse } from '@/apis/suggest/getSuggestDetail';
import tw, { styled } from 'twin.macro';
import { BuyOrRent, DanjiOrRegionalType, RealestateType } from '@/constants/enums';
import { RealestateTypeChipVariant, RealestateTypeString, TimeTypeString } from '@/constants/strings';
import ChevronDown from '@/assets/icons/chevron_down.svg';

interface Props {
  data?: GetSuggestDetailResponse | null;
}

const Wrraper = styled('div')``;

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
        <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral> / <Numeral>{monthlyRentFee}</Numeral>
      </>
    );
  }
  return <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral>;
}

function NegotiableChip() {
  return <div tw="text-white rounded-tl rounded-br text-info font-semibold bg-orange-700 px-1.5 h-5">협의가능</div>;
}

export default function ListingInfo({ data }: Props) {
  const [showDetails, setShowDetails] = useState(false);

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

  const buyOrRentText = Number(data?.buy_or_rents) === BuyOrRent.Buy ? '매매' : '전월세';

  return (
    <>
      <Wrraper tw="block mb-3 w-full">
        <div tw="mb-1 flex justify-between items-center">
          <div tw="flex items-center gap-1.5">
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
        </div>

        <div tw="text-left">
          <div tw="flex items-center mb-1">
            <div tw="text-b1 font-bold text-gray-1000 mr-1">
              {buyOrRentText}&nbsp;
              <PriceText
                tradeOrDepositPrice={data?.trade_or_deposit_price ?? 0}
                monthlyRentFee={data?.monthly_rent_fee ?? 0}
                quickSale={data?.quick_sale ?? false}
              />
            </div>
            {data?.negotiable && <NegotiableChip />}
          </div>

          {data?.pyoung_text && <div tw="text-gray-700 text-info">평형 {data?.pyoung_text}</div>}

          {data?.move_in_date && (
            <div tw="text-gray-700 text-info">
              입주희망일 <Moment format="YY.MM.DD">{data?.move_in_date}</Moment>{' '}
              {TimeTypeString[data.move_in_date_type]}
            </div>
          )}

          {data?.purpose === '투자' && (
            <div tw="text-gray-700 text-info">
              투자예산 <Numeral koreanNumber>{data?.invest_amount}</Numeral>
            </div>
          )}
        </div>
      </Wrraper>

      <Wrraper>
        {data?.note && (
          <button
            tw="flex justify-between gap-4 mb-5 w-full"
            type="button"
            onClick={() => {
              setShowDetails((prev) => !prev);
            }}
          >
            <p
              tw="break-all text-left text-gray-1000 text-info flex-1"
              css={[showDetails === false && tw`line-clamp-1`]}
            >
              {data?.note}
            </p>

            <div>
              <ChevronDown
                role="presentation"
                style={{
                  transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease-in-out',
                  alignSelf: 'top',
                }}
              />
            </div>
          </button>
        )}
      </Wrraper>
    </>
  );
}
