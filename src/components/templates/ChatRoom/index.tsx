/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IChatRoomDetailBiddingItem,
  IChatRoomDetailListingItem,
  IChatRoomDetailSuggestRecommendItem,
  IChatRoomDetailSuggestItem,
} from '@/apis/chat/getChatRoomDetail';
import { Loading } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ChatRoomTextField } from '@/components/organisms';
import useLatest from '@/hooks/utils/useLatest';
import React, { CSSProperties, Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List, VariableSizeList } from 'react-window';
import ChatRoomDetailsAccordionRenderer from './ChatRoomDetailsAccordionRenderer';

import ChatMessageWrapper, { IChatMessage } from './ChatMessageWrapper';

interface ChatRoomProps {
  title: string;

  isLoading: boolean;
  chatMessages: IChatMessage[];
  chatUserType: number;
  chatRoomType: number;
  listingItem?: IChatRoomDetailListingItem;
  biddingItem?: IChatRoomDetailBiddingItem;
  suggestItem?: IChatRoomDetailSuggestItem;
  suggestRecommendItem?: IChatRoomDetailSuggestRecommendItem;

  textFieldDisabled?: boolean;
  photosUrls?: string[];

  setPhotoSending?: Dispatch<SetStateAction<boolean>>;

  inputRef?: (element: HTMLTextAreaElement | null) => void;
  onSendMessage?: (message: string) => void;
  onChangePhotosUrls?: (url: string[]) => void;

  onClickReportButton?: () => void;
  onClickLeaveButton?: () => void;
  onClickBack?: () => void;
  onClickContractCtaButton?: () => void;

  onClickNavigateToListingDetail?: (listingID: number) => () => void;
  onClickNavigateToListingCreateResult?: (listingID: number) => () => void;
  onClickNavigateToListingDetailHistory?: (listingID: number, biddingID: number) => () => void;
}

export default function ChatRoom({
  isLoading,
  title,
  chatUserType,
  chatRoomType,
  listingItem,
  biddingItem,
  suggestItem,
  suggestRecommendItem,

  chatMessages,
  textFieldDisabled = false,

  inputRef,
  onSendMessage,

  photosUrls,
  onChangePhotosUrls,

  setPhotoSending,

  onClickReportButton,
  onClickLeaveButton,
  onClickBack,
  onClickContractCtaButton,

  onClickNavigateToListingDetail,
  onClickNavigateToListingCreateResult,
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
              if (el) {
                sizeMap.current[index] = el?.getBoundingClientRect().height;
              }
            }}
          >
            <ChatMessageWrapper chat={chat} prevChat={prevChat} nextChat={nextChat} chatRoomUserType={chatUserType} />
          </div>
        </div>
      );
    },
    [messagesRef, chatUserType],
  );

  const getItemSize = useCallback((index: number) => sizeMap.current[index] ?? 0, []);

  useEffect(() => {
    list?.resetAfterIndex(0);

    list?.scrollToItem(chatMessages.length - 1, 'start');

    setTimeout(() => {
      list?.scrollToItem(chatMessages.length - 1, 'start');
      setScrolled(true);
    }, 100);
  }, [list, chatMessages.length]);

  return (
    <div tw="flex flex-col h-full relative">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title tw="text-b1">{title}</NavigationHeader.Title>
        <NavigationHeader.MoreButton
          onClickItem={(index) => headerItems[index]?.onClick?.()}
          items={headerItems.map((item) => item.label)}
        />
      </NavigationHeader>
      <ChatRoomDetailsAccordionRenderer
        chatUserType={chatUserType}
        chatRoomType={chatRoomType}
        listingItem={listingItem}
        biddingItem={biddingItem}
        suggestItem={suggestItem}
        suggestRecommendItem={suggestRecommendItem}
        onClickContractCtaButton={onClickContractCtaButton}
        onClickNavigateToListingDetail={onClickNavigateToListingDetail}
        onClickNavigateToListingCreateResult={onClickNavigateToListingCreateResult}
        onClickNavigateToListingDetailHistory={onClickNavigateToListingDetailHistory}
      />
      <div tw="flex flex-col flex-1 min-h-0 overflow-y-hidden  bg-white">
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
      <div tw="pb-10 [box-shadow:  0px 0px 24px 0px #00000014;]">
        <ChatRoomTextField
          disabled={textFieldDisabled}
          inputRef={inputRef}
          onSendMessage={onSendMessage}
          photosUrls={photosUrls}
          onChangePhotosUrls={onChangePhotosUrls}
          setPhotoSending={setPhotoSending}
        />
      </div>
    </div>
  );
}
