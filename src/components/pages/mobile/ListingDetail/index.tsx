/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { addFavorite } from '@/apis/listing/addListingFavroite';
import useAPI_GetListingDetail, { GetListingDetailResponse } from '@/apis/listing/getListingDetail';
import useAPI_GetListingQnaList from '@/apis/listing/getListingQnaList';
import useAPI_GetListingStatus from '@/apis/listing/getListingStatus';
import { removeFavorite } from '@/apis/listing/removeListingFavorite';
import { Loading, MobileContainer } from '@/components/atoms';
import { ListingDetail } from '@/components/templates';
import Routes from '@/router/routes';
import { memo, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { OverlayPresenter, Popup } from '@/components/molecules';
import deleteListingQna from '@/apis/listing/deleteListingQna';
import { acceptRecommend } from '@/apis/suggest/acceptRecommend';
import { notIntersted } from '@/apis/suggest/notInterested';
import { useRouter } from 'next/router';
import useListingDetailRedirector from './useListingDetailRedirector';

export default memo(() => {
  const router = useRouter();
  const listingID = Number(router.query.listingID) ?? 0;

  const { redirectable } = useListingDetailRedirector(listingID);

  const { data: statusData, isLoading: isLoadingStatus } = useAPI_GetListingStatus(listingID);
  const { data, mutate: mutateListing, isLoading } = useAPI_GetListingDetail(statusData?.can_access ? listingID : 0);
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
      // if (buttonTitle === '매물관리') {
      //   router.push(Routes.ListingManage, { persistParams: true });
      // } else if (buttonTitle === '신고하기') {
      //   router.push(Routes.ListingReport, { persistParams: true });
      // }
    },
    [router],
  );

  const handleClickFavorite = useCallback(async () => {
    if (data?.listing?.id) {
      if (data.is_favorite) {
        await removeFavorite(data.listing.id);
      } else {
        await addFavorite(data.listing.id);
        toast.success('관심 매물에 추가되었습니다.');
      }
      await mutateListing();
    }
  }, [data, mutateListing]);

  const handleClickDeleteQna = useCallback(
    async (id: number) => {
      await deleteListingQna({ qna_id: id });
      toast.success('문의가 삭제되었습니다.');
      await mutateQnas();
    },
    [mutateQnas],
  );

  const handleNavigateToCreateQna = useCallback(() => {
    // router.push(Routes.ListingQnaCreateForm, {
    //   searchParams: {
    //     listingID: router.query.listingID as string,
    //   },
    // });
  }, [router]);

  const handleNavigateToParticipateBidding = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.BiddingForm}?listingID=${router.query.listingID}`);
  }, [router]);

  const handleNavigateToUpdateBidding = useCallback(() => {
    if (!data?.bidding_id) {
      toast.error('bidding_id not found');
    }

    // router.push(Routes.UpdateBiddingForm, {
    //   searchParams: {
    //     listingID: router.query.listingID as string,
    //     biddingID: `${data?.bidding_id}`,
    //   },
    // });
  }, [router, data?.bidding_id]);

  const handleNavigateToChatRoom = useCallback(() => {
    if (data?.chat_room_id) {
      router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${data.chat_room_id}`);
    }
  }, [router, data]);

  const handleNavigateToPhotoGallery = useCallback(() => {
    // router.push(Routes.ListingPhotoGallery, { persistParams: true });
  }, [router]);

  const handleNavigateToUpdateTargetPrice = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingTargetPriceUpdate}?listingID=${router.query.listingID}`);
  }, [router]);

  const handleNavigateToSuggestRegional = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/$${Routes.SuggestRegionalForm}`);
  }, [router]);

  const openSuggestNotInterstedPopup = useCallback(() => {
    setPopup('suggestNotInterested');
  }, []);

  const openSuggestAcceptRecommendPopup = useCallback(() => {
    setPopup('suggestAcceptRecommend');
  }, []);

  const handleSuggestAcceptRecommend = useCallback(async () => {
    if (!data?.suggest_recommend_id) return;
    setIsPopupButtonLoading(true);

    await acceptRecommend(data.suggest_recommend_id);
    await mutateListing();

    setIsPopupButtonLoading(false);

    setPopup('none');
  }, [data?.suggest_recommend_id, mutateListing]);

  const handleSuggestNotInterested = useCallback(async () => {
    if (!data?.suggest_recommend_id) return;
    setIsPopupButtonLoading(true);

    await notIntersted(data.suggest_recommend_id);
    await mutateListing();

    setIsPopupButtonLoading(false);

    setPopup('none');
  }, [data?.suggest_recommend_id, mutateListing]);

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

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
            <Popup.Title>유효하지 않은 페이지입니다.</Popup.Title>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton
              // onClick={() => router.replace(`/${Routes.EntryMobile}`)}
              onClick={() => router.back()}
            >
              확인
            </Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  return (
    <MobileContainer>
      <ListingDetail
        listingDetail={data as GetListingDetailResponse}
        qnaList={qnaData}
        isLoading={isLoading || isLoadingStatus}
        hasMoreQnas={hasMoreQnas}
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
        onNavigateToSuggestRegional={handleNavigateToSuggestRegional}
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
    </MobileContainer>
  );
});
