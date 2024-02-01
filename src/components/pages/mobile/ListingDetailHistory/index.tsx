import { memo, useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { MobileContainer } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { ListingDetailHistory as ListingDetailHistoryTemplate } from '@/components/templates';

import useAPI_GetMyParticipatedListingDetail from '@/apis/my/getMyParticipatedListingDetail';

import Routes from '@/router/routes';

import { BiddingStatus } from '@/constants/enums';

import cancelBidding from '@/apis/bidding/cancelBidding';

import { getListingStatus } from '@/apis/listing/getListingStatus';

export default memo(() => {
  const router = useRouter();

  const { data } = useAPI_GetMyParticipatedListingDetail(
    Number(router.query.listingID),
    Number(router.query.biddingID),
  );

  const [open, setOpen] = useState(false);

  const [openPastPopup, setOpenPastPopup] = useState(false);

  const handleNavigateToChatRoom = () => {
    if (!data?.buyer_agent_chat_room_id) return;
    router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${data?.buyer_agent_chat_room_id}`);
  };

  const handleNavigateToTransactionReview = () => {
    router.push(
      `/${Routes.EntryMobile}/${Routes.TransactionReview}?listingContractID=${data?.listing_contract_id}&hasReview=${data?.has_review}`,
    );
  };

  const handleNavigateToBack = () => {
    router.back();
  };

  const handleNavigateToUpdateBiddingForm = () => {
    router.push(
      `/${Routes.EntryMobile}/${Routes.UpdateBiddingForm}?listingID=${data?.listing_id}&biddingID=${data?.bidding_id}`,
    );
  };

  const handleNavigateToListingDetail = async () => {
    if (!data?.listing_id) return;

    const response = await getListingStatus(data.listing_id);

    if (response?.can_access) {
      router.push(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${data.listing_id}`);
    } else if (!response?.can_access) {
      setOpenPastPopup(true);
    }
  };

  const headerTitle = () => {
    switch (data?.bidding_status) {
      case BiddingStatus.BiddingStatusPreContractComplete:
        return '거래성사 매물';
      case BiddingStatus.BiddingStatusSubmitted:
        return '제안중 매물';
      case BiddingStatus.BiddingStatusRejected:
        return '제안중 매물';
      case BiddingStatus.BiddingStatusAccepted:
        return '협의중 매물';
      case BiddingStatus.BiddingStatusContractComplete:
        return '지난거래 매물';
      case BiddingStatus.BiddingStatusCancelled:
        return '지난거래 매물';

      default:
        return '';
    }
  };

  const handleCancelBidding = useCallback(async () => {
    const listingID = router?.query?.listingID;

    const biddingID = router?.query?.biddingID;

    if (listingID && biddingID) {
      await cancelBidding(Number(listingID), Number(biddingID));

      toast.success('제안을 취소하였습니다.');

      router.replace(`/${Routes.EntryMobile}/${Routes.MyParticipatingListings}?tab=4`);
    }
  }, [router]);

  const handleClosePastPopup = () => {
    setOpenPastPopup(false);
  };

  return (
    <MobileContainer>
      <ListingDetailHistoryTemplate
        headerTitle={headerTitle()}
        hasReview={data?.has_review ?? false}
        buyerAgentChatRoomClosed={data?.buyer_agent_chat_room_closed ?? false}
        isMonthlyRent={data?.monthly_rent_fee !== 0}
        isSubmitted={
          BiddingStatus.BiddingStatusSubmitted === data?.bidding_status ||
          BiddingStatus.BiddingStatusRejected === data?.bidding_status
        }
        isAccepted={BiddingStatus.BiddingStatusAccepted === data?.bidding_status}
        isPreContractCompleted={BiddingStatus.BiddingStatusPreContractComplete === data?.bidding_status}
        isContractCompleted={BiddingStatus.BiddingStatusContractComplete === data?.bidding_status}
        isCancelled={BiddingStatus.BiddingStatusCancelled === data?.bidding_status}
        onNavigateToBack={handleNavigateToBack}
        onNavigateToChatRoom={handleNavigateToChatRoom}
        onNavigateToTransactionReview={handleNavigateToTransactionReview}
        onNavigateToListingDetail={handleNavigateToListingDetail}
        onNavigateToUpdateBiddingForm={handleNavigateToUpdateBiddingForm}
        biddingId={data?.bidding_id ?? 0}
        biddingMonthlyRentFee={data?.bidding_monthly_rent_fee ?? 0}
        biddingStatus={data?.bidding_status ?? 0}
        biddingTradeOrDepositPrice={data?.bidding_trade_or_deposit_price ?? 0}
        buyOrRent={data?.buy_or_rent ?? 0}
        contractBiddingMonthlyRentFee={data?.contract_bidding_monthly_rent_fee ?? 0}
        contractBiddingTradeOrDepositPrice={data?.contract_bidding_trade_or_deposit_price ?? 0}
        contractDate={data?.contract_date ?? ''}
        direction={data?.direction ?? ''}
        floorDescription={data?.floor_description ?? ''}
        jeonyongArea={data?.jeonyong_area ?? ''}
        listingId={data?.listing_id ?? 0}
        listingStatus={data?.listing_status ?? 0}
        listingTitle={data?.listing_title ?? ''}
        monthlyRentFee={data?.monthly_rent_fee ?? 0}
        realestatateType={data?.realestate_type ?? 0}
        roadNameAddress={data?.road_name_address ?? ''}
        statusText={data?.status_text ?? ''}
        thumbnailFullPath={data?.thumbnail_full_path ?? ''}
        totalFloor={data?.total_floor ?? ''}
        tradeOrDepositPrice={data?.trade_or_deposit_price ?? 0}
        list={data?.list ?? []}
        canHaveEarlierRemainingAmountPaymentTime={data?.can_have_earlier_remaining_amount_payment_time ?? false}
        canHaveMoreContractAmount={data?.can_have_more_contract_amount ?? false}
        canHaveMoreInterimAmount={data?.can_have_more_interim_amount ?? false}
        contractAmount={data?.contract_amount ?? 0}
        interimAmount={data?.interim_amount ?? 0}
        moveInDate={data?.move_in_date ?? ''}
        moveInDateType={data?.move_in_date_type ?? 0}
        description={data?.description ?? ''}
        etcs={data?.etcs ?? ''}
        remainingAmountPaymentTime={data?.remaining_amount_payment_time ?? ''}
        remainingAmountPaymentTimeType={data?.remaining_amount_payment_time_type ?? 0}
        openPopup={() => setOpen(true)}
      />

      {open && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6 [text-align: center]">
              <Popup.SmallTitle>제안을 취소하시겠습니까?</Popup.SmallTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setOpen(false)}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleCancelBidding}>제안 취소하기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {openPastPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-10">
              <Popup.Title tw="[text-align: center]">
                거래가 종료되어
                <br />
                매물 상세 정보를 확인할 수 없습니다.
              </Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={handleClosePastPopup}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
});
