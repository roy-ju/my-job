import { Loading } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ChatRoomAgentSummary, ChatRoomTextField } from '@/components/organisms';
import useLatest from '@/hooks/utils/useLatest';
import { StaticImageData } from 'next/image';
import React, { useCallback, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import ChatMessageWrapper, { IChatMessage } from './ChatMessageWrapper';
import ListingList, { ListingCardProps } from './ListingList';

interface ChatRoomProps {
  title: string;
  agentName: string;
  officeName: string;
  agentDescription: string;
  agentProfileImagePath: string | StaticImageData;
  additionalListingCount: number;
  isLoading: boolean;
  chatMessages: IChatMessage[];
  chatUserType: number;
  textFieldDisabled?: boolean;
  inputRef?: (element: HTMLTextAreaElement | null) => void;
  onSendMessage?: (message: string) => void;

  onClickReportButton?: () => void;
  onClickLeaveButton?: () => void;
  onClickBack?: () => void;

  sellerList: ListingCardProps[];
  buyerContractList: ListingCardProps[];
  buyerActiveList: ListingCardProps[];

  onClickNavigateToListingDetail?: (listingID: number) => () => void;
  onClickNavigateToListingDetailHistory?: (listingID: number, biddingID: number) => () => void;
}

export default function ChatRoom({
  isLoading,
  title, // listingTitle
  chatUserType,
  chatMessages,
  textFieldDisabled = false,
  agentDescription,
  agentName,
  agentProfileImagePath,
  officeName,
  additionalListingCount,
  inputRef,
  onSendMessage,

  onClickReportButton,
  onClickLeaveButton,
  onClickBack,

  sellerList,
  buyerContractList,
  buyerActiveList,

  onClickNavigateToListingDetail,
  onClickNavigateToListingDetailHistory,
}: ChatRoomProps) {
  const messagesRef = useLatest(chatMessages);

  const headerItems = [
    { label: '신고하기', onClick: onClickReportButton },
    {
      label: '채팅방 나가기',
      onClick: onClickLeaveButton,
    },
  ];

  const renderItem = useCallback(
    (index: number, chatMessage: IChatMessage) => (
      <ChatMessageWrapper
        key={chatMessage.id}
        chat={chatMessage}
        prevChat={messagesRef.current?.[index - 1]}
        nextChat={messagesRef.current?.[index + 1]}
      />
    ),
    [messagesRef],
  );

  const renderHeader = useCallback(
    () => (
      <div tw="pt-6 pb-1 px-5" key="chatRoomAgentSummary">
        <ChatRoomAgentSummary
          agentDescription={agentDescription}
          agentName={agentName}
          agentProfileImagePath={agentProfileImagePath}
          officeName={officeName}
        />
      </div>
    ),
    [agentDescription, agentName, agentProfileImagePath, officeName],
  );

  const [showListingList, setShowListingList] = useState(false);

  return (
    <div tw="flex flex-col h-full relative">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title tw="text-b1">{officeName}</NavigationHeader.Title>
        <NavigationHeader.MoreButton
          onClickItem={(index) => headerItems[index]?.onClick?.()}
          items={headerItems.map((item) => item.label)}
        />
      </NavigationHeader>
      <button
        type="button"
        onClick={() => {
          setShowListingList(true);
        }}
        tw="flex p-4 border-t border-gray-300  justify-between cursor-pointer"
      >
        <div> {title + (additionalListingCount > 0 ? ` 외 ${additionalListingCount}건` : '')}</div>
        <div tw="shrink-0 mt-1 self-start  underline text-info text-gray-1000">더보기</div>
      </button>
      <div tw="flex-1 min-h-0 overflow-y-hidden border-t border-gray-300">
        {isLoading ? (
          <Loading tw="text-center mt-10" />
        ) : (
          <Virtuoso
            defaultItemHeight={38}
            style={{ height: '100%', width: '100%' }}
            atBottomThreshold={24}
            followOutput="auto"
            initialTopMostItemIndex={messagesRef.current.length - 1}
            data={chatMessages}
            itemContent={renderItem}
            components={{
              Header: renderHeader,
            }}
          />
        )}
      </div>
      <div tw="px-5 pt-4 pb-10">
        <ChatRoomTextField disabled={textFieldDisabled} inputRef={inputRef} onSendMessage={onSendMessage} />
      </div>
      {showListingList && (
        <ListingList
          sellerList={sellerList}
          buyerContractList={buyerContractList}
          buyerActiveList={buyerActiveList}
          setShowListingList={setShowListingList}
          chatUserType={chatUserType}
          agentName={agentName}
          officeName={officeName}
          onClickNavigateToListingDetail={onClickNavigateToListingDetail}
          onClickNavigateToListingDetailHistory={onClickNavigateToListingDetailHistory}
        />
      )}
    </div>
  );
}
