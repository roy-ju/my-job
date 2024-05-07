import { MyListingDetailPassedResponse } from '@/services/my/types';

export default function useConvertedData({ data }: { data?: MyListingDetailPassedResponse }) {
  const listingStatus = data?.listing_status ?? 0;

  const thumbnailFullPath = data?.thumbnail_full_path;

  const listingTitle = data?.listing_title ?? '';

  const roadNameAddress = data?.road_name_address ?? '';

  const jeonyongArea = data?.jeonyong_area ?? '';

  const floorDescription = data?.floor_description ?? '';

  const totalFloor = data?.total_floor ?? '';

  const direction = data?.direction ?? '';

  const sellerAgentChatRoomClosed = data?.seller_agent_chat_room_closed ?? false;

  const contractCompletionDate = data?.contract_completion_date ?? '';

  const contractTradeOrDepositPrice = data?.contract_trade_or_deposit_price ?? 0;

  const contractMonthlyRentFee = data?.contract_monthly_rent_fee ?? 0;

  const statusText = data?.status_text ?? '';

  const hasReview = data?.has_review ?? false;

  return {
    listingStatus,
    thumbnailFullPath,
    listingTitle,
    roadNameAddress,
    jeonyongArea,
    floorDescription,
    totalFloor,
    direction,
    sellerAgentChatRoomClosed,
    contractCompletionDate,
    contractTradeOrDepositPrice,
    contractMonthlyRentFee,
    statusText,
    hasReview,
  };
}
