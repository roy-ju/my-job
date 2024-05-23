import { memo, useMemo } from 'react';

import { BuyOrRent } from '@/constants/enums';

import BuyIcon from '@/assets/icons/buy_tradeturnrate.svg';

import JeonsaeIcon from '@/assets/icons/jeonsae_tradeturnrate.svg';

import DanjiIcon from '@/assets/icons/danji_line.svg';

import SigunguIcon from '@/assets/icons/sigungu_line.svg';

import SidoIcon from '@/assets/icons/sido_line.svg';

import { useFetchDanjiTradeTurnrate } from '@/services/danji/useFetchDanjiTradeturnrate';

import { useFetchDanjiTradeTurnrateSigungu } from '@/services/danji/useFetchDanjiTradeturnrateSigungu';

import { useFetchDanjiJeonsaerate } from '@/services/danji/useFetchDanjiJeonsaerate';

import { useFetchDanjiJeonsaerateSigungu } from '@/services/danji/useFetchDanjiJeonsaerateSigungu';

import { CommonDanjiDetailProps } from '../types';
import {
  AverageText,
  DetailTitle,
  DetailWrraper,
  Name,
  NamesWrraper,
  TradeTurnrateContentsTitle,
  TradeTurnrateContentsWrraper,
  TradeTurnrateTitle,
  TradeTurnrateTitleWrraper,
  TradeTurnrateWrraper,
} from './widget/InfoWidget';

interface InfoDetailProps extends CommonDanjiDetailProps {
  buyOrRent: number;
  selectedYear: number;
}

function InfoDetail({ danji, buyOrRent, selectedYear }: InfoDetailProps) {
  const { data: danjiTradeTurnRateData } = useFetchDanjiTradeTurnrate({
    buyOrRent,
    danjiId: danji.danji_id,
    realestateType: danji.type,
    year: selectedYear,
  });

  const { data: danjiTradeTurnRateSigunguData } = useFetchDanjiTradeTurnrateSigungu({
    buyOrRent,
    danjiId: danji.danji_id,
    realestateType: danji.type,
    year: selectedYear,
  });

  const { data: danjiJeonsaeRateRateData } = useFetchDanjiJeonsaerate({
    buyOrRent,
    danjiId: danji.danji_id,
    realestateType: danji.type,
    year: selectedYear,
  });

  const { data: danjiJeonsaeRateSigunguData } = useFetchDanjiJeonsaerateSigungu({
    buyOrRent,
    danjiId: danji.danji_id,
    realestateType: danji.type,
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

  return (
    <DetailWrraper>
      <DetailTitle>실거래 종합 현황</DetailTitle>
      <TradeTurnrateWrraper>
        <TradeTurnrateTitleWrraper>
          {buyOrRent === BuyOrRent.Buy && <BuyIcon />}
          {buyOrRent === BuyOrRent.Jeonsae && <JeonsaeIcon />}

          <TradeTurnrateTitle>
            {buyOrRent === BuyOrRent.Buy && '매매회전율(연)'}
            {buyOrRent === BuyOrRent.Jeonsae && '평균 전세가율'}
          </TradeTurnrateTitle>
        </TradeTurnrateTitleWrraper>

        <TradeTurnrateContentsWrraper>
          <TradeTurnrateContentsTitle>
            {buyOrRent === BuyOrRent.Buy && tradeTurnRate}
            {buyOrRent === BuyOrRent.Jeonsae && jeonsaeRate}
          </TradeTurnrateContentsTitle>

          {buyOrRent === BuyOrRent.Buy && (
            <AverageText>
              {sigunguSidoName} 평균 {tradeTurnRateSigungu}
            </AverageText>
          )}

          {buyOrRent === BuyOrRent.Jeonsae && (
            <AverageText>
              {sigunguSidoName} 평균 {jeonsaeRateSigungu}
            </AverageText>
          )}
        </TradeTurnrateContentsWrraper>
      </TradeTurnrateWrraper>

      <NamesWrraper>
        {danji?.name && (
          <Name>
            <DanjiIcon />
            <span>{danji.name}</span>
          </Name>
        )}

        {danji?.sigungu_name && (
          <Name>
            <SigunguIcon />
            <span>{danji.sigungu_name}</span>
          </Name>
        )}

        {danji?.sido_name &&
          (danji.sido_name === '세종특별자치시' ? null : (
            <Name>
              <SidoIcon />
              <span>{danji.sido_name}</span>
            </Name>
          ))}
      </NamesWrraper>
    </DetailWrraper>
  );
}

export default memo(InfoDetail);
