import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { Button } from '@/components/atoms';
import { cuttingDot } from '@/utils/fotmat';
import moment from 'moment';
import React from 'react';

export default function BasicInfo({ danji }: { danji: GetDanjiDetailResponse }) {
  if (!danji) return null;

  return (
    <div tw="px-5">
      <div tw="mb-2">
        <span tw="text-h3 font-bold">{danji.name}</span>
      </div>

      <div tw="flex flex-col">
        <span tw="text-info text-gray-700">{danji.jibun_address}</span>
      </div>

      <div tw="flex items-center gap-1 mb-4">
        <>
          <span tw="text-info text-gray-700">{danji.total_saedae_count || '-'}세대</span>
        </>

        {danji.jeonyong_min === 0 && danji.jeonyong_max === 0 && (
          <>
            <div tw="w-px h-2 bg-gray-300" />
            <span tw="text-info text-gray-700">전용 -㎡`</span>
          </>
        )}

        {danji.jeonyong_min > 0 && danji.jeonyong_max === 0 && (
          <>
            <div tw="w-px h-2 bg-gray-300" />
            <span tw="text-info text-gray-700">{`전용 ${cuttingDot(danji.jeonyong_min)}㎡`}</span>
          </>
        )}

        {danji.jeonyong_min === 0 && danji.jeonyong_max > 0 && (
          <>
            <div tw="w-px h-2 bg-gray-300" />
            <span tw="text-info text-gray-700">{`전용 ${cuttingDot(danji.jeonyong_max)}㎡`}</span>
          </>
        )}

        {danji.jeonyong_min > 0 && danji.jeonyong_max > 0 && (
          <>
            <div tw="w-px h-2 bg-gray-300" />
            <span tw="text-info text-gray-700">
              {cuttingDot(danji.jeonyong_min) === cuttingDot(danji?.jeonyong_max)
                ? `전용 ${cuttingDot(danji?.jeonyong_min)}㎡`
                : `전용 ${cuttingDot(danji?.jeonyong_min)}㎡ ~ ${cuttingDot(danji?.jeonyong_max)}㎡`}
            </span>
          </>
        )}

        {danji.construction_start_date.replaceAll(' ', '') && (
          <>
            <div tw="w-px h-2 bg-gray-300" />
            <span tw="text-info text-gray-700">{moment(danji.construction_start_date).format('YYYY.MM')}</span>
          </>
        )}
      </div>

      <div tw="w-full flex flex-col gap-2">
        <Button variant="secondary" size="medium" tw="w-full">
          원하는 가격의 매물 추천받기
        </Button>
        <div tw="flex gap-1 justify-center">
          <span tw="text-info">현재 추천 요청자수</span>
          <span tw="text-info font-bold text-nego">{danji.suggest_count || 0}</span>
        </div>
      </div>
    </div>
  );
}
