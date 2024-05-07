import React, { useState } from 'react';
import { Accordion, NavigationHeader } from '@/components/molecules';
import { AgentCardItem, ListingDetailPassedItem } from '@/components/organisms';
import { Numeral, Button, Moment, ButtonV2 } from '@/components/atoms';
import { ListingStatus } from '@/constants/enums';
import SeperatorV2 from '@/components/atoms/SeperatorV2';
import ChatIcon from '@/assets/icons/chat.svg';
import { theme } from 'twin.macro';
import TextButton from '@/components/atoms/TextButton';

interface Props {
  onNavigateToBack?: () => void;
  onNavigateToChatRoom?: () => void;
  onNavigateToTransactionReview?: () => void;
  onHandleDirectPassedItem?: () => Promise<void>;

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
  onNavigateToChatRoom,
  onNavigateToTransactionReview,
  onHandleDirectPassedItem,
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
  const [open, setOpen] = useState(true);

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
      <div tw="pt-7 pb-10 flex-1 min-h-0 overflow-auto">
        <div tw="px-5">
          <ListingDetailPassedItem
            onClick={onHandleDirectPassedItem}
            listingTitle={listingTitle ?? ''}
            address={roadNameAddress ?? ''}
            area={jeonyongArea ?? ''}
            floorDescription={floorDescription ?? ''}
            floor={totalFloor ?? ''}
            direction={direction ?? ''}
            listingImagePath={thumbnailFullPath}
          />
          <div tw="flex gap-3 mt-7">{renderButton()}</div>
        </div>

        <div tw="mt-7 mb-10 py-6 px-5 bg-gray-100 text-gray-1000">
          <div tw="mb-4 text-b1 font-bold">진행 상황</div>
          <div tw="flex flex-col gap-2">
            {ListingStatus.ContractComplete === listingStatus && (
              <>
                <div tw="text-b2 flex gap-3">
                  <span tw="min-w-[84px]">체결일</span>

                  <Moment format="YYYY.MM.DD">{contractCompletionDate}</Moment>
                </div>
                <div tw="text-b2 flex gap-3">
                  <div tw="min-w-[84px]">체결가</div>

                  <div>{renderPrice()}</div>
                </div>
              </>
            )}

            <div tw="text-b2 flex gap-3">
              <span tw="min-w-[84px]">상태</span>

              <span tw="text-nego-800">{statusText}</span>
            </div>
          </div>
        </div>

        <SeperatorV2 />

        <div tw="px-5 mt-7">
          <div tw="text-subhead_03 mb-4">중개사 정보</div>

          <div tw="px-4 py-5 bg-gray-100 border border-gray-300 [border-top-left-radius: 8px] [border-top-right-radius: 8px] flex flex-col gap-4">
            <div tw="flex flex-row gap-4">
              <div tw="flex flex-col [width: calc(100% - 60px)]">
                <span tw="text-ellipsis whitespace-nowrap overflow-hidden text-subhead_03">
                  네고시오 공인중개사 사무송너라니렁나리ㅓ니ㄹㄴㄴㄹㄴㄹ
                </span>
                <span tw="text-info text-gray-700">공인중개사 김네고</span>
              </div>

              <ButtonV2 variant="ghost" tw="[height: 44px] bg-nego-100 rounded-lg p-2.5">
                <ChatIcon color={theme`colors.nego.800`} />
              </ButtonV2>
            </div>

            <div tw="flex flex-col gap-2">
              <div tw="text-info flex flex-row">
                <span tw="text-gray-700 [min-width: 52px] inline-block">전화번호</span>
                <span>02-2222-2222</span>
              </div>

              <div tw="text-info flex flex-row">
                <span tw="text-gray-700 [min-width: 52px] inline-block">주소</span>
                <span>경기도 성남시 분당구 백현동 645-12</span>
              </div>

              <div tw="text-info flex flex-row">
                <span tw="text-gray-700 [min-width: 52px] inline-block">등록번호</span>
                <span>12345-8219-71734</span>
              </div>
            </div>
          </div>
          <div tw="bg-gray-100 border border-gray-300 border-t-0 [border-bottom-left-radius: 8px] [border-bottom-right-radius: 8px] [padding-block: 15px]">
            <TextButton variant="underline" size="small" color="gray1000" title="접어두기" tw="leading-4 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
