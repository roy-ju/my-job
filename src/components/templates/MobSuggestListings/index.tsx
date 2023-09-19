import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { danjiSuggestEligibilityCheck } from '@/apis/danji/danjiRecommendation';
import { GetDanjiSuggestListResponse } from '@/apis/danji/danjiSuggestList';
import { Button, InfiniteScroll, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader, OverlayPresenter, Popup } from '@/components/molecules';
import { ListingItem, MobDanjiDetailSection } from '@/components/organisms';
import { useRouter } from 'next/router';
import Routes from '@/router/routes';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import SuggestNodata from '@/../public/static/images/suggest_nodata.png';
import Image from 'next/image';

type Props = {
  danji?: GetDanjiDetailResponse;

  data?: GetDanjiSuggestListResponse['list'];
  totalCount?: number;

  onNext?: () => void;

  onClickBack?: () => void;
};

export default function MobSuggestListings({ danji, data, totalCount, onNext, onClickBack }: Props) {
  const router = useRouter();

  const [isRecommendationService, setIsRecommendationService] = useState(false);
  const [impossibleRecommendationPopup, setImpossibleRecommendataionPopup] = useState(false);

  const danjiID = useMemo(() => danji?.danji_id || '', [danji?.danji_id]);

  const handleSuggestDetail = useCallback(
    (id: number, mySuggest: boolean) => {
      if (mySuggest) {
        router.push(`/${Routes.EntryMobile}/${Routes.MySuggestDetail}?danjiID=${danjiID}&suggestID=${id}`);
        return;
      }

      router.push(`/${Routes.EntryMobile}/${Routes.SuggestDetail}?danjiID=${danjiID}&suggestID=${id}`);
    },
    [danjiID, router],
  );

  const handleCreateSuggest = useCallback(() => {
    const redirectURL = `/${Routes.EntryMobile}/${Routes.SuggestListings}?danjiID=${danjiID}`;

    router.push(
      `/${Routes.EntryMobile}/${Routes.DanjiRecommendation}?danjiID=${danjiID}&redirect=${redirectURL}&entry=danji`,
    );
  }, [danjiID, router]);

  const handleClosePopup = (type: 'impossibleRecommendataion') => {
    if (type === 'impossibleRecommendataion') {
      setImpossibleRecommendataionPopup(false);
    }
  };

  const handleSuggestCTA = () => {
    if (isRecommendationService) {
      setImpossibleRecommendataionPopup(false);

      if (handleCreateSuggest) {
        handleCreateSuggest();
      }
    } else {
      setImpossibleRecommendataionPopup(true);
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
      <div tw="flex flex-col relative h-full">
        <NavigationHeader>
          {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
          <NavigationHeader.Title>구해요 목록</NavigationHeader.Title>
        </NavigationHeader>

        <div tw="[min-height: 24px]" />

        <MobDanjiDetailSection>
          <MobDanjiDetailSection.Info danji={danji} isShowDanjiListings />
        </MobDanjiDetailSection>

        {data && data.length > 0 && (
          <div tw="px-5 mb-4">
            <p tw="text-b1 font-bold mt-1">
              구해요 <span tw="text-nego-1000">{totalCount || 0}</span>
            </p>
            <p tw="text-info text-gray-700">중개사와 집주인의 연락을 기다리고 있는 요청이에요.</p>
          </div>
        )}

        {data && data.length > 0 && (
          <div tw="px-5 flex-1 min-h-0 overflow-auto">
            <InfiniteScroll tw="pt-0 flex-1 min-h-0 overflow-auto flex flex-col gap-4" onNext={onNext}>
              {data.map((item) => (
                <ListingItem.TypeTwo
                  key={item.suggest_id}
                  item={item}
                  onClick={() => handleSuggestDetail(item.suggest_id, item.my_suggest)}
                />
              ))}
            </InfiniteScroll>
          </div>
        )}

        {data && data.length === 0 && (
          <div tw="px-5 flex-1 min-h-0 overflow-auto flex flex-col items-center">
            <Image src={SuggestNodata.src} width={200} height={128} alt="" />
            <p tw="mt-4 mb-2 text-center text-h2 font-bold">원하는 조건의 매물을 구해보세요.</p>
            <p tw="text-center text-info text-gray-700">
              단지 주변 중개사에게 매물을 추천받고
              <br />이 단지 집주인에게 직접 연락 받을 수 있어요.
            </p>
          </div>
        )}

        <PersistentBottomBar>
          <div tw="w-full [padding-bottom: 26px]">
            <Button variant="primary" size="bigger" tw="w-full" onClick={handleSuggestCTA}>
              구해요 등록
            </Button>
          </div>
        </PersistentBottomBar>
      </div>

      {impossibleRecommendationPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SmallTitle>해당 지역은 서비스 준비중입니다.</Popup.SmallTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => handleClosePopup('impossibleRecommendataion')}>
                확인
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}
