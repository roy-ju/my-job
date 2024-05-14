import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import Button from '@/components/atoms/Button';

import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import SeperatorV2 from '@/components/atoms/SeperatorV2';

import { NavigationHeader } from '@/components/molecules';

import ListingDetailPassedItem from '@/components/organisms/listing/ListingDetailPassedItem';

import useFetchMyListingDetailPassed from '@/services/my/useFetchMyListingPassDetail';

import { ListingStatus } from '@/constants/enums';

import useDirectHandler from './detail-passed/hooks/useDirectHandler';

import { ButtonWrraper, ItemWrraper } from './detail-passed/widget/ListingDetailPassedWidget';

import CurrentProgress from './detail-passed/CurrentProgress';

import useConvertedData from './detail-passed/hooks/useConvertedData';

import PassedAgentCard from './detail-passed/PassedAgentCard';

const ListingTradeDateOffPopup = dynamic(() => import('@/components/organisms/popups/ListingTradeDateOffPopup'), {
  ssr: false,
});

// const UnableToViewPopup = dynamic(() => import('@/components/organisms/popups/UnableToViewPopup'), {
//   ssr: false,
// });

export default function ListingDetailPassed() {
  const router = useRouter();

  const { data } = useFetchMyListingDetailPassed(Number(router.query.listingID));

  const {
    agentInfo,
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
  } = useConvertedData({ data });

  const {
    openPastPopup,
    handleClosePastPopup,
    handleNavigateToBack,
    handleNavigateToChatRoom,
    handleNavigateToTransactionReview,
    handleDirectPassedItem,
  } = useDirectHandler({ data });

  const renderButton = () => {
    if (ListingStatus.Cancelled === listingStatus) return null;

    return (
      <>
        <Button onClick={handleNavigateToChatRoom} tw="h-10 w-full" variant="outlined">
          {sellerAgentChatRoomClosed ? '채팅 보기' : '중개사 채팅'}
        </Button>
        <Button onClick={handleNavigateToTransactionReview} tw="h-10 w-full" variant="primary">
          {hasReview ? '거래후기 보기' : '거래후기 남기기'}
        </Button>
      </>
    );
  };

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleNavigateToBack} />
        <NavigationHeader.Title>지난거래 매물</NavigationHeader.Title>
      </NavigationHeader>
      <FlexContents tw="pt-7 pb-10">
        <ItemWrraper>
          <ListingDetailPassedItem
            onClick={handleDirectPassedItem}
            listingTitle={listingTitle}
            address={roadNameAddress}
            area={jeonyongArea}
            floorDescription={floorDescription}
            floor={totalFloor}
            direction={direction}
            listingImagePath={thumbnailFullPath}
          />
          <ButtonWrraper>{renderButton()}</ButtonWrraper>
        </ItemWrraper>
        <CurrentProgress
          listingStatus={listingStatus}
          statusText={statusText}
          contractTradeOrDepositPrice={contractTradeOrDepositPrice}
          contractMonthlyRentFee={contractMonthlyRentFee}
          contractCompletionDate={contractCompletionDate}
        />
        {ListingStatus.ContractComplete === listingStatus && agentInfo && <SeperatorV2 />}
        {ListingStatus.ContractComplete === listingStatus && agentInfo && (
          <PassedAgentCard
            agentName={data?.agent_info?.agent_name ? `공인중개사 ${data.agent_info?.agent_name}` : ''}
            agentOfficeName={data?.agent_info?.agent_office_name ?? ''}
            agentOfficeAddress={data?.agent_info?.agent_jibun_address ?? ''}
            agentOfficePhone={data?.agent_info?.agent_office_phone ?? ''}
            agentRegistrationNumber={data?.agent_info?.agent_registration_number ?? ''}
            handleNavigateToChatRoom={handleNavigateToChatRoom}
          />
        )}
      </FlexContents>

      {openPastPopup && <ListingTradeDateOffPopup handleConfirm={handleClosePastPopup} />}
    </Container>
  );
}
