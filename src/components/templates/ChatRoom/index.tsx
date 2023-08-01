import { Loading } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ChatRoomAgentSummary, ChatRoomTextField } from '@/components/organisms';
import useLatest from '@/hooks/utils/useLatest';
import { StaticImageData } from 'next/image';
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List, VariableSizeList } from 'react-window';
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
  photosUrls?: string[];

  inputRef?: (element: HTMLTextAreaElement | null) => void;
  onSendMessage?: (message: string) => void;
  onChangePhotosUrls?: (url: string[]) => void;

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

  photosUrls,
  onChangePhotosUrls,

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
  const sizeMap = useRef<Record<number, number>>({});
  const [scrolled, setScrolled] = useState(false);

  const [list, setList] = useState<VariableSizeList<any> | null>(null);

  const headerItems = [
    { label: '신고하기', onClick: onClickReportButton },
    {
      label: '채팅방 나가기',
      onClick: onClickLeaveButton,
    },
  ];

  const renderRow = useCallback(
    ({ index, style }: { index: number; style: CSSProperties }) => {
      const chat = messagesRef.current?.[index];

      const prevChat = messagesRef.current?.[index - 1];
      const nextChat = messagesRef.current?.[index + 1];

      return (
        <div key={chat.id} style={style}>
          <div
            ref={(el) => {
              if (el) sizeMap.current[index] = el?.getBoundingClientRect().height;
            }}
          >
            {index === 0 && (
              <div tw="pt-6 pb-1 px-5" key="chatRoomAgentSummary">
                <ChatRoomAgentSummary
                  agentDescription={agentDescription}
                  agentName={agentName}
                  agentProfileImagePath={agentProfileImagePath}
                  officeName={officeName}
                />
              </div>
            )}
            <ChatMessageWrapper chat={chat} prevChat={prevChat} nextChat={nextChat} />
          </div>
        </div>
      );
    },
    [messagesRef, agentDescription, agentName, agentProfileImagePath, officeName],
  );

  const getItemSize = useCallback((index: number) => sizeMap.current[index] ?? 0, []);

  const [showListingList, setShowListingList] = useState(false);

  useEffect(() => {
    list?.resetAfterIndex(0);
    list?.scrollToItem(chatMessages.length - 1, 'start');
    setTimeout(() => {
      list?.scrollToItem(chatMessages.length - 1, 'start');
      setScrolled(true);
    }, 300);
  }, [list, chatMessages.length]);

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
      <div tw="flex flex-col flex-1 min-h-0 overflow-y-hidden border-t border-gray-300 bg-gray-100">
        {isLoading ? (
          <Loading tw="text-center mt-10" />
        ) : (
          <div tw="flex-1 min-h-0" style={{ opacity: scrolled ? 1 : 0 }}>
            <AutoSizer>
              {({ width, height }) => (
                <List
                  ref={setList}
                  height={height ?? 0}
                  width={width ?? 0}
                  itemCount={chatMessages.length}
                  itemSize={getItemSize}
                  onItemsRendered={({ overscanStartIndex }) => {
                    list?.resetAfterIndex(overscanStartIndex);
                  }}
                >
                  {renderRow}
                </List>
              )}
            </AutoSizer>
          </div>
        )}
      </div>
      <div tw="px-5 pt-4 pb-10">
        <ChatRoomTextField
          disabled={textFieldDisabled}
          inputRef={inputRef}
          onSendMessage={onSendMessage}
          photosUrls={photosUrls}
          onChangePhotosUrls={onChangePhotosUrls}
        />
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
