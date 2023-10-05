import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { Button, Chip } from '@/components/atoms';
import Routes from '@/router/routes';
import { cuttingDot } from '@/utils/fotmat';
import moment from 'moment';
import React, { useCallback } from 'react';
import tw from 'twin.macro';
import { useRouter as useNextRouter } from 'next/router';
import { describeRealestateType } from '@/constants/enums';
import { RealestateTypeChipVariant } from '@/constants/strings';

export default function BasicInfo({
  isShowDanjiListings = false,
  isListingDetail = false,
  danji,
}: {
  isShowDanjiListings?: boolean;
  isListingDetail?: boolean;
  depth: number;
  danji: GetDanjiDetailResponse;
}) {
  const nextRouter = useNextRouter();

  const handleDanjiDetail = useCallback(() => {
    nextRouter.replace({
      pathname: `/${Routes.DanjiDetail}`,
      query: {
        danjiID: danji?.danji_id || `${nextRouter?.query?.danjiID}` || '',
      },
    });
  }, [nextRouter, danji]);

  if (!danji) return null;

  return (
    <>
      <div css={[isListingDetail ? tw`pb-0` : tw`pb-10`]}>
        <div tw="px-5">
          <div tw="flex flex-row items-center justify-between mb-2">
            <h1 tw="text-h3 font-bold">{danji.name}</h1>
            {isShowDanjiListings && (
              <Button variant="outlined" size="small" onClick={handleDanjiDetail}>
                단지 정보 보기
              </Button>
            )}
          </div>

          <div tw="flex flex-row items-center gap-1 mb-1">
            <Chip variant={RealestateTypeChipVariant[danji?.type]}>{describeRealestateType(danji?.type)}</Chip>
            <h2 tw="text-info text-gray-700">{danji.road_name_address || danji.jibun_address}</h2>
          </div>

          <div tw="flex items-center gap-1">
            {danji.total_saedae_count && danji.total_saedae_count !== '0' && (
              <>
                <p tw="text-info text-gray-700">{danji.total_saedae_count}세대</p>
              </>
            )}

            {danji.total_dong_count && (
              <>
                <div tw="w-px h-2 bg-gray-300 mx-1" />
                <p tw="text-info text-gray-700">총 {danji.total_dong_count}동</p>
              </>
            )}

            {danji.jeonyong_min > 0 && danji.jeonyong_max === 0 && (
              <>
                <div tw="w-px h-2 bg-gray-300 mx-1" />
                <p tw="text-info text-gray-700">{`전용 ${cuttingDot(danji.jeonyong_min)}㎡`}</p>
              </>
            )}

            {danji.jeonyong_min === 0 && danji.jeonyong_max > 0 && (
              <>
                <div tw="w-px h-2 bg-gray-300 mx-1" />
                <p tw="text-info text-gray-700">{`전용 ${cuttingDot(danji.jeonyong_max)}㎡`}</p>
              </>
            )}

            {danji.jeonyong_min > 0 && danji.jeonyong_max > 0 && (
              <>
                <div tw="w-px h-2 bg-gray-300 mx-1" />
                <p tw="text-info text-gray-700">
                  {cuttingDot(danji.jeonyong_min) === cuttingDot(danji?.jeonyong_max)
                    ? `전용 ${cuttingDot(danji?.jeonyong_min)}㎡`
                    : `전용 ${cuttingDot(danji?.jeonyong_min)}㎡ ~ ${cuttingDot(danji?.jeonyong_max)}㎡`}
                </p>
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
