import React from 'react';
import { Button, Moment, Numeral } from '@/components/atoms';
import { NavigationHeader, Table } from '@/components/molecules';
import { ListingDetailPassedItem } from '@/components/organisms';
import tw, { styled } from 'twin.macro';
import StatusCard from './StatusCard';
import SuggestionCard from './SuggestionCard';
import PriceCard from './PriceCard';

interface listItemType {
  bidding_monthly_rent_fee: number;
  bidding_trade_or_deposit_price: number;
  created_time: string;
  description: string;
}
interface ListingDetailHistoryProps {
  hasReview: boolean;
  isMonthlyRent: boolean;
  isSubmitted: boolean;
  isAccepted: boolean;
  isPreContractCompleted: boolean;
  isContractCompleted: boolean;
  isCancelled: boolean;
  headerTitle: string;
  buyerAgentChatRoomClosed: boolean;

  onNavigateToBack?: () => void;
  onNavigateToChatRoom?: () => void;
  onNavigateToListingDetail?: () => void;
  onNavigateToTransactionReview?: () => void;
  onNavigateToUpdateBiddingForm?: () => void;

  biddingId: number;
  biddingMonthlyRentFee: number;
  biddingStatus: number;
  biddingTradeOrDepositPrice: number;
  buyOrRent: number;
  contractBiddingMonthlyRentFee: number;
  contractBiddingTradeOrDepositPrice: number;
  contractDate: string;
  direction: string;
  floorDescription: string;
  jeonyongArea: string;
  listingId: number;
  listingStatus: number;
  listingTitle: string;
  monthlyRentFee: number;
  realestatateType: number;
  roadNameAddress: string;
  statusText: string;
  thumbnailFullPath: string;
  totalFloor: string;
  tradeOrDepositPrice: number;
  list: listItemType[];

  canHaveEarlierMoveInDate: boolean;
  canHaveEarlierRemainingAmountPaymentTime: boolean;
  canHaveMoreContractAmount: boolean;
  canHaveMoreInterimAmount: boolean;
  contractAmount: number;
  interimAmount: number;
  moveInDate: string;
  moveInDateType: number;
  description: string;
  etcs: string;
  remainingAmountPaymentTime: string;
  remainingAmountPaymentTimeType: number;
}

const StyledTable = styled.table`
  ${tw`w-full table-fixed text-b2`}
  th {
    ${tw`text-gray-1000 w-[20%] py-1`}
  }
  td {
    ${tw`py-1 text-end w-[80%]`}
  }
  & > tbody > tr:not(:first-of-type) {
    ${tw`border-t border-gray-300`}
  }
`;

