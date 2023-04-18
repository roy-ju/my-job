import { Loading } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ChatRoomAgentSummary, ChatRoomTextField } from '@/components/organisms';
import useLatest from '@/hooks/utils/useLatest';
import { StaticImageData } from 'next/image';
import { useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
import ChatMessageWrapper, { IChatMessage } from './ChatMessageWrapper';

interface ChatRoomProps {
  title: string;
  agentName: string;
  officeName: string;
  agentDescription: string;
  agentProfileImagePath: string | StaticImageData;
  additionalListingCount: number;
  isLoading: boolean;
  chatMessages: IChatMessage[];
  textFieldDisabled?: boolean;
  inputRef?: (element: HTMLTextAreaElement | null) => void;
  onSendMessage?: (message: string) => void;

  onClickReportButton?: () => void;
  onClickLeaveButton?: () => void;
}

export default function ChatRoom({
  isLoading,
  title, // listingTitle
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
      <div tw="pt-6 pb-8 px-5" key="chatRoomAgentSummary">
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

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title tw="text-b1">{officeName}</NavigationHeader.Title>
        <NavigationHeader.MoreButton
          onClickItem={(index) => headerItems[index]?.onClick?.()}
          items={headerItems.map((item) => item.label)}
        />
      </NavigationHeader>
      <div tw="flex p-4 border-t border-gray-300  justify-between">
        <div> {title + (additionalListingCount > 0 ? ` 외 ${additionalListingCount}건` : '')}</div>
        <button tw="shrink-0 mt-1 self-start  underline text-info text-gray-1000" type="button">
          더보기
        </button>
      </div>
      <div tw="flex-1 min-h-0 overflow-y-hidden border-t border-gray-300">
        {isLoading ? (
          <Loading tw="text-center mt-10" />
        ) : (
          <Virtuoso
            defaultItemHeight={38} // 각 아이템의 높이
            style={{ height: '100%', width: '100%' }} // 컨테이너의 높이
            atBottomThreshold={24} // 스크롤이 맨 아래에 있을 때, 아래로 스크롤을 할 때, 새로운 아이템이 추가되는 시점
            followOutput="auto" // 스크롤이 맨 아래에 있을 때, 새로운 아이템이 추가되면, 스크롤을 맨 아래로 내림
            initialTopMostItemIndex={messagesRef.current.length - 1} // 초기에 스크롤을 맨 아래로 내림
            data={chatMessages} // 아이템 리스트
            itemContent={renderItem} // 아이템을 렌더링하는 함수
            components={{
              Header: renderHeader,
            }} // 헤더를 렌더링하는 함수
          />
        )}
      </div>
      <div tw="px-5 pt-4 pb-10">
        <ChatRoomTextField disabled={textFieldDisabled} inputRef={inputRef} onSendMessage={onSendMessage} />
      </div>
    </div>
  );
}
