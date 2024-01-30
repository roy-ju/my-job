import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Image from 'next/image';

import tw from 'twin.macro';

import { motion } from 'framer-motion';

import { Button } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import NewTabs from '@/components/molecules/Tabs/NewTabs';

import Routes from '@/router/routes';

import { apiService } from '@/services';

import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import { useAPI_GetDanjiListingsList } from '@/apis/danji/danjiListingsList';

import { useAPI_GetDanjiSuggestList } from '@/apis/danji/danjiSuggestList';

import { useAPI_GetDanjiNaver } from '@/apis/danji/danjiNaver';

import NaverLogo from '@/assets/icons/naver_logo.svg';

import SuggestNodata from '@/../public/static/images/suggest_nodata.png';

import ListingNodata from '@/../public/static/images/listing_nodata.png';

import ListingItem from '../ListingItem';

export default function ActiveListingInfo({
  isListingDetail = false,
  danji,
  tabIndex,
}: {
  isListingDetail?: boolean;
  danji?: GetDanjiDetailResponse;
  tabIndex?: number;
}) {
  const [isRecommendationService, setIsRecommendationService] = useState(false);
  const [impossibleRecommendationPopup, setImpossibleRecommendataionPopup] = useState(false);

  const { mobileNaverURL } = useAPI_GetDanjiNaver({ danjiId: danji?.danji_id });

  const [tab, setTab] = useState(1);

  const router = useRouter();

  const { totalCount, data: danjiListings } = useAPI_GetDanjiListingsList({
    danjiId: danji?.danji_id,
    realestateType: danji?.type,
    orderBy: 1,
    pageSize: 4,
  });

  const {
    data: suggestListings,
    totalCount: suggestTotalCount,
    mutate,
  } = useAPI_GetDanjiSuggestList({
    danjiId: danji?.danji_id,
    pageSize: 4,
  });

  const handleSuggestListAll = useCallback(() => {
    router.push(
      `/${Routes.EntryMobile}/${Routes.SuggestListings}?danjiID=${danji?.danji_id || router?.query?.danjiID}`,
    );
  }, [router, danji]);

  const handleSuggestDetail = useCallback(
    (id: number, mySuggest: boolean) => {
      if (mySuggest) {
        router.push(
          `/${Routes.EntryMobile}/${Routes.MySuggestDetail}?danjiID=${
            danji?.danji_id || router?.query?.danjiID
          }&suggestID=${id}`,
        );
        return;
      }

      router.push(
        `/${Routes.EntryMobile}/${Routes.SuggestDetail}?danjiID=${
          danji?.danji_id || router?.query?.danjiID
        }&suggestID=${id}`,
      );
    },
    [danji?.danji_id, router],
  );

  const handleListingAll = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.DanjiListings}?danjiID=${danji?.danji_id || router?.query?.danjiID}`);
  }, [danji?.danji_id, router]);

  const handleListingDetail = useCallback(
    (id: number, buyOrRent: number) => {
      router.push(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.ListingDetail}`,
          query: {
            listingID: `${id}`,
            danjiID: router.query.danjiID ? `${router.query.danjiID}` : `${danji?.danji_id}` || '',
            bor: `${buyOrRent}`,
          },
        },
        `/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${id}&danjiID=${
          danji?.danji_id || `${router?.query?.danjiID}` || ''
        }`,
      );
    },
    [router, danji],
  );

  const handleCreateSuggest = useCallback(() => {
    const danjiID = `${danji?.danji_id}` || router?.query?.danjiID || '';

    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
      query: {
        entry: Routes.DanjiDetail,
        ...(danjiID ? { danjiID } : {}),
      },
    });
  }, [danji?.danji_id, router]);

  const handleClosePopup = (type: 'impossibleRecommendataion') => {
    if (type === 'impossibleRecommendataion') {
      setImpossibleRecommendataionPopup(false);
    }
  };

  const handleOpenNaverRealestate = () => {
    if (mobileNaverURL) {
      window.open(mobileNaverURL);
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
      const response = await apiService.suggestEligibilityCheck({ bubjungdong_code: code });

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

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isListingDetail && danjiListings?.length > 0)
    return (
      <div tw="flex flex-col gap-3 px-5 pb-10">
        <Button variant="outlined" size="medium" tw="w-full" onClick={handleListingAll}>
          매물 전체보기&nbsp;{!!totalCount && <span tw="font-bold">{totalCount}</span>}
        </Button>

        {mobileNaverURL && (
          <Button variant="outlined" tw="w-full" size="medium" onClick={handleOpenNaverRealestate}>
            <NaverLogo style={{ marginRight: '4px' }} />
            네이버 호가 확인하기
          </Button>
        )}
      </div>
    );

  return (
    <>
      <div tw="pb-10">
        <NewTabs variant="contained" value={tab} onChange={(v) => setTab(v)}>
          <NewTabs.Tab value={1}>
            <span tw="text-b2 leading-4">
              구해요 <span css={[tab === 1 && tw`text-nego-1000`]}>{suggestTotalCount || 0}</span>
            </span>
          </NewTabs.Tab>
          <NewTabs.Tab value={2}>
            <span tw="text-b2 leading-4">
              매물 <span css={[tab === 2 && tw`text-nego-1000`]}>{totalCount || 0}</span>
            </span>
          </NewTabs.Tab>
          <NewTabs.Indicator />
        </NewTabs>

        <div>
          <div tw="flex pt-7 px-5 items-center justify-between">
            {tab === 1
              ? suggestListings?.length > 0 && (
                  <h2 tw="text-info text-gray-700">
                    중개사와 집주인의 연락을
                    <br />
                    기다리고 있는 요청이에요.
                  </h2>
                )
              : danjiListings?.length > 0 && (
                  <h2 tw="text-info text-gray-700">
                    매수인, 임차인의 가격 제안을
                    <br />
                    기다리고 있는 매물이에요.
                  </h2>
                )}

            {tab === 1
              ? suggestTotalCount > 3 && (
                  <Button variant="outlined" tw="h-9" onClick={handleSuggestListAll}>
                    구해요 전체보기
                  </Button>
                )
              : totalCount > 3 && (
                  <Button variant="outlined" tw="h-9" onClick={handleListingAll}>
                    매물 전체보기
                  </Button>
                )}
          </div>

          <ListingItem>
            {tab === 1 &&
              (suggestListings?.length > 0 ? (
                <div tw="flex flex-col gap-4 px-5 mt-4">
                  {suggestListings?.slice(0, 3).map((item) => (
                    <ListingItem.TypeTwo
                      key={item.suggest_id}
                      item={item}
                      onClick={() => handleSuggestDetail(item.suggest_id, item.my_suggest)}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <div tw="flex flex-col px-5 items-center">
                    <Image src={SuggestNodata.src} width={200} height={128} alt="" />
                    <p tw="mt-4 mb-2 text-center text-h2 font-bold">원하는 조건의 매물을 구해보세요.</p>
                    <p tw="text-center text-info text-gray-700">
                      단지 주변 중개사에게 매물을 추천받고
                      <br />이 단지 집주인에게 직접 연락 받을 수 있어요.
                    </p>
                  </div>
                </>
              ))}

            {tab === 2 &&
              (danjiListings?.length > 0 ? (
                danjiListings
                  ?.slice(0, 3)
                  .map((item, index) => (
                    <ListingItem.TypeOne
                      key={item.listing_id}
                      item={item}
                      isFirst={index === 0}
                      isLast={index === 2}
                      onClick={() => handleListingDetail(item.listing_id, item.buy_or_rent)}
                    />
                  ))
              ) : (
                <div tw="px-5 flex-1 min-h-0 overflow-auto flex flex-col items-center">
                  <Image src={ListingNodata.src} width={200} height={128} alt="" />
                  <p tw="mt-4 mb-2 text-center text-h2 font-bold">해당 단지에 등록된 매물이 없어요!</p>
                  <p tw="text-center text-info text-gray-700">
                    해당 단지에 매물을 가지고 있다면
                    <br />
                    우리집 등록 후 매물을 등록해보세요!
                  </p>
                </div>
              ))}
          </ListingItem>
        </div>

        <div tw="w-full pt-5 px-5">
          {tab === 1 && (
            <Button tw="w-full" onClick={handleSuggestCTA} size="bigger">
              구해요 등록
            </Button>
          )}

          {mobileNaverURL && (
            <Button variant="outlined" tw="w-full mt-4" size="medium" onClick={handleOpenNaverRealestate}>
              <NaverLogo style={{ marginRight: '4px' }} />
              네이버 호가 확인하기
            </Button>
          )}
        </div>
      </div>

      {typeof tabIndex === 'number' && tabIndex >= 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          tw="flex items-center fixed bottom-0 [z-index: 100000] pt-4 px-5 [padding-bottom: 42px] gap-3 bg-white w-full shadow"
        >
          <Button tw="flex-1" onClick={handleSuggestCTA} size="bigger">
            구해요 등록
          </Button>
        </motion.div>
      )}

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
