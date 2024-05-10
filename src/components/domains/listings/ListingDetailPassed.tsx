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

export default function ListingDetailPassed() {
  const router = useRouter();

  const { data } = useFetchMyListingDetailPassed(Number(router.query.listingID));

  const {
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
        {ListingStatus.ContractComplete === listingStatus && <SeperatorV2 />}
        {ListingStatus.ContractComplete === listingStatus && (
          <PassedAgentCard
            agentName="공인중개사 김네고"
            agentOfficeName="네고네고시오시오 공인중개사무소"
            agentOfficeAddress="경기도 성남시 분당구 백현동 645-12"
            agentOfficePhone="02-2222-2222"
            agentRegistrationNumber="12345-8219-71734"
            handleNavigateToChatRoom={handleNavigateToChatRoom}
          />
        )}
      </FlexContents>

      {openPastPopup && <ListingTradeDateOffPopup handleConfirm={handleClosePastPopup} />}
    </Container>
  );
}
