import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { danjiSuggestEligibilityCheck } from '@/apis/danji/danjiRecommendation';
import { Button } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { cuttingDot } from '@/utils/fotmat';
import moment from 'moment';
import React, { useState, useCallback, useEffect } from 'react';

export default function BasicInfo({ depth, danji }: { depth: number; danji: GetDanjiDetailResponse }) {
  const router = useRouter(depth);

  const [isRecommendationService, setIsRecommendationService] = useState(false);

  const handleRecommendation = useCallback(() => {
    if (!danji?.pnu || !danji.type) return;

    router.push(Routes.DanjiRecommendation, {
      searchParams: { p: `${danji.pnu}`, rt: danji.type.toString() as string },
    });
  }, [danji?.pnu, danji?.type, router]);

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
      <div tw="pb-10">
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

            {danji.construction_start_date?.replaceAll(' ', '') && (
              <>
                <div tw="w-px h-2 bg-gray-300" />
                <span tw="text-info text-gray-700">{moment(danji.construction_start_date).format('YYYY.MM')}</span>
              </>
            )}
          </div>

          <div tw="w-full flex flex-col gap-2">
            <Button variant="secondary" size="medium" tw="w-full" onClick={handleCTA}>
              원하는 가격의 매물 추천받기
            </Button>
            <div tw="flex gap-1 justify-center">
              <span tw="text-info">현재 추천 요청자수</span>
              <span tw="text-info font-bold text-nego">{danji.suggest_count || 0}</span>
            </div>
          </div>
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
