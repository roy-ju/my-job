import moment from 'moment';

import { cuttingDot } from '@/utils/fotmat';

import { RowCenterGapOne, DetailText, HorizontalLine } from './widget/SummaryWidget';

import { CommonDanjiDetailProps } from '../types';

export default function Details({ danji }: CommonDanjiDetailProps) {
  return (
    <RowCenterGapOne>
      {danji.total_saedae_count && danji.total_saedae_count !== '0' && (
        <>
          <DetailText>{danji.total_saedae_count}세대</DetailText>
        </>
      )}

      {danji.total_dong_count && (
        <>
          <HorizontalLine />
          <DetailText>총 {danji.total_dong_count}동</DetailText>
        </>
      )}

      {danji.jeonyong_min > 0 && danji.jeonyong_max === 0 && (
        <>
          <HorizontalLine />
          <DetailText>{`전용 ${cuttingDot(danji.jeonyong_min)}㎡`}</DetailText>
        </>
      )}

      {danji.jeonyong_min === 0 && danji.jeonyong_max > 0 && (
        <>
          <HorizontalLine />
          <DetailText>{`전용 ${cuttingDot(danji.jeonyong_max)}㎡`}</DetailText>
        </>
      )}

      {danji.jeonyong_min > 0 && danji.jeonyong_max > 0 && (
        <>
          <HorizontalLine />
          <DetailText>
            {cuttingDot(danji.jeonyong_min) === cuttingDot(danji?.jeonyong_max)
              ? `전용 ${cuttingDot(danji?.jeonyong_min)}㎡`
              : `전용 ${cuttingDot(danji?.jeonyong_min)}㎡ ~ ${cuttingDot(danji?.jeonyong_max)}㎡`}
          </DetailText>
        </>
      )}

      {danji?.use_accepted_year?.replaceAll(' ', '') && (
        <>
          <HorizontalLine />
          <DetailText>{moment(danji.use_accepted_year).format('YYYY.MM.DD')}</DetailText>
        </>
      )}
    </RowCenterGapOne>
  );
}
