/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { danjiSuggestEligibilityCheck } from '@/apis/danji/danjiRecommendation';
import { Button } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { cuttingDot } from '@/utils/fotmat';
import moment from 'moment';
import React, { useState, useCallback, useEffect } from 'react';
import tw from 'twin.macro';
import { useRouter as useNextRouter } from 'next/router';

export default function BasicInfo({
  isShowDanjiListings = false,
  isListingDetail = false,
  depth,
  danji,
}: {
  isShowDanjiListings?: boolean;
  isListingDetail?: boolean;
  depth: number;
  danji: GetDanjiDetailResponse;
}) {
  const router = useRouter(depth);
  const nextRouter = useNextRouter();

  const [isRecommendationService, setIsRecommendationService] = useState(false);

  const handleDanjiDetail = useCallback(() => {
    nextRouter.replace({
      pathname: `/${Routes.DanjiDetail}`,
      query: {
        p: danji?.pnu || `${nextRouter.query.p}` || '',
        rt: danji?.type.toString() || (nextRouter.query.rt as string) || '',
      },
    });
  }, [nextRouter, danji]);

  const handleRecommendation = useCallback(() => {
    if (!danji?.pnu || !danji.type) return;

    if (router.query.listingID) {
      if (depth === 1) {
        router.push(Routes.DanjiRecommendation, {
          searchParams: {
            listingID: router.query.listingID as string,
            p: `${danji.pnu}`,
            rt: danji.type.toString() as string,
          },
        });
      } else if (depth === 2) {
        router.replace(Routes.DanjiRecommendation, {
          searchParams: {
            listingID: router.query.listingID as string,
            p: `${danji.pnu}`,
            rt: danji.type.toString() as string,
          },
        });
      }
    } else if (depth === 1) {
      router.push(Routes.DanjiRecommendation, {
        searchParams: { p: `${danji.pnu}`, rt: danji.type.toString() as string },
      });
    } else if (depth === 2) {
      router.replace(Routes.DanjiRecommendation, {
        searchParams: { p: `${danji.pnu}`, rt: danji.type.toString() as string },
      });
    }
  }, [danji?.pnu, danji?.type, router, depth]);

  const [openPopup, setOpenPopup] = useState(false);

  const handleCTA = () => {
    if (isRecommendationService) {
      setOpenPopup(false);
      if (handleRecommendation) {
        handleRecommendation();
      }
    } else {
      setOpenPopup(true);
    }
  };

  useEffect(() => {
    async function isAccessible(code: string) {
      const response = await danjiSuggestEligibilityCheck(code);

      if (response && response.eligible) {
        setIsRecommendationService(true);
      } else if (response && !response.eligible) {
        setIsRecommendationService(false);
      }
    }

    if (danji && danji.bubjungdong_code) {
      isAccessible(danji.bubjungdong_code);
    }
  }, [danji]);

  if (!danji) return null;

  return (
    <>
      <div css={[isListingDetail ? tw`pb-0` : tw`pb-9`]}>
        <div tw="px-5">
          <div tw="flex flex-row items-center justify-between mb-2">
            <span tw="text-h3 font-bold">{danji.name}</span>
            {isShowDanjiListings && (
              <Button variant="outlined" size="small" onClick={handleDanjiDetail}>
                단지 정보 보기
              </Button>
            )}
          </div>

          <div tw="flex flex-col">
            <span tw="text-info text-gray-700">{danji.road_name_address || danji.jibun_address}</span>
          </div>

          <div tw="flex items-center gap-1 mb-4">
            {danji.total_saedae_count && (
              <>
                <span tw="text-info text-gray-700">{danji.total_saedae_count}세대</span>
              </>
            )}

            {danji.total_dong_count && (
              <>
                <div tw="w-px h-2 bg-gray-300" />
                <span tw="text-info text-gray-700">총 {danji.total_dong_count}동</span>
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

            {danji.construction_start_date?.replaceAll(' ', '') && (
              <>
                <div tw="w-px h-2 bg-gray-300" />
                <span tw="text-info text-gray-700">{moment(danji.construction_start_date).format('YYYY.MM')} 준공</span>
              </>
            )}
          </div>

          {!isListingDetail && (
            <div tw="w-full flex flex-col gap-2">
              <Button variant="secondary" size="big" tw="w-full" onClick={handleCTA}>
                이 단지 매물 추천받기
              </Button>
              <div tw="flex gap-1 justify-center">
                <span tw="text-info">이 단지에서 매물 찾는 사람 수</span>
                <span tw="text-info font-bold text-nego">{danji.suggest_count || 0}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {openPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.Title>해당 지역은 서비스 준비중입니다.</Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setOpenPopup(false)}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}
