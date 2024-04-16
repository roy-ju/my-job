import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import tw from 'twin.macro';

import { Button, ButtonV2 } from '@/components/atoms';

import NewTabs from '@/components/molecules/Tabs/NewTabs';

import { useRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

import getPath from '@/utils/getPath';

import { apiService } from '@/services';

import { useAPI_GetDanjiNaver } from '@/apis/danji/danjiNaver';

import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import NaverLogo from '@/assets/icons/naver_logo.svg';

import SuggestListingsNodata from '@/components/domains/suggest/listings-list/Nodata';

import DanjiListingsNodata from '@/components/domains/danji/listings-list/Nodata';

import { useFetchDanjiSuggestsList } from '@/services/danji/useFetchDanjiSuggestsList';

import { useFetchDanjiListingsList } from '@/services/danji/useFetchDanjiListingsList';

import SuggestCardInDanji from '../suggest/SuggestCardInDanji';

import DanjiListingsCard from '../danji/DanjiListingsCard';

import ImpossibleSuggestAreaPopup from '../popups/ImpossibleSuggestAreaPopup';

export default function ActiveListingInfo({
  isListingDetail = false,
  depth,
  danji,
}: {
  isListingDetail?: boolean;
  depth: number;
  danji?: GetDanjiDetailResponse;
}) {
  const [isRecommendationService, setIsRecommendationService] = useState(false);

  const [impossibleSuggestAreaPopup, setImpossibleSuggestAreaPopup] = useState(false);

  const { pcNaverURL } = useAPI_GetDanjiNaver({ danjiId: danji?.danji_id });

  const [tab, setTab] = useState(1);

  const router = useRouter(depth);

  const nextRouter = useNextRouter();

  const { data: danjiListingsListData } = useFetchDanjiListingsList({
    danjiID: danji?.danji_id,
    realestateType: danji?.type,
    orderBy: 1,
    pageSize: 4,
  });

  const danjiListings = useMemo(() => {
    if (!danjiListingsListData) return [];

    return danjiListingsListData
      ?.map((item) => item?.list)
      .filter((item) => Boolean(item))
      .flat();
  }, [danjiListingsListData]);

  const totalCount = useMemo(
    () => (danjiListingsListData ? (danjiListingsListData[0] ? danjiListingsListData[0].total_count : 0) : 0),
    [danjiListingsListData],
  );

  const { data: suggestListData, mutate } = useFetchDanjiSuggestsList({
    danjiID: danji?.danji_id,
    pageSize: 4,
  });

  const suggestListings = useMemo(() => {
    if (!suggestListData) return [];

    return suggestListData
      ?.map((item) => item?.list)
      .filter((item) => Boolean(item))
      .flat();
  }, [suggestListData]);

  const suggestTotalCount = useMemo(
    () => (suggestListData ? (suggestListData[0] ? suggestListData[0].total_count : 0) : 0),
    [suggestListData],
  );

  const handleSuggestListAll = useCallback(() => {
    if (router.query.listingID) {
      router.replace(Routes.SuggestListings, {
        searchParams: {
          listingID: router.query.listingID as string,
          danjiID: `${danji?.danji_id}` || `${router?.query?.danjiID}` || '',
        },
      });
    } else {
      router.replace(Routes.SuggestListings, {
        searchParams: { danjiID: `${danji?.danji_id}` || `${router?.query?.danjiID}` },
      });
    }
  }, [router, danji]);

  const handleSuggestDetail = useCallback(
    (id: number, mySuggest: boolean) => {
      if (mySuggest) {
        router.push(Routes.MySuggestDetail, {
          searchParams: { suggestID: `${id}`, danjiID: `${danji?.danji_id}` || `${router?.query?.danjiID}` || '' },
        });
        return;
      }

      router.push(Routes.SuggestDetail, {
        searchParams: { danjiID: `${danji?.danji_id}` || `${router?.query?.danjiID}` || '', suggestID: `${id}` },
      });
    },
    [danji?.danji_id, router],
  );

  const handleListingAll = useCallback(() => {
    if (router.query.listingID) {
      router.replace(Routes.DanjiListings, {
        searchParams: {
          listingID: router.query.listingID as string,
          danjiID: `${danji?.danji_id}` || `${router?.query?.danjiID}` || '',
        },
      });
    } else {
      router.replace(Routes.DanjiListings, {
        searchParams: { danjiID: `${router?.query?.danjiID}` },
      });
    }
  }, [router, danji]);

  const handleListingAllInListingDetail = useCallback(() => {
    if (router.query.listingID) {
      nextRouter.replace({
        pathname: `/${Routes.DanjiListings}`,
        query: {
          danjiID: `${danji?.danji_id}` || `${router?.query?.danjiID}` || '',
        },
      });
    } else {
      nextRouter.replace({
        pathname: `/${Routes.DanjiListings}`,
        query: {
          danjiID: `${danji?.danji_id}` || `${router?.query?.danjiID}` || '',
        },
      });
    }
  }, [router.query.listingID, router.query?.danjiID, nextRouter, danji?.danji_id]);

  const handleListingDetail = useCallback(
    (id: number, buyOrRent: number) => {
      nextRouter.replace(
        {
          pathname: `/${Routes.DanjiListings}/${Routes.ListingDetail}`,
          query: {
            listingID: `${id}`,
            danjiID: `${danji?.danji_id}` || `${router?.query?.danjiID}` || '',
            bor: `${buyOrRent}`,
          },
        },
        `/${Routes.DanjiListings}/${Routes.ListingDetail}?listingID=${id}&danjiID=${
          danji?.danji_id || `${router?.query?.danjiID}` || ''
        }`,
      );
    },
    [nextRouter, danji?.danji_id, router?.query?.danjiID],
  );

  const handleCreateSuggest = useCallback(() => {
    const danjiID = `${danji?.danji_id}` || router?.query?.danjiID || '';

    const path = getPath({
      depth1: nextRouter?.query?.depth1 as NegocioPath,
      depth2: nextRouter?.query?.depth2 as NegocioPath,
      targetPath: Routes.SuggestForm as NegocioPath,
    });

    nextRouter.push({
      pathname: path,
      query: {
        entry: Routes.DanjiDetail,
        danjiID,
      },
    });
  }, [danji?.danji_id, nextRouter, router?.query?.danjiID]);

  const handleClosePopup = () => {
    setImpossibleSuggestAreaPopup(false);
  };

  const handleOpenNaverRealestate = () => {
    if (pcNaverURL) {
      window.open(pcNaverURL);
    }
  };

  const handleSuggestCTA = () => {
    if (isRecommendationService) {
      setImpossibleSuggestAreaPopup(false);

      if (handleCreateSuggest) {
        handleCreateSuggest();
      }
    } else {
      setImpossibleSuggestAreaPopup(true);
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
    window.Negocio.callbacks.mutateSuggestList = () => {
      mutate();
    };

    return () => {
      delete window.Negocio.callbacks.mutateSuggestList;
    };
  }, [mutate]);

  if (isListingDetail && danjiListings?.length > 0)
    return (
      <div tw="flex flex-col gap-3 px-5 pb-10">
        <Button
          variant="outlined"
          size="medium"
          tw="w-full mt-4"
          onClick={handleListingAllInListingDetail}
          name="allDanjiListingsShow"
        >
          매물 전체보기&nbsp;{!!totalCount && <span tw="font-bold">{totalCount}</span>}
        </Button>

        {pcNaverURL && (
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
                    전체보기
                  </Button>
                )
              : totalCount > 3 && (
                  <Button variant="outlined" tw="h-9" onClick={handleListingAll}>
                    전체보기
                  </Button>
                )}
          </div>

          <>
            {tab === 1 &&
              (suggestListings?.length > 0 ? (
                <div tw="flex flex-col gap-4 py-2 mt-4">
                  {suggestListings?.slice(0, 3).map((item) => (
                    <SuggestCardInDanji
                      key={item.suggest_id}
                      item={item}
                      onClick={() => handleSuggestDetail(item.suggest_id, item.my_suggest)}
                    />
                  ))}
                </div>
              ) : (
                <SuggestListingsNodata />
              ))}

            {tab === 2 &&
              (danjiListings?.length > 0 ? (
                danjiListings
                  ?.slice(0, 3)
                  .map((item, index) => (
                    <DanjiListingsCard
                      key={item.listing_id}
                      item={item}
                      isFirst={index === 0}
                      isLast={index === 2}
                      onClick={() => handleListingDetail(item.listing_id, item.buy_or_rent)}
                    />
                  ))
              ) : (
                <DanjiListingsNodata />
              ))}
          </>
        </div>

        <div tw="w-full pt-5 px-5">
          {tab === 1 && (
            <ButtonV2 tw="w-full" onClick={handleSuggestCTA} size="big">
              구해요 등록
            </ButtonV2>
          )}

          {pcNaverURL && (
            <Button variant="outlined" tw="w-full mt-4" size="medium" onClick={handleOpenNaverRealestate}>
              <NaverLogo style={{ marginRight: '4px' }} />
              네이버 호가 확인하기
            </Button>
          )}
        </div>
      </div>

      {impossibleSuggestAreaPopup && <ImpossibleSuggestAreaPopup handleClosePopup={handleClosePopup} />}
    </>
  );
}
