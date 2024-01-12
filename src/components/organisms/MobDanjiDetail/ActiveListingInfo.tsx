import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { useAPI_GetDanjiListingsList } from '@/apis/danji/danjiListingsList';
import { useAPI_GetDanjiSuggestList } from '@/apis/danji/danjiSuggestList';
import { Button } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import NewTabs from '@/components/molecules/Tabs/NewTabs';
import { motion } from 'framer-motion';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import tw from 'twin.macro';
import SuggestNodata from '@/../public/static/images/suggest_nodata.png';
import ListingNodata from '@/../public/static/images/listing_nodata.png';
import Image from 'next/image';
import { useAPI_GetDanjiNaver } from '@/apis/danji/danjiNaver';
import NaverLogo from '@/assets/icons/naver_logo.svg';
import useAPI_GetUserInfo from '@/apis/user/getUserInfo';
import listingEligibilityCheck from '@/apis/listing/listingEligibilityCheck';
import { suggestEligibilityCheck } from '@/apis/suggest/suggestEligibilityCheck';
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

  const [openVerificationAddressPopup, setOpenVerificationAddressPopup] = useState(false);
  const [openNeedMoreVerificationAddressPopup, setOpenNeedMoreVerificationAddressPopup] = useState(false);

  const { data: userData } = useAPI_GetUserInfo();

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

  const handleCreateListing = useCallback(async () => {
    if (!userData) {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.Login}`,
        query: {
          redirect: router.asPath,
        },
      });
      return;
    }

    if (!userData.is_verified) {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
        query: {
          redirect: router.asPath,
        },
      });
      return;
    }

    if (!userData?.has_address) {
      setOpenVerificationAddressPopup(true);
      return;
    }

    if (userData?.has_address) {
      const res = await listingEligibilityCheck({ danji_id: danji?.danji_id });

      if (res && !res?.is_eligible) {
        setOpenNeedMoreVerificationAddressPopup(true);
        return;
      }

      if (res && res?.is_eligible) {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.ListingSelectAddress}`,
          query: {
            origin: router.asPath,
            ...(router?.query?.danjiID ? { danjiID: router?.query?.danjiID } : {}),
          },
        });
      }
    }
  }, [danji?.danji_id, router, userData]);

  const handleCreateSuggest = useCallback(() => {
    const danjiID = `${danji?.danji_id}` || router?.query?.danjiID || '';

    const redirectURL = `/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${
      danji?.danji_id || router?.query?.danjiID || ''
    }`;

    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
      query: {
        ...(danjiID ? { danjiID } : {}),
        entry: Routes.DanjiDetail,
        redirect: redirectURL,
        origin: router.asPath,
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
      const response = await suggestEligibilityCheck(code);

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
                  <p tw="mt-4 mb-2 text-center text-h2 font-bold">거래를 희망하는 매물을 등록해 보세요.</p>
                  <p tw="text-center text-info text-gray-700">
                    매물등록만으로 중개사를 배정받고
                    <br />
                    매수인, 임차인에게 가격을 제안 받을 수 있어요.
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

          {tab === 2 && (
            <Button tw="w-full" onClick={handleCreateListing} size="bigger">
              매물 등록
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
          <Button variant="outlined" tw="flex-1" onClick={handleCreateListing} size="bigger">
            매물 등록
          </Button>
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

      {openVerificationAddressPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SubTitle>
                이 단지의 집주인만 매물등록이 가능합니다.
                <br />
                우리집을 인증하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setOpenVerificationAddressPopup(false)}>취소</Popup.CancelButton>
              <Popup.ActionButton
                onClick={() => {
                  setOpenVerificationAddressPopup(false);
                  router.push({
                    pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
                    query: {
                      origin: router.asPath,
                      ...(router?.query?.danjiID ? { danjiID: router?.query?.danjiID } : {}),
                    },
                  });
                }}
              >
                인증하기
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {openNeedMoreVerificationAddressPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SubTitle>
                추가로 매물등록이 가능한 우리집 정보가 없습니다.
                <br />
                우리집을 추가 인증하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setOpenNeedMoreVerificationAddressPopup(false)}>
                취소
              </Popup.CancelButton>
              <Popup.ActionButton
                onClick={() => {
                  setOpenNeedMoreVerificationAddressPopup(false);
                  router.push({
                    pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
                    query: {
                      origin: router.asPath,
                      ...(router?.query?.danjiID ? { danjiID: router?.query?.danjiID } : {}),
                    },
                  });
                }}
              >
                인증하기
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}
