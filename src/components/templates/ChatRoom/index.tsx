import { Loading } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ChatRoomAgentSummary, ChatRoomTextField } from '@/components/organisms';
import useLatest from '@/hooks/utils/useLatest';
import { StaticImageData } from 'next/image';
import { useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
import ChatMessageWrapper, { IChatMessage } from './ChatMessageWrapper';

const headerItems = ['채팅방나가기'];

interface ChatRoomProps {
  title: string;
  agentName: string;
  officeName: string;
  agentDescription: string;
  agentProfileImagePath: string | StaticImageData;
  isLoading: boolean;
  chatMessages: IChatMessage[];
  textFieldDisabled?: boolean;
  inputRef?: (element: HTMLTextAreaElement | null) => void;
  onSendMessage?: (message: string) => void;
}

export default function ChatRoom({
  isLoading,
  title,
  chatMessages,
  textFieldDisabled = false,
  agentDescription,
  agentName,
  agentProfileImagePath,
  officeName,
  inputRef,
  onSendMessage,
}: ChatRoomProps) {
  const messagesRef = useLatest(chatMessages);

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
        <NavigationHeader.Title tw="text-b1">{title}</NavigationHeader.Title>
        <NavigationHeader.MoreButton items={headerItems} />
      </NavigationHeader>
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
    </div>
  );
}
