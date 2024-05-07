import tw, { styled } from 'twin.macro';

import { Button, Moment, Numeral } from '@/components/atoms';

import { NavigationHeader, Table } from '@/components/molecules';

import ListingDetailPassedItem from '@/components/organisms/listing/ListingDetailPassedItem';

import { BiddingStatus } from '@/constants/enums';

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

  openPopup?: () => void;
}

const StyledTable = styled.table`
  ${tw`w-full table-fixed text-b2`}
  th {
    ${tw`text-gray-1000 w-[20%] py-1`}
  }
  td {
    ${tw`py-1 text-start w-[80%]`}
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
  biddingStatus,

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

  moveInDate,
  moveInDateType,
  description,
  etcs,

  openPopup,
}: ListingDetailHistoryProps) {
  const renderMonthlyRentFee = (fee: number) => {
    if (fee === 0) return '0원';
    return (
      <Numeral thousandsSeparated koreanNumber>
        {fee}
      </Numeral>
    );
  };

  const renderButton = () => {
    if (isSubmitted)
      return biddingStatus === BiddingStatus.BiddingStatusRejected ? null : (
        <Button onClick={onNavigateToUpdateBiddingForm} tw="h-10 mt-4 w-full" variant="outlined">
          제안 수정
        </Button>
      );

    if (isAccepted)
      return (
        <Button onClick={onNavigateToChatRoom} tw="h-10 mt-4 w-full" variant="outlined">
          중개사 채팅
        </Button>
      );

    if (isPreContractCompleted)
      return (
        <Button onClick={onNavigateToChatRoom} tw="h-10 mt-4 w-full" variant="outlined">
          중개사 채팅
        </Button>
      );

    if (isContractCompleted) {
      return (
        <div tw="flex gap-3">
          <Button onClick={onNavigateToChatRoom} tw="h-10 mt-4 w-full" variant="outlined">
            {buyerAgentChatRoomClosed ? '채팅 보기' : '중개사 채팅'}
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
          <div tw="mt-1 py-6 px-5 relative">
            <SuggestionCard
              isMonthlyRent={isMonthlyRent}
              biddingMonthlyRentFee={biddingMonthlyRentFee}
              biddingTradeOrDepositPrice={biddingTradeOrDepositPrice}
              moveInDate={moveInDate}
              moveInDateType={moveInDateType}
              description={description}
              etcs={etcs}
              openPopup={openPopup}
            />
            <div tw="border-t border-gray-300 absolute left-0 right-0 mt-7" />
          </div>
        )}
        <div tw="py-7 px-5">
          <div tw="text-b1 mb-4 font-bold">거래참여 상세 이력</div>
          <StyledTable>
            <Table.Body>
              {list?.map((item) => (
                <Table.Row key={item.created_time} tw="flex">
                  <Table.Head tw="min-w-[84px] self-start whitespace-nowrap">{item.description}</Table.Head>

                  <Table.Data tw="text-right pl-0">
                    <Moment format="YYYY.MM.DD HH:mm">{item.created_time}</Moment>
                    <div>
                      {isMonthlyRent ? (
                        <div>
                          <Numeral thousandsSeparated koreanNumber>
                            {item.bidding_trade_or_deposit_price}
                          </Numeral>
                          {' / '}
                          {renderMonthlyRentFee(item.bidding_monthly_rent_fee)}
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
