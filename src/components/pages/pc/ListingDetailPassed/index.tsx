import { Panel } from '@/components/atoms';
import { memo } from 'react';
import { useRouter } from '@/hooks/utils';
import useAPI_GetMyListingDetailPassed from '@/apis/my/getMyListingDetailPassed';
import { ListingDetailPassed as ListingDetailPassedTemplate } from '@/components/templates';
import Routes from '@/router/routes';
import moment from 'moment';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const chatRoomRouter = useRouter(1);
  const { data } = useAPI_GetMyListingDetailPassed(Number(router.query.listingID));

  const handleNavigateToListingDetail = () => {
    router.replace(Routes.ListingDetail, {
      searchParams: {
        chatRoomID: String(data?.seller_agent_chat_room_id),
      },
    });
  };

  const handleNavigateToChatRoom = () => {
    chatRoomRouter.replace(Routes.ChatRoom, {
      searchParams: {
        chatRoomID: String(data?.seller_agent_chat_room_id),
      },
    });
  };

  const handleNavigateToTransactionReview = () => {
    router.replace(Routes.TransactionReview, {
      searchParams: {
        listingID: String(data?.listing_id),
      },
    });
  };

  const handleNavigateToBack = () => {
    router.replace(Routes.MyRegisteredListingList, {
      searchParams: {
        tab: router.query.tab as string,
      },
    });
  };

  const isContractCompletionOneWeekPassed = (() => {
    if (!data?.contract_completion_date) return false;

    const contractCompletionDate = moment(data?.contract_completion_date);
    const now = moment();

    const diff = now.diff(contractCompletionDate, 'days');

    return diff >= 7;
  })();

  return (
    <Panel width={panelWidth}>
      <ListingDetailPassedTemplate
        onNavigateToBack={handleNavigateToBack}
        onNavigateToListingDetail={handleNavigateToListingDetail}
        onNavigateToChatRoom={handleNavigateToChatRoom}
        onNavigateToTransactionReview={handleNavigateToTransactionReview}
        isContractCompletionOneWeekPassed={isContractCompletionOneWeekPassed}
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
        contractCompletionDate={data?.contract_completion_date ?? ''}
        contractTradeOrDepositPrice={data?.contract_trade_or_deposit_price ?? 0}
        contractMonthlyRentFee={data?.contract_monthly_rent_fee ?? 0}
        statusText={data?.status_text ?? ''}
        hasReview={data?.has_review ?? false}
        listingContractId={data?.listing_contract_id ?? 0}
      />
    </Panel>
  );
});
