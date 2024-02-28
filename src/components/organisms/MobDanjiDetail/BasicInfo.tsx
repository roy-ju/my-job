import React, { useCallback } from 'react';

import { useRouter } from 'next/router';

import tw from 'twin.macro';

import moment from 'moment';

import { Button, Chip } from '@/components/atoms';

import { describeRealestateType } from '@/constants/enums';

import { RealestateTypeChipVariant } from '@/constants/strings';

import Routes from '@/router/routes';

import { cuttingDot } from '@/utils/fotmat';

import { DanjiDetailResponse } from '@/services/danji/types';

export default function BasicInfo({
  type = '',
  danji,
}: {
  type?: '' | 'listingDetail' | 'danjiListings';
  danji: DanjiDetailResponse;
}) {
  const router = useRouter();

  const handleDanjiDetail = useCallback(() => {
    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.DanjiDetail}`,
      query: {
        danjiID: `${danji?.danji_id}` || `${router.query.danjiID}` || '',
      },
    });
  }, [router, danji]);

  if (!danji) return null;

  return (
    <>
      <div css={[type === 'listingDetail' ? tw`pb-0` : tw`pb-9`]}>
        <div tw="px-5">
          <div tw="flex flex-row items-center justify-between mb-2">
            <span tw="text-h3 font-bold">{danji.name}</span>
            {type === 'danjiListings' && (
              <Button variant="outlined" size="small" onClick={handleDanjiDetail}>
                단지 정보 보기
              </Button>
            )}
          </div>

          <div tw="flex flex-row items-center gap-1 mb-1">
            <Chip variant={RealestateTypeChipVariant[danji?.type]}>{describeRealestateType(danji?.type)}</Chip>
            <span tw="text-info text-gray-700">{danji.road_name_address || danji.jibun_address}</span>
          </div>

          <div tw="flex items-center gap-1">
            {danji.total_saedae_count && danji.total_saedae_count !== '0' && (
              <>
                <span tw="text-info text-gray-700">{danji.total_saedae_count}세대</span>
              </>
            )}

            {danji.total_dong_count && (
              <>
                <div tw="w-px h-2 bg-gray-300 mx-1" />
                <span tw="text-info text-gray-700">총 {danji.total_dong_count}동</span>
              </>
            )}

            {danji.jeonyong_min > 0 && danji.jeonyong_max === 0 && (
              <>
                <div tw="w-px h-2 bg-gray-300 mx-1" />
                <span tw="text-info text-gray-700">{`전용 ${cuttingDot(danji.jeonyong_min)}㎡`}</span>
              </>
            )}

            {danji.jeonyong_min === 0 && danji.jeonyong_max > 0 && (
              <>
                <div tw="w-px h-2 bg-gray-300 mx-1" />
                <span tw="text-info text-gray-700">{`전용 ${cuttingDot(danji.jeonyong_max)}㎡`}</span>
              </>
            )}

            {danji.jeonyong_min > 0 && danji.jeonyong_max > 0 && (
              <>
                <div tw="w-px h-2 bg-gray-300 mx-1" />
                <span tw="text-info text-gray-700">
                  {cuttingDot(danji.jeonyong_min) === cuttingDot(danji?.jeonyong_max)
                    ? `전용 ${cuttingDot(danji?.jeonyong_min)}㎡`
                    : `전용 ${cuttingDot(danji?.jeonyong_min)}㎡ ~ ${cuttingDot(danji?.jeonyong_max)}㎡`}
                </span>
              </>
            )}

            {danji?.use_accepted_year?.replaceAll(' ', '') && (
              <>
                <div tw="w-px h-2 bg-gray-300 mx-1" />
                <span tw="text-info text-gray-700">{moment(danji.use_accepted_year).format('YYYY.MM.DD')}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
