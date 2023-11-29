import { ChatRoomAccordionsProps } from '@/apis/chat/getChatRoomDetail';
import { Loading } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ChatRoomDetailsAccordion, ChatRoomTextField } from '@/components/organisms';
import useLatest from '@/hooks/utils/useLatest';
import React, { CSSProperties, Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List, VariableSizeList } from 'react-window';
import tw from 'twin.macro';

import ChatMessageWrapper, { IChatMessage } from './ChatMessageWrapper';

interface ChatRoomProps {
  isLoading: boolean;
  title?: string;
  chatUserType: number;
  chatRoomType: number;
  deregistered?: boolean;
  accordionDetails: ChatRoomAccordionsProps;

  chatMessages: IChatMessage[];
  textFieldDisabled?: boolean;

  inputRef?: (element: HTMLTextAreaElement | null) => void;
  onSendMessage?: (message: string) => void;

  photosUrls?: string[];
  onChangePhotosUrls?: (url: string[]) => void;

  setPhotoSending?: Dispatch<SetStateAction<boolean>>;

  onClickReportButton?: () => void;
  onClickLeaveButton?: () => void;
  onClickBack?: () => void;

  onClickNavigateToListingDetail?: (listingID?: number, biddingID?: Nullable<number>) => void;
  onClickNavigateToSuggestDetail?: (suggestID?: number) => void;
  onClickNavigateToSuggestRecommended?: (suggestRecommendID?: number) => void;
}

export default function ChatRoom({
  isLoading,
  title,
  chatUserType,
  chatRoomType,
  deregistered,
  accordionDetails,

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

  onClickNavigateToListingDetail,
  onClickNavigateToSuggestDetail,
  onClickNavigateToSuggestRecommended,
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
        <NavigationHeader.Title tw="text-subhead_03" css={[deregistered && tw`opacity-[0.4]`]}>
          {title}
        </NavigationHeader.Title>
        <NavigationHeader.MoreButton
          onClickItem={(index) => headerItems[index]?.onClick?.()}
          items={headerItems.map((item) => item.label)}
        />
      </NavigationHeader>
      <ChatRoomDetailsAccordion
        accordionDetails={accordionDetails}
        chatRoomType={chatRoomType}
        onClickNavigateToListingDetail={onClickNavigateToListingDetail}
        onClickNavigateToSuggestDetail={onClickNavigateToSuggestDetail}
        onClickNavigateToSuggestRecommended={onClickNavigateToSuggestRecommended}
      />
      <div tw="flex flex-col flex-1 min-h-0 overflow-y-hidden bg-white">
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
