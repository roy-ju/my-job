import { useMemo } from 'react';

import { BuyOrRent } from '@/constants/enums';

import BuyIcon from '@/assets/icons/buy_tradeturnrate.svg';

import JeonsaeIcon from '@/assets/icons/jeonsae_tradeturnrate.svg';

import DanjiIcon from '@/assets/icons/danji_line.svg';

import SigunguIcon from '@/assets/icons/sigungu_line.svg';

import SidoIcon from '@/assets/icons/sido_line.svg';

import {
  useAPI_DanjiJeonsaerate,
  useAPI_DanjiJeonsaerateSigungu,
  useAPI_DanjiTradeTurnrate,
  useAPI_DanjiTradeTurnrateSigungu,
} from '@/apis/danji/danjiTradeTurnRate';

import { DanjiDetailResponse } from '@/services/danji/types';

export default function RealPriceInfoCurrent({
  buyOrRent,
  danji,
  selectedYear,
}: {
  buyOrRent?: number;
  danji?: DanjiDetailResponse;
  selectedYear?: number;
}) {
  const { data: danjiTradeTurnRateData } = useAPI_DanjiTradeTurnrate({
    buyOrRent,
    danjiId: danji?.danji_id,
    realestateType: danji?.type,
    year: selectedYear,
  });

  const { data: danjiTradeTurnRateSigunguData } = useAPI_DanjiTradeTurnrateSigungu({
    buyOrRent,
    danjiId: danji?.danji_id,
    realestateType: danji?.type,
    year: selectedYear,
  });

  const { data: danjiJeonsaeRateRateData } = useAPI_DanjiJeonsaerate({
    buyOrRent,
    danjiId: danji?.danji_id,
    realestateType: danji?.type,
    year: selectedYear,
  });

  const { data: danjiJeonsaeRateSigunguData } = useAPI_DanjiJeonsaerateSigungu({
    buyOrRent,
    danjiId: danji?.danji_id,
    realestateType: danji?.type,
    year: selectedYear,
  });

  const tradeTurnRate = useMemo(() => {
    if (danjiTradeTurnRateData?.trade_turn_rate) {
      return `${Math.round(danjiTradeTurnRateData.trade_turn_rate * 10) / 10}%`;
    }
    return '';
  }, [danjiTradeTurnRateData]);

  const tradeTurnRateSigungu = useMemo(() => {
    if (danjiTradeTurnRateSigunguData?.trade_turn_rate) {
      return `${Math.round(danjiTradeTurnRateSigunguData.trade_turn_rate * 10) / 10}%`;
    }
    return '';
  }, [danjiTradeTurnRateSigunguData]);

  const jeonsaeRate = useMemo(() => {
    if (danjiJeonsaeRateRateData?.jeonsae_rate) {
      return `${Math.round(danjiJeonsaeRateRateData.jeonsae_rate * 10) / 10}%`;
    }
    return '';
  }, [danjiJeonsaeRateRateData]);

  const jeonsaeRateSigungu = useMemo(() => {
    if (danjiJeonsaeRateSigunguData?.jeonsae_rate) {
      return `${Math.round(danjiJeonsaeRateSigunguData.jeonsae_rate * 10) / 10}%`;
    }
    return '';
  }, [danjiJeonsaeRateSigunguData]);

  const sigunguSidoName = useMemo(() => {
    if (danji) {
      return `${danji?.sigungu_name || ''}`;
    }

    return '';
  }, [danji]);

  if (!danji || !buyOrRent || !selectedYear) return null;

  return (
    <div tw="mt-6">
      <span tw="text-b1 [line-height: 1] font-bold">실거래 종합 현황</span>
      <div tw="flex items-center justify-between mt-6 py-[1.125rem] [border-radius: 0.5rem] px-4 bg-gray-100">
        <div tw="flex items-center gap-2">
          {buyOrRent === BuyOrRent.Buy && <BuyIcon />}
          {buyOrRent === BuyOrRent.Jeonsae && <JeonsaeIcon />}

          <span tw="text-b2 [line-height: 1.25rem]">
            {buyOrRent === BuyOrRent.Buy && '매매회전율(연)'}
            {buyOrRent === BuyOrRent.Jeonsae && '평균 전세가율'}
          </span>
        </div>

        <div tw="flex flex-col gap-2">
          <span tw="font-bold text-b1 [line-height: 1] [text-align: right]">
            {buyOrRent === BuyOrRent.Buy && tradeTurnRate}
            {buyOrRent === BuyOrRent.Jeonsae && jeonsaeRate}
          </span>
          {buyOrRent === BuyOrRent.Buy && (
            <span tw="text-info text-gray-700 [line-height: 1] [text-align: right]">
              {sigunguSidoName} 평균 {tradeTurnRateSigungu}
            </span>
          )}
          {buyOrRent === BuyOrRent.Jeonsae && (
            <span tw="text-info text-gray-700 [line-height: 1] [text-align: right]">
              {sigunguSidoName} 평균 {jeonsaeRateSigungu}
            </span>
          )}
        </div>
      </div>
      <div tw="flex items-center justify-center mt-3 bg-gray-100 gap-2 py-2.5">
        {danji?.name && (
          <div tw="flex items-center gap-1.5">
            <DanjiIcon />
            <span tw="[max-width: 4.5rem] text-info text-gray-700 [line-height: 0.875rem] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap">
              {danji.name}
            </span>
          </div>
        )}
        {danji?.sigungu_name && (
          <div tw="flex items-center gap-1.5">
            <SigunguIcon />
            <span tw="[max-width: 4.5rem] text-info text-gray-700 [line-height: 0.875rem] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap">
              {danji.sigungu_name}
            </span>
          </div>
        )}
        {danji?.sido_name &&
          (danji.sido_name === '세종특별자치시' ? null : (
            <div tw="flex items-center gap-1.5">
              <SidoIcon />
              <span tw="[max-width: 4.5rem] text-info text-gray-700 [line-height: 0.875rem] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap">
                {danji.sido_name}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
