import { BiddingStatus } from '@/constants/enums';

import { MyParticipatedListingDetailResponse } from '@/services/my/types';

export default function useConvertedData({ data }: { data?: MyParticipatedListingDetailResponse }) {
  const hasReview = data?.has_review ?? false;
  const buyerAgentChatRoomClosed = data?.buyer_agent_chat_room_closed ?? false;
  const isMonthlyRent = data?.monthly_rent_fee !== 0;
  const isSubmitted =
    BiddingStatus.BiddingStatusSubmitted === data?.bidding_status ||
    BiddingStatus.BiddingStatusRejected === data?.bidding_status;
  const isAccepted = BiddingStatus.BiddingStatusAccepted === data?.bidding_status;
  const isPreContractCompleted = BiddingStatus.BiddingStatusPreContractComplete === data?.bidding_status;
  const isContractCompleted = BiddingStatus.BiddingStatusContractComplete === data?.bidding_status;
  const isCancelled = BiddingStatus.BiddingStatusCancelled === data?.bidding_status;
  const biddingMonthlyRentFee = data?.bidding_monthly_rent_fee ?? 0;
  const biddingStatus = data?.bidding_status ?? 0;
  const biddingTradeOrDepositPrice = data?.bidding_trade_or_deposit_price ?? 0;
  const contractBiddingMonthlyRentFee = data?.contract_bidding_monthly_rent_fee ?? 0;
  const contractBiddingTradeOrDepositPrice = data?.contract_bidding_trade_or_deposit_price ?? 0;
  const contractDate = data?.contract_date ?? '';
  const direction = data?.direction ?? '';
  const floorDescription = data?.floor_description ?? '';
  const jeonyongArea = data?.jeonyong_area ?? '';
  const listingTitle = data?.listing_title ?? '';
  const monthlyRentFee = data?.monthly_rent_fee ?? 0;
  const roadNameAddress = data?.road_name_address ?? '';
  const statusText = data?.status_text ?? '';
  const thumbnailFullPath = data?.thumbnail_full_path ?? '';
  const totalFloor = data?.total_floor ?? '';
  const tradeOrDepositPrice = data?.trade_or_deposit_price ?? 0;
  const list = data?.list ?? [];
  const moveInDate = data?.move_in_date ?? '';
  const moveInDateType = data?.move_in_date_type ?? 0;
  const description = data?.description ?? '';
  const etcs = data?.etcs ?? '';

  return {
    hasReview,
    buyerAgentChatRoomClosed,
    isMonthlyRent,
    isSubmitted,
    isAccepted,
    isPreContractCompleted,
    isContractCompleted,
    isCancelled,
    biddingMonthlyRentFee,
    biddingStatus,
    biddingTradeOrDepositPrice,
    contractBiddingMonthlyRentFee,
    contractBiddingTradeOrDepositPrice,
    contractDate,
    direction,
    floorDescription,
    jeonyongArea,
    listingTitle,
    monthlyRentFee,
    roadNameAddress,
    statusText,
    thumbnailFullPath,
    totalFloor,
    tradeOrDepositPrice,
    list,
    moveInDate,
    moveInDateType,
    description,
    etcs,
  };
}