export default function ListingDetailHistory({
  isMonthlyRent,
  isSubmitted,
  isPreContractCompleted,
  isContractCompleted,
  isAccepted,
  isCancelled,
  buyerAgentChatRoomClosed,

  headerTitle,
  hasReview,

  onNavigateToBack,
  onNavigateToChatRoom,
  onNavigateToListingDetail,
  onNavigateToTransactionReview,
  onNavigateToUpdateBiddingForm,

  biddingMonthlyRentFee,

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

  canHaveEarlierMoveInDate,
  canHaveEarlierRemainingAmountPaymentTime,
  canHaveMoreContractAmount,
  canHaveMoreInterimAmount,
  contractAmount,
  interimAmount,
  moveInDate,
  moveInDateType,
  description,
  etcs,
  remainingAmountPaymentTime,
  remainingAmountPaymentTimeType,
}: ListingDetailHistoryProps) {
  const renderButton = () => {
    if (isSubmitted)
      return (
        <Button onClick={onNavigateToUpdateBiddingForm} tw="h-10 mt-4 w-full" variant="outlined">
          제안가 수정하기
        </Button>
      );

    if (isAccepted)
      return (
        <Button onClick={onNavigateToChatRoom} tw="h-10 mt-4 w-full" variant="outlined">
          채팅 바로가기
        </Button>
      );

    if (isPreContractCompleted)
      return (
        <Button onClick={onNavigateToChatRoom} tw="h-10 mt-4 w-full" variant="outlined">
          채팅 바로가기
        </Button>
      );

    if (isContractCompleted) {
      return (
        <div tw="flex gap-3">
          <Button onClick={onNavigateToChatRoom} tw="h-10 mt-4 w-full" variant="outlined">
            {buyerAgentChatRoomClosed ? '채팅 보기' : '채팅 바로가기'}
          </Button>

          <Button onClick={onNavigateToTransactionReview} tw="h-10 mt-4 w-full">
            {hasReview ? '거래후기 보기' : '거래후기 남기기'}
          </Button>
        </div>
      );
    }
    if (isCancelled) return null;

    return null;
  };

  return (
    <div tw="flex flex-col h-full relative">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onNavigateToBack} />
        <NavigationHeader.Title>{headerTitle}</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="px-5 mt-7">
          <ListingDetailPassedItem
            listingTitle={listingTitle}
            address={roadNameAddress}
            area={jeonyongArea}
            floorDescription={floorDescription}
            floor={totalFloor}
            direction={direction}
            listingImagePath={thumbnailFullPath}
            onClick={onNavigateToListingDetail}
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
        </div>
        <div tw="mt-7">
          <StatusCard
            isContractCompleted={isContractCompleted}
            isPreContractCompleted={isPreContractCompleted}
            isMonthlyRent={isMonthlyRent}
            contractBiddingMonthlyRentFee={contractBiddingMonthlyRentFee}
            contractBiddingTradeOrDepositPrice={contractBiddingTradeOrDepositPrice}
            contractDate={contractDate}
            statusText={statusText}
          />
        </div>
        {!isPreContractCompleted && !isContractCompleted && !isCancelled && (
          <div tw="mt-1 py-6 px-5">
            <SuggestionCard
              isMonthlyRent={isMonthlyRent}
              biddingMonthlyRentFee={biddingMonthlyRentFee}
              biddingTradeOrDepositPrice={biddingTradeOrDepositPrice}
              canHaveEarlierMoveInDate={canHaveEarlierMoveInDate}
              canHaveEarlierRemainingAmountPaymentTime={canHaveEarlierRemainingAmountPaymentTime}
              canHaveMoreContractAmount={canHaveMoreContractAmount}
              canHaveMoreInterimAmount={canHaveMoreInterimAmount}
              remainingAmountPaymentTime={remainingAmountPaymentTime}
              remainingAmountPaymentTimeType={remainingAmountPaymentTimeType}
              contractAmount={contractAmount}
              interimAmount={interimAmount}
              moveInDate={moveInDate}
              moveInDateType={moveInDateType}
              description={description}
              etcs={etcs}
            />
          </div>
        )}
        <div tw="py-7 px-5">
          <div tw="text-b1 mb-4 font-bold">거래참여 상세 이력</div>
          <StyledTable>
            <Table.Body>
              {list?.map((item) => (
                <Table.Row key={item.created_time}>
                  <Table.Head tw="self-start whitespace-nowrap">{item.description}</Table.Head>
                  <Table.Data tw="text-right">
                    <Moment format="YYYY.MM.DD HH:mm">{item.created_time}</Moment>
                    <div>
                      {item.bidding_monthly_rent_fee !== 0 ? (
                        <div>
                          <Numeral thousandsSeparated koreanNumber>
                            {item.bidding_trade_or_deposit_price}
                          </Numeral>
                          {' / '}
                          <Numeral thousandsSeparated koreanNumber>
                            {item.bidding_monthly_rent_fee}
                          </Numeral>
                        </div>
                      ) : (
                        <Numeral thousandsSeparated koreanNumber>
                          {item.bidding_trade_or_deposit_price}
                        </Numeral>
                      )}
                    </div>
                  </Table.Data>
                </Table.Row>
              ))}
            </Table.Body>
          </StyledTable>
        </div>
      </div>
    </div>
  );
}
