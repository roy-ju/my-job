import { memo } from 'react';
import useAPI_GetMyListingDetailPassed from '@/apis/my/getMyListingDetailPassed';
import { ListingDetailPassed as ListingDetailPassedTemplate } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { MobileContainer } from '@/components/atoms';

export default memo(() => {
  const router = useRouter();
  const { data } = useAPI_GetMyListingDetailPassed(Number(router.query.listingID));

  const handleNavigateToListingDetail = () => {
    if (!data?.listing_id) return;
    router.push(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${data?.listing_id}`);
  };

  const handleNavigateToChatRoom = () => {
    if (!data?.seller_agent_chat_room_id) return;
    router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${data?.seller_agent_chat_room_id}`);
  };

  const handleNavigateToTransactionReview = () => {
    router.push(
      `/${Routes.EntryMobile}/${Routes.TransactionReview}?listingContractID=${data?.listing_contract_id}&listingID=${data?.listing_id}&hasReview=${data?.has_review}`,
    );
  };

  const handleNavigateToBack = () => {
    router.back();
  };

  return (
    <MobileContainer>
      <ListingDetailPassedTemplate
        onNavigateToBack={handleNavigateToBack}
        onNavigateToListingDetail={handleNavigateToListingDetail}
        onNavigateToChatRoom={handleNavigateToChatRoom}
        onNavigateToTransactionReview={handleNavigateToTransactionReview}
        listingId={data?.listing_id ?? 0}
        listingStatus={data?.listing_status ?? 0}
        thumbnailFullPath={data?.thumbnail_full_path}
        listingTitle={data?.listing_title ?? ''}
        roadNameAddress={data?.road_name_address ?? ''}
        jeonyongArea={data?.jeonyong_area ?? ''}
        floorDescription={data?.floor_description ?? ''}
        totalFloor={data?.total_floor ?? ''}
        direction={data?.direction ?? ''}
        sellerAgentChatRoomId={data?.seller_agent_chat_room_id ?? 0}
        sellerAgentChatRoomClosed={data?.seller_agent_chat_room_closed ?? false}
        contractCompletionDate={data?.contract_completion_date ?? ''}
        contractTradeOrDepositPrice={data?.contract_trade_or_deposit_price ?? 0}
        contractMonthlyRentFee={data?.contract_monthly_rent_fee ?? 0}
        statusText={data?.status_text ?? ''}
        hasReview={data?.has_review ?? false}
        listingContractId={data?.listing_contract_id ?? 0}
      />
    </MobileContainer>
  );
});