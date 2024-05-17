import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';

import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import Button from '@/components/atoms/Button';

import NavigationHeader from '@/components/molecules/NavigationHeader';

import ListingDetailPassedItem from '@/components/organisms/listing/ListingDetailPassedItem';

import useFetchMyListingsParticipatedDetail from '@/services/my/useFetchMyListingsParticipatedDetail';

import { BiddingStatus } from '@/constants/enums';

import useConvertedData from './detail-history/hooks/useConvertedData';

import useDirectHandler from './detail-history/hooks/useDirectHandler';

import HistoryTable from './detail-history/HistoryTable';

import StatusCard from './detail-history/StatusCard';

import SuggestionCard from './detail-history/SuggestionCard';
import {
  ListingDetailPassedItemContainer,
  StatusCardContainer,
  SuggestionCardBorderBottom,
  SuggestionCardContainer,
} from './detail-history/widget/ListingDetailHistoryWidget';
import PriceCard from './detail-history/PriceCard';

const CancelBiddingPopup = dynamic(() => import('./detail-history/popups/CancelBiddingPopup'), { ssr: false });

const ListingTradeDateOffPopup = dynamic(() => import('@/components/organisms/popups/ListingTradeDateOffPopup'), {
  ssr: false,
});

export default function ListingDetailHistory() {
  const router = useRouter();

  const { data } = useFetchMyListingsParticipatedDetail(Number(router.query.listingID), Number(router.query.biddingID));

  const {
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
  } = useConvertedData({ data });

  const {
    openPastPopup,
    openCancelBiddingPopup,
    handleNavigateToBack,
    handleNavigateToChatRoom,
    handleNavigateToListingDetail,
    handleNavigateToTransactionReview,
    handleNavigateToUpdateBiddingForm,
    handleOpenCancelBiddingPopup,
    handleCloseCancelBiddingPopup,
    handleCancelBidding,
    handleClosePastPopup,
  } = useDirectHandler({ data });

  const headerTitle = () => {
    switch (biddingStatus) {
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

  const renderButton = () => {
    if (isSubmitted)
      return biddingStatus === BiddingStatus.BiddingStatusRejected ? null : (
        <Button onClick={handleNavigateToUpdateBiddingForm} tw="h-10 mt-4 w-full" variant="outlined">
          제안 수정
        </Button>
      );

    if (isAccepted)
      return (
        <Button onClick={handleNavigateToChatRoom} tw="h-10 mt-4 w-full" variant="outlined">
          중개사 채팅
        </Button>
      );

    if (isPreContractCompleted)
      return (
        <Button onClick={handleNavigateToChatRoom} tw="h-10 mt-4 w-full" variant="outlined">
          중개사 채팅
        </Button>
      );

    if (isContractCompleted) {
      return (
        <div tw="flex gap-3">
          <Button onClick={handleNavigateToChatRoom} tw="h-10 mt-4 w-full" variant="outlined">
            {buyerAgentChatRoomClosed ? '채팅 보기' : '중개사 채팅'}
          </Button>

          <Button onClick={handleNavigateToTransactionReview} tw="h-10 mt-4 w-full">
            {hasReview ? '거래후기 보기' : '거래후기 남기기'}
          </Button>
        </div>
      );
    }
    if (isCancelled) return null;

    return null;
  };

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleNavigateToBack} />
        <NavigationHeader.Title>{headerTitle()}</NavigationHeader.Title>
      </NavigationHeader>
      <FlexContents>
        <ListingDetailPassedItemContainer>
          <ListingDetailPassedItem
            listingTitle={listingTitle}
            address={roadNameAddress}
            area={jeonyongArea}
            floorDescription={floorDescription}
            floor={totalFloor}
            direction={direction}
            listingImagePath={thumbnailFullPath}
            onClick={handleNavigateToListingDetail}
          />

          {!isPreContractCompleted && !isContractCompleted && (
            <PriceCard
              isMonthlyRent={isMonthlyRent}
              tradeOrDepositPrice={tradeOrDepositPrice}
              monthlyRentFee={monthlyRentFee}
              biddingTradeOrDepositPrice={biddingTradeOrDepositPrice}
              biddingMonthlyRentFee={biddingMonthlyRentFee}
            />
          )}
          {renderButton()}
        </ListingDetailPassedItemContainer>

        <StatusCardContainer>
          <StatusCard
            isContractCompleted={isContractCompleted}
            isPreContractCompleted={isPreContractCompleted}
            isMonthlyRent={isMonthlyRent}
            contractBiddingMonthlyRentFee={contractBiddingMonthlyRentFee}
            contractBiddingTradeOrDepositPrice={contractBiddingTradeOrDepositPrice}
            contractDate={contractDate}
            statusText={statusText}
          />
        </StatusCardContainer>

        {!isPreContractCompleted && !isContractCompleted && !isCancelled && (
          <SuggestionCardContainer>
            <SuggestionCard
              isMonthlyRent={isMonthlyRent}
              biddingMonthlyRentFee={biddingMonthlyRentFee}
              biddingTradeOrDepositPrice={biddingTradeOrDepositPrice}
              moveInDate={moveInDate}
              moveInDateType={moveInDateType}
              description={description}
              etcs={etcs}
              openPopup={handleOpenCancelBiddingPopup}
            />
            <SuggestionCardBorderBottom />
          </SuggestionCardContainer>
        )}
        <HistoryTable list={list} isMonthlyRent={isMonthlyRent} />
      </FlexContents>

      {openCancelBiddingPopup && (
        <CancelBiddingPopup handleCancel={handleCloseCancelBiddingPopup} handleConfirm={handleCancelBidding} />
      )}

      {openPastPopup && <ListingTradeDateOffPopup handleConfirm={handleClosePastPopup} />}
    </Container>
  );
}
