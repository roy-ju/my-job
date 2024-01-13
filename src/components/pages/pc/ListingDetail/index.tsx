import { addFavorite } from '@/apis/listing/addListingFavroite';

import useAPI_GetListingDetail, { GetListingDetailResponse } from '@/apis/listing/getListingDetail';

import useAPI_GetListingQnaList from '@/apis/listing/getListingQnaList';

import useAPI_GetListingStatus from '@/apis/listing/getListingStatus';

import { removeFavorite } from '@/apis/listing/removeListingFavorite';

import { Loading, Panel } from '@/components/atoms';

import { ListingDetail } from '@/components/templates';

import { useRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

import { memo, useCallback, useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { OverlayPresenter, Popup } from '@/components/molecules';

import deleteListingQna from '@/apis/listing/deleteListingQna';

import axios from '@/lib/axios';

import { BuyOrRent, VisitUserType } from '@/constants/enums';

import { formatNumberInKorean } from '@/utils';

import Paths from '@/constants/paths';

import { SharePopup } from '@/components/organisms';

import { BuyOrRentString, RealestateTypeString } from '@/constants/strings';

import viewListing from '@/apis/listing/viewListing';

import useAuth from '@/hooks/services/useAuth';

import useAPI_GetRealestateDocument from '@/apis/listing/getRealestateDocument';

import ErrorCodes from '@/constants/error_codes';

import { useRouter as useNextRouter } from 'next/router';

import { apiService } from '@/services';

import useListingDetailRedirector from './useListingDetailRedirector';

interface Props {
  depth: number;
  listingID: number;
  panelWidth?: string;
  ipAddress?: string;
}

export default memo(({ depth, panelWidth, listingID, ipAddress }: Props) => {
  const { user } = useAuth();

  const { redirectable } = useListingDetailRedirector(listingID, depth);

  const router = useRouter(depth);
  const nextRouter = useNextRouter();

  const { data: statusData, isLoading: isLoadingStatus } = useAPI_GetListingStatus(listingID);

  const { data, mutate: mutateListing, isLoading } = useAPI_GetListingDetail(statusData?.can_access ? listingID : 0);

  const { data: realestateDocumentData } = useAPI_GetRealestateDocument(statusData?.can_access ? listingID : 0);

  const [isPopupButtonLoading, setIsPopupButtonLoading] = useState(false);

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
        router.push(Routes.ListingManage, { persistParams: true });
      } else if (buttonTitle === '신고하기') {
        router.push(Routes.ListingReport, { persistParams: true });
      } else if (buttonTitle === '중개약정확인') {
        router.replace(Routes.ContractTerms, {
          searchParams: {
            listingID: router.query.listingID as string,
            type: data?.visit_user_type === VisitUserType.SellerGeneral ? 'seller' : 'buyer',
          },
        });
      }
    },
    [router, data?.visit_user_type],
  );

  const handleClickFavorite = useCallback(async () => {
    if (!user) {
      router.replaceCurrent(Routes.Login, {
        persistParams: true,
        searchParams: { redirect: `${router.asPath}`, back: 'true' },
      });
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
        mutateListing(removeFavoriteOptimistic, {
          optimisticData: { ...data, is_favorite: false },
          rollbackOnError: true,
        });
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
    router.push(Routes.ListingQnaCreateForm, {
      searchParams: {
        listingID: router.query.listingID as string,
      },
    });
  }, [router]);

  const handleNavigateToParticipateBidding = useCallback(() => {
    router.push(Routes.BiddingForm, {
      searchParams: {
        listingID: router.query.listingID as string,
      },
    });
  }, [router]);

  const handleNavigateToUpdateBidding = useCallback(() => {
    if (!data?.bidding_id) {
      toast.error('bidding_id not found');
    }

    router.push(Routes.UpdateBiddingForm, {
      searchParams: {
        listingID: router.query.listingID as string,
        biddingID: `${data?.bidding_id}`,
      },
    });
  }, [router, data?.bidding_id]);

  const handleNavigateToChatRoom = useCallback(() => {
    if (data?.chat_room_id) {
      router.push(Routes.ChatRoom, {
        searchParams: {
          listingID: router.query.listingID as string,
          chatRoomID: `${data.chat_room_id}`,
        },
      });
    }
  }, [router, data]);

  const handleNavigateToPhotoGallery = useCallback(() => {
    router.push(Routes.ListingPhotoGallery, { persistParams: true });
  }, [router]);

  const handleNavigateToUpdateTargetPrice = useCallback(() => {
    router.push(Routes.ListingTargetPriceUpdate, {
      searchParams: {
        listingID: router.query.listingID as string,
      },
    });
  }, [router]);

  const handleNavigateToSuggestForm = useCallback(() => {
    router.replace(Routes.SuggestForm, { persistParams: true });
    // To do 추가 로직 구현필요
  }, [router]);

  const handleNavigateToListingDetailHistory = useCallback(() => {
    router.replace(Routes.ListingDetailHistory, {
      persistParams: true,
      searchParams: {
        listingID: `${listingID}`,
        biddingID: `${data?.bidding_id}`,
        back: `${router.asPath}`,
      },
    });
  }, [router, data, listingID]);

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

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      installTalk: true,
      content: {
        title: data?.listing?.listing_title ?? '',
        description,
        imageUrl: Paths.DEFAULT_OPEN_GRAPH_IMAGE_2,
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
        imageWidth: 1200,
        imageHeight: 630,
      },
      buttons: [
        {
          title: '자세히보기',
          link: {
            mobileWebUrl: link,
            webUrl: link,
          },
        },
      ],
    });
  }, [data]);

  const handleNavigateToBack = useCallback(() => {
    if (router.query.back) {
      nextRouter.replace(router.query.back as string);
    }
  }, [router, nextRouter]);

  useEffect(() => {
    if (statusData?.can_access === true) {
      viewListing({
        listing_id: listingID,
        ip_address: ipAddress !== '::1' ? ipAddress ?? '' : '',
        device: '',
        browser: '',
      });
    }
  }, [listingID, statusData, ipAddress]);

  useEffect(() => {
    if (data && data.listing) {
      window.Negocio.callbacks.selectMarker({
        id: `listingMarker:${data.listing?.id}`,
        lat: data.listing?.lat,
        lng: data.listing?.long,
      });
    }
  }, [data]);

  if (data?.error_code) {
    return <Panel width={panelWidth}>{data?.error_code}</Panel>;
  }

  if (isLoading || isLoadingStatus || (!statusData?.can_access && redirectable)) {
    return (
      <Panel width={panelWidth}>
        <div tw="py-20">
          <Loading />
        </div>
      </Panel>
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
            <Popup.ActionButton onClick={() => router.pop({ persistParams: false })}>확인</Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  return (
    <Panel width={panelWidth}>
      <ListingDetail
        depth={depth}
        listingDetail={data as GetListingDetailResponse}
        qnaList={qnaData}
        isLoading={isLoading || isLoadingStatus}
        hasMoreQnas={hasMoreQnas}
        realestateDocumentData={realestateDocumentData}
        onClickBack={router.query.back ? handleNavigateToBack : undefined}
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
      />
      {popup === 'suggestNotInterested' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.Title tw="text-b2 text-center">
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
            <Popup.ContentGroup tw="py-6">
              <Popup.Title tw="text-b2 text-center">
                매물에 대한 추가 협의는 채팅으로 진행할 수 있습니
                <br />
                다. 이를 위한 중개사님과의 채팅방이 개설됩니다.
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
    </Panel>
  );
});
