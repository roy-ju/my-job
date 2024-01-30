/* eslint-disable react-hooks/exhaustive-deps */
import { addFavorite } from '@/apis/listing/addListingFavroite';

import useAPI_GetListingDetail, { GetListingDetailResponse } from '@/apis/listing/getListingDetail';

import useAPI_GetListingQnaList from '@/apis/listing/getListingQnaList';

import useAPI_GetListingStatus from '@/apis/listing/getListingStatus';

import { removeFavorite } from '@/apis/listing/removeListingFavorite';

import { Loading, MobileContainer } from '@/components/atoms';

import { MobListingDetail } from '@/components/templates';

import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import Routes from '@/router/routes';

import axios from '@/lib/axios';

import { memo, useCallback, useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { OverlayPresenter, Popup } from '@/components/molecules';

import deleteListingQna from '@/apis/listing/deleteListingQna';

import { useRouter } from 'next/router';

import { SharePopup } from '@/components/organisms';

import { BuyOrRent, VisitUserType } from '@/constants/enums';

import formatNumberInKorean from '@/utils/formatNumberInKorean';

import Paths from '@/constants/paths';

import { BuyOrRentString, RealestateTypeString } from '@/constants/strings';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useMobileDanjiMap from '@/states/hooks/useMobileDanjiMap';

import FullScreenMap from '@/components/templates/MobDanjiDetail/Components/FullScreenMap';

import DanjiAroundDetail from '@/components/templates/MobDanjiDetail/Components/DanjiAroundDetail';

import DanjiSchoolDetail from '@/components/templates/MobDanjiDetail/Components/DanjiSchoolDetail';

import viewListing from '@/apis/listing/viewListing';

import useAuth from '@/hooks/services/useAuth';

import useAPI_GetRealestateDocument from '@/apis/listing/getRealestateDocument';

import ErrorCodes from '@/constants/error_codes';

import { apiService } from '@/services';

import kakaoShare from '@/utils/kakaoShare';

import useListingDetailRedirector from './useListingDetailRedirector';

import useDanjiDetail from '../DanjiDetail/useDanjiDetail';

export default memo(() => {
  const { user } = useAuth();

  const router = useRouter();

  const listingID = Number(router.query.listingID) ?? 0;

  const { redirectable } = useListingDetailRedirector(listingID);

  const { data: statusData, isLoading: isLoadingStatus } = useAPI_GetListingStatus(listingID);

  const { data, mutate: mutateListing, isLoading } = useAPI_GetListingDetail(statusData?.can_access ? listingID : 0);

  const { data: realestateDocumentData } = useAPI_GetRealestateDocument(statusData?.can_access ? listingID : 0);

  const [isPopupButtonLoading, setIsPopupButtonLoading] = useState(false);

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const {
    danjiAroundData,
    isTrue,
    isTrueSchool,
    isTrueAround,
    makeFalse,
    makeFalseAround,
    makeFalseSchool,
    makeBindDanji,
  } = useMobileDanjiInteraction();

  const { mapType, makeGeneralMap } = useMobileDanjiMap();

  const { danji } = useDanjiDetail(data?.listing?.danji_id);

  const {
    data: qnaData,
    hasNext: hasMoreQnas,
    increamentPageNumber: loadMoreQnas,
    mutate: mutateQnas,
  } = useAPI_GetListingQnaList(statusData?.can_access ? listingID : 0);

  const [popup, setPopup] = useState('none');

  const handleClickMoreItem = useCallback(
    (_: number, buttonTitle: string) => {
      if (buttonTitle === '매물관리') {
        router.push(`/${Routes.EntryMobile}/${Routes.ListingManage}?listingID=${router.query.listingID}`);
      } else if (buttonTitle === '신고하기') {
        router.push(`/${Routes.EntryMobile}/${Routes.ListingReport}?listingID=${router.query.listingID}`);
      } else if (buttonTitle === '중개약정확인') {
        router.push(
          {
            pathname: `/${Routes.EntryMobile}/${Routes.ContractTerms}?listingID=${router.query.listingID}`,
            query: {
              listingID: router.query.listingID as string,
              type: data?.visit_user_type === VisitUserType.SellerGeneral ? 'seller' : 'buyer',
            },
          },
          `/${Routes.EntryMobile}/${Routes.ContractTerms}?listingID=${router.query.listingID}&type=${
            data?.visit_user_type === VisitUserType.SellerGeneral ? 'seller' : 'buyer'
          }`,
        );
      }
    },
    [router],
  );

  const handleClickFavorite = useCallback(async () => {
    if (!user) {
      openAuthPopup('onlyLogin');
      handleUpdateReturnUrl();
      return;
    }

    async function removeFavoriteOptimistic() {
      if (data?.listing?.id) {
        await removeFavorite(data.listing.id);
        const { data: updatedData } = await axios.post('/listing/detail', { listing_id: listingID });
        return updatedData;
      }
    }
    async function addFavoriteOptimistic() {
      if (data?.listing?.id) {
        await addFavorite(data.listing.id);
        const { data: updatedData } = await axios.post('/listing/detail', { listing_id: listingID });
        return updatedData;
      }
    }

    if (data?.listing?.id) {
      if (data.is_favorite) {
        await mutateListing(removeFavoriteOptimistic, {
          optimisticData: { ...data, is_favorite: false },
          rollbackOnError: true,
        });

        toast.success('관심 매물을 해제하셨습니다.');
      } else {
        await mutateListing(addFavoriteOptimistic, {
          optimisticData: { ...data, is_favorite: true },
          rollbackOnError: true,
        });
        toast.success('관심 매물에 추가되었습니다.');
      }
    }
  }, [data, mutateListing, user, router, listingID]);

  const handleClickDeleteQna = useCallback(
    async (id: number) => {
      await deleteListingQna({ qna_id: id });
      toast.success('문의가 삭제되었습니다.');
      await mutateQnas();
    },
    [mutateQnas],
  );

  const handleNavigateToCreateQna = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingQnaCreateForm}?listingID=${router.query.listingID}`);
  }, [router]);

  const handleNavigateToParticipateBidding = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.BiddingForm}?listingID=${router.query.listingID}`);
  }, [router]);

  const handleNavigateToUpdateBidding = useCallback(() => {
    if (!data?.bidding_id) {
      toast.error('bidding_id not found');
    }
    router.push(
      `/${Routes.EntryMobile}/${Routes.UpdateBiddingForm}?listingID=${router.query.listingID}&biddingID=${data?.bidding_id}`,
    );
  }, [router, data?.bidding_id]);

  const handleNavigateToChatRoom = useCallback(() => {
    if (data?.chat_room_id) {
      router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${data.chat_room_id}`);
    }
  }, [router, data]);

  const handleNavigateToPhotoGallery = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingPhotoGallery}?listingID=${router.query.listingID}`);
  }, [router]);

  const handleNavigateToUpdateTargetPrice = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingTargetPriceUpdate}?listingID=${router.query.listingID}`);
  }, [router]);

  const handleNavigateToSuggestForm = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.SuggestForm}`);
    // To do 추가 로직 구현필요
  }, [router]);

  const handleNavigateToListingDetailHistory = useCallback(() => {
    router.push(
      `/${Routes.EntryMobile}/${Routes.ListingDetailHistory}?listingID=${listingID}&biddingID=${data?.bidding_id}`,
    );
  }, [router, listingID, data?.bidding_id]);

  const openSuggestNotInterstedPopup = useCallback(() => {
    setPopup('suggestNotInterested');
  }, []);

  const openSuggestAcceptRecommendPopup = useCallback(() => {
    setPopup('suggestAcceptRecommend');
  }, []);

  const handleSuggestAcceptRecommend = useCallback(async () => {
    if (!data?.suggest_recommend_id) return;
    setIsPopupButtonLoading(true);

    await mutateListing();

    setIsPopupButtonLoading(false);

    setPopup('none');
  }, [data?.suggest_recommend_id, mutateListing]);

  const handleSuggestNotInterested = useCallback(async () => {
    if (!data?.suggest_recommend_id) return;
    setIsPopupButtonLoading(true);

    await apiService.mySuggestRecommendNotIntersted({ id: data.suggest_recommend_id });
    await mutateListing();

    setIsPopupButtonLoading(false);

    setPopup('none');
  }, [data?.suggest_recommend_id, mutateListing]);

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  const handleClickShare = useCallback(() => {
    setPopup('share');
  }, []);

  const handleCopyUrl = useCallback(() => {
    let priceText = '';
    if (data?.listing?.buy_or_rent === BuyOrRent.Wolsae) {
      priceText = `${formatNumberInKorean(data?.trade_or_deposit_price)}/${formatNumberInKorean(
        data?.monthly_rent_fee,
      )}`;
    } else {
      priceText = `${formatNumberInKorean(data?.trade_or_deposit_price ?? 0)}`;
    }

    const content = `[네고시오] ${data?.display_address}\n► 부동산 종류 : ${
      RealestateTypeString[data?.listing?.realestate_type ?? 0]
    }\n► 거래종류 : ${BuyOrRentString[data?.listing?.buy_or_rent ?? 0]}\n► 집주인 희망가 :${priceText}\n\n${
      window.origin
    }/${Routes.ListingDetail}?listingID=${data?.listing?.id}`;
    navigator.clipboard.writeText(content);
    setPopup('none');
    toast.success('복사되었습니다.');
  }, [data]);

  const handleShareViaKakao = useCallback(() => {
    const link = `${window.origin}/${Routes.ListingDetail}?listingID=${data?.listing?.id}`;
    let description = data?.display_address;

    if (data?.listing?.buy_or_rent === BuyOrRent.Wolsae) {
      description = `${formatNumberInKorean(data?.trade_or_deposit_price)}/${formatNumberInKorean(
        data?.monthly_rent_fee,
      )}, ${data?.display_address}`;
    } else {
      description = `${formatNumberInKorean(data?.trade_or_deposit_price ?? 0)}, ${data?.display_address}`;
    }

    kakaoShare({
      width: 1200,
      height: 630,
      objectType: 'feed',
      title: data?.listing?.listing_title ?? '',
      description,
      imgUrl: Paths.DEFAULT_OPEN_GRAPH_IMAGE_2,
      buttonTitle: '자세히보기',
      link,
    });
  }, [data]);

  useEffect(
    () => () => {
      // 페이지가 언마운트 됐을때 초기화
      makeFalse();
      makeFalseAround();
      makeFalseSchool();
      makeGeneralMap();
      makeBindDanji(undefined);
    },
    [],
  );

  useEffect(() => {
    if (statusData?.can_access === true) {
      viewListing({
        listing_id: listingID,
        ip_address: '',
        device: '',
        browser: '',
      });
    }
  }, [listingID, statusData]);

  if (data?.error_code) {
    return <MobileContainer>{data?.error_code}</MobileContainer>;
  }

  if (isLoading || isLoadingStatus || (!statusData?.can_access && redirectable)) {
    return (
      <MobileContainer>
        <div tw="py-20">
          <Loading />
        </div>
      </MobileContainer>
    );
  }

  if (!statusData?.can_access && !redirectable) {
    return (
      <OverlayPresenter>
        <Popup>
          <Popup.ContentGroup tw="py-10">
            {statusData?.error_code === ErrorCodes.LISTING_DOES_NOT_EXIST ? (
              <Popup.Title tw="[text-align: center]">유효하지 않은 페이지 입니다.</Popup.Title>
            ) : (
              <Popup.Title tw="[text-align: center]">
                거래가 종료되어
                <br />
                매물 상세 정보를 확인할 수 없습니다.
              </Popup.Title>
            )}
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton onClick={() => router.back()}>확인</Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  return (
    <>
      {!isTrue && !isTrueAround && !isTrueSchool && (
        <>
          <MobileContainer>
            <MobListingDetail
              listingDetail={data as GetListingDetailResponse}
              qnaList={qnaData}
              isLoading={isLoading || isLoadingStatus}
              hasMoreQnas={hasMoreQnas}
              realestateDocumentData={realestateDocumentData}
              onClickShare={handleClickShare}
              onClickMoreItem={handleClickMoreItem}
              onClickFavorite={handleClickFavorite}
              onClickLoadMoreQna={loadMoreQnas}
              onClickDeleteQna={handleClickDeleteQna}
              onClickSuggestAcceptRecommend={openSuggestAcceptRecommendPopup}
              onClickSuggestNotInterested={openSuggestNotInterstedPopup}
              onNavigateToParticipateBidding={handleNavigateToParticipateBidding}
              onNavigateToUpdateTargetPrice={handleNavigateToUpdateTargetPrice}
              onNavigateToUpdateBidding={handleNavigateToUpdateBidding}
              onNavigateToChatRoom={handleNavigateToChatRoom}
              onNavigateToCreateQna={handleNavigateToCreateQna}
              onNavigateToPhotoGallery={handleNavigateToPhotoGallery}
              onNavigateToSuggestForm={handleNavigateToSuggestForm}
              onNavigateToListingDetailHistory={handleNavigateToListingDetailHistory}
              onClickBack={handleClickBack}
            />
            {popup === 'suggestNotInterested' && (
              <OverlayPresenter>
                <Popup>
                  <Popup.ContentGroup tw="py-10">
                    <Popup.Title>
                      관심없음으로 표시한 매물은
                      <br />
                      추천받은 목록에서 삭제됩니다.
                    </Popup.Title>
                  </Popup.ContentGroup>
                  <Popup.ButtonGroup>
                    <Popup.CancelButton onClick={() => setPopup('none')}>취소</Popup.CancelButton>
                    <Popup.ActionButton isLoading={isPopupButtonLoading} onClick={handleSuggestNotInterested}>
                      확인
                    </Popup.ActionButton>
                  </Popup.ButtonGroup>
                </Popup>
              </OverlayPresenter>
            )}
            {popup === 'suggestAcceptRecommend' && (
              <OverlayPresenter>
                <Popup>
                  <Popup.ContentGroup tw="py-10">
                    <Popup.Title>
                      중개사님과의 채팅방이 개설됩니다.
                      <br />
                      채팅방을 나가시면 네고 협의가 중단되니 유의해 주세요.
                    </Popup.Title>
                  </Popup.ContentGroup>
                  <Popup.ButtonGroup>
                    <Popup.CancelButton onClick={() => setPopup('none')}>취소</Popup.CancelButton>
                    <Popup.ActionButton isLoading={isPopupButtonLoading} onClick={handleSuggestAcceptRecommend}>
                      확인
                    </Popup.ActionButton>
                  </Popup.ButtonGroup>
                </Popup>
              </OverlayPresenter>
            )}
            {popup === 'share' && (
              <OverlayPresenter>
                <SharePopup
                  onClickOutside={() => setPopup('none')}
                  onClickShareViaKakao={handleShareViaKakao}
                  onClickCopyUrl={handleCopyUrl}
                />
              </OverlayPresenter>
            )}
          </MobileContainer>
        </>
      )}

      {isTrue && (
        <MobileContainer>
          <FullScreenMap danji={danji} type={mapType} />
        </MobileContainer>
      )}

      {isTrueAround && (
        <MobileContainer>
          <DanjiAroundDetail danji={danjiAroundData} />
        </MobileContainer>
      )}

      {isTrueSchool && (
        <MobileContainer>
          <DanjiSchoolDetail lat={danji?.lat} lng={danji?.long} rt={danji?.type} danjiID={danji?.danji_id} />
        </MobileContainer>
      )}
    </>
  );
});
