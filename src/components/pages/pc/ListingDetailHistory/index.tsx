import { Panel } from '@/components/atoms';
import { memo } from 'react';
import { ListingDetailHistory as ListingDetailHistoryTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import useAPI_GetMyParticipatedListingDetail from '@/apis/my/getMyParticipatedListingDetail';
import Routes from '@/router/routes';
import { BiddingStatus } from '@/constants/enums';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const chatRoomRouter = useRouter(1);
  const { data } = useAPI_GetMyParticipatedListingDetail(
    Number(router.query.listingID),
    Number(router.query.biddingID),
  );

  const handleNavigateToChatRoom = () => {
    if (!data?.buyer_agent_chat_room_id) return;

    chatRoomRouter.replace(Routes.ChatRoom, {
      searchParams: {
        chatRoomID: String(data?.buyer_agent_chat_room_id),
      },
    });
  };

  const handleNavigateToTransactionReview = () => {
    router.replace(Routes.TransactionReview, {
      persistParams: true,
      searchParams: {
        listingContractID: String(data?.listing_contract_id),
      },
      state: {
        hasReview: String(data?.has_review),
      },
    });
  };

  const handleNavigateToBack = () => {
    router.replace(Routes.MyParticipatingListings, {
      searchParams: {
        tab: router.query.tab as string,
      },
    });
  };

  const handleNavigateToUpdateBiddingForm = () => {
    router.replace(Routes.UpdateBiddingForm, {
      searchParams: {
        listingID: String(data?.listing_id),
        biddingID: String(data?.bidding_id),
      },
    });
  };

  const handleNavigateToListingDetail = () => {
    router.replace(Routes.ListingDetail, {
      searchParams: {
        listingID: String(data?.listing_id),
      },
    });
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

  return (
    <Panel width={panelWidth}>
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
        canHaveEarlierMoveInDate={data?.can_have_earlier_move_in_date ?? false}
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
      />
    </Panel>
  );
});
