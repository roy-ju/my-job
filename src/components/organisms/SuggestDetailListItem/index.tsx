import { Button, Chip, Moment, Numeral } from '@/components/atoms';
import React, { useMemo, useState } from 'react';
import { GetSuggestDetailResponse } from '@/apis/suggest/getSuggestDetail';
import { DanjiOrRegionalType, RealestateType, BuyOrRent } from '@/constants/enums';
import { RealestateTypeChipVariant, RealestateTypeString, TimeTypeString } from '@/constants/strings';
import ChevronDown from '@/assets/icons/chevron_down.svg';
import tw from 'twin.macro';

interface SuggestDetailListItemProps {
  suggestData?: GetSuggestDetailResponse | null;
  onClickDanjiDetail?: () => void;
  onClickSuggestUpdate?: () => void;
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
        buy <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral> / <Numeral>{monthlyRentFee}</Numeral>
      </>
    );
  }
  return <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral>;
}

function NegotiableChip() {
  return <div tw="text-white rounded-tl rounded-br text-info font-semibold bg-orange-700 px-1.5 h-5">협의가능</div>;
}

export default function SuggestDetailListItem({
  suggestData,
  onClickDanjiDetail,
  onClickSuggestUpdate,
}: SuggestDetailListItemProps) {
  const [showDetails, setShowDetails] = useState(false);

  const realestateTypes = useMemo(
    () =>
      Array.from(
        new Set(
          suggestData?.realestate_types
            ?.split(',')
            .map((d) => Number(d))
            .map((d) => (d === RealestateType.Yunrip ? RealestateType.Dasaedae : d)) ?? [],
        ),
      ),
    [suggestData?.realestate_types],
  );

  const buyOrRentText = Number(suggestData?.buy_or_rents) === BuyOrRent.Buy ? '매매' : '전월세';

  return (
    <div>
      <div tw="block  mb-4 w-full">
        <div tw="mb-1 flex justify-between items-center">
          <div tw="flex items-center gap-1.5">
            {realestateTypes.map((type) => (
              <Chip key={type} variant={RealestateTypeChipVariant[type]}>
                {RealestateTypeString[type]}
              </Chip>
            ))}

            {suggestData?.danji_or_regional === DanjiOrRegionalType.Danji ? (
              <span tw="text-gray-1000 text-info line-clamp-1">{suggestData.request_target_text}</span>
            ) : (
              <Chip variant="gray">{suggestData?.request_target_text.split(' ').at(-1)}</Chip>
            )}
          </div>
          {suggestData?.danji_or_regional === DanjiOrRegionalType.Danji && (
            <button
              type="button"
              onClick={() => {
                onClickDanjiDetail?.();
              }}
            >
              <ChevronDown style={{ transform: 'rotate(270deg)' }} />
            </button>
          )}
        </div>
        <div tw="text-left">
          <div tw="flex items-center mb-1">
            <div tw="text-b1 font-bold text-gray-1000 mr-1">
              {buyOrRentText}{' '}
              <PriceText
                tradeOrDepositPrice={suggestData?.trade_or_deposit_price ?? 0}
                monthlyRentFee={suggestData?.monthly_rent_fee ?? 0}
                quickSale={suggestData?.quick_sale ?? false}
              />
            </div>
            {suggestData?.negotiable && <NegotiableChip />}
          </div>
          {suggestData?.pyoung_text && <div tw="text-gray-700 text-info">평형 {suggestData?.pyoung_text}</div>}
          {suggestData?.move_in_date && (
            <div tw="text-gray-700 text-info">
              입주가능일 <Moment format="YY.MM.DD">{suggestData?.move_in_date}</Moment>{' '}
              {TimeTypeString[suggestData.move_in_date_type]}
            </div>
          )}
          {suggestData?.purpose === '투자' && (
            <div tw="text-gray-700 text-info">
              투자예산 <Numeral koreanNumber>{suggestData?.invest_amount}</Numeral>
            </div>
          )}
        </div>
      </div>
      {suggestData?.note && (
        <button
          tw="flex justify-between gap-4 mb-5 w-full"
          type="button"
          onClick={() => {
            setShowDetails(!showDetails);
          }}
        >
          <p tw="break-all text-left text-gray-1000 text-info flex-1" css={[showDetails === false && tw`line-clamp-1`]}>
            {suggestData?.note}
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
      <Button variant="outlined" tw="w-full" onClick={onClickSuggestUpdate}>
        요청 수정
      </Button>
    </div>
  );
}
