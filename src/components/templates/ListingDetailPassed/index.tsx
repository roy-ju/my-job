import React from 'react';
import { NavigationHeader } from '@/components/molecules';
import { ListingDetailPassedItem } from '@/components/organisms';
import { Numeral, Button, Moment } from '@/components/atoms';
import { ListingStatus } from '@/constants/enums';

interface Props {
  onNavigateToBack?: () => void;
  onNavigateToListingDetail?: () => void;
  onNavigateToChatRoom?: () => void;
  onNavigateToTransactionReview?: () => void;

  listingId: number;
  listingStatus: number;
  thumbnailFullPath: string;
  listingTitle: string;
  roadNameAddress: string;
  jeonyongArea: string;
  floorDescription: string;
  totalFloor: string;
  direction: string;
  sellerAgentChatRoomId: number;
  sellerAgentChatRoomClosed: boolean;
  contractCompletionDate: string;
  contractTradeOrDepositPrice: number;
  contractMonthlyRentFee: number;
  statusText: string;
  hasReview: boolean;
  listingContractId: number;
}

export default function ListingDetailPassed({
  onNavigateToBack,
  onNavigateToListingDetail,
  onNavigateToChatRoom,
  onNavigateToTransactionReview,
  listingStatus,
  thumbnailFullPath,
  listingTitle,
  roadNameAddress,
  jeonyongArea,
  floorDescription,
  totalFloor,
  direction,
  contractCompletionDate,
  contractTradeOrDepositPrice,
  contractMonthlyRentFee,
  statusText,
  hasReview,
  sellerAgentChatRoomClosed,
}: Props) {
  const renderButton = () => {
    if (ListingStatus.Cancelled === listingStatus) return null;

    return (
      <>
        <Button onClick={onNavigateToChatRoom} tw="h-10 w-full" variant="outlined">
          {sellerAgentChatRoomClosed ? '채팅 보기' : '중개사 채팅'}
        </Button>
        <Button onClick={onNavigateToTransactionReview} tw="h-10 w-full" variant="primary">
          {hasReview ? '거래후기 보기' : '거래후기 남기기'}
        </Button>
      </>
    );
  };
  const renderPrice = () => {
    if (contractMonthlyRentFee) {
      return (
        <>
          <Numeral thousandsSeparated koreanNumber>
            {contractTradeOrDepositPrice}
          </Numeral>
          {' / '}
          <Numeral thousandsSeparated koreanNumber>
            {contractMonthlyRentFee}
          </Numeral>
        </>
      );
    }
    return (
      <Numeral thousandsSeparated koreanNumber>
        {contractTradeOrDepositPrice}
      </Numeral>
    );
  };

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onNavigateToBack} />
        <NavigationHeader.Title>지난거래 매물</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="px-5 py-7 flex-1 min-h-0 overflow-auto">
        <ListingDetailPassedItem
          onClick={onNavigateToListingDetail}
          listingTitle={listingTitle ?? ''}
          address={roadNameAddress ?? ''}
          area={jeonyongArea ?? ''}
          floorDescription={floorDescription ?? ''}
          floor={totalFloor ?? ''}
          direction={direction ?? ''}
          listingImagePath={thumbnailFullPath}
        />
        <div tw="flex gap-3 mt-7">{renderButton()}</div>
        <div tw="mt-7 py-6 px-5 bg-gray-100 text-gray-1000">
          <div tw="mb-4 text-b1 font-bold">진행 상황</div>
          <div tw="flex flex-col gap-2">
            {ListingStatus.ContractComplete === listingStatus && (
              <>
                <div tw="text-b2 flex justify-between">
                  <span>체결일</span>
                  <Moment format="YYYY.MM.DD">{contractCompletionDate}</Moment>
                </div>
                <div tw="text-b2 flex justify-between">
                  <div>체결가</div>
                  <div>{renderPrice()}</div>
                </div>
              </>
            )}
            <div tw="text-b2 flex justify-between">
              <span>상태</span>
              <span tw="text-nego-800">{statusText}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
