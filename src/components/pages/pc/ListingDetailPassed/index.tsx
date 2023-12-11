import { Panel } from '@/components/atoms';
import { memo, useState } from 'react';
import { useRouter } from '@/hooks/utils';
import useAPI_GetMyListingDetailPassed from '@/apis/my/getMyListingDetailPassed';
import { ListingDetailPassed as ListingDetailPassedTemplate } from '@/components/templates';
import Routes from '@/router/routes';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { getListingStatus } from '@/apis/listing/getListingStatus';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const chatRoomRouter = useRouter(1);
  const { data } = useAPI_GetMyListingDetailPassed(Number(router.query.listingID));

  const [openPastPopup, setOpenPastPopup] = useState(false);

  const handleNavigateToListingDetail = () => {
    router.replace(Routes.ListingDetail, {
      searchParams: {
        listingID: String(data?.listing_id),
      },
    });
  };

  const handleDirectPassedItem = async () => {
    if (!data?.listing_id) return;

    const response = await getListingStatus(data.listing_id);

    if (response?.can_access) {
      handleNavigateToListingDetail();
    } else if (!response?.can_access) {
      setOpenPastPopup(true);
    }
  };

  const handleClosePastPopup = () => {
    setOpenPastPopup(false);
  };

  const handleNavigateToChatRoom = () => {
    if (!data?.seller_agent_chat_room_id) return;

    chatRoomRouter.replace(Routes.ChatRoom, {
      searchParams: {
        chatRoomID: String(data?.seller_agent_chat_room_id),
      },
    });
  };

  const handleNavigateToTransactionReview = () => {
    router.replace(Routes.TransactionReview, {
      searchParams: {
        listingContractID: String(data?.listing_contract_id),
        tab: router.query.tab as string,
        listingID: String(data?.listing_id),
      },
      state: {
        hasReview: String(data?.has_review),
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

  return (
    <Panel width={panelWidth}>
      <ListingDetailPassedTemplate
        onNavigateToBack={handleNavigateToBack}
        onNavigateToChatRoom={handleNavigateToChatRoom}
        onNavigateToTransactionReview={handleNavigateToTransactionReview}
        onHandleDirectPassedItem={handleDirectPassedItem}
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
    </Panel>
  );
});
