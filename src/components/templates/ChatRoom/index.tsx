import { Loading } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ChatRoomAgentSummary, ChatRoomDetailsAccordion, ChatRoomTextField } from '@/components/organisms';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import { useRef } from 'react';
import ChatMessageWrapper, { IChatMessage } from './ChatMessageWrapper';

interface ChatRoomProps {
  title: string;
  agentName: string;
  officeName: string;
  agentDescription: string;
  agentProfileImagePath: string;
  isLoading: boolean;
  chatMessages: IChatMessage[];
  textFieldDisabled?: boolean;
  inputRef?: (element: HTMLTextAreaElement | null) => void;
  onSendMessage?: (message: string) => void;
}

export default function ChatRoom({
  isLoading,
  title,
  agentName,
  officeName,
  agentDescription,
  agentProfileImagePath,
  chatMessages,
  textFieldDisabled = false,
  inputRef,
  onSendMessage,
}: ChatRoomProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [chatMessages.length]);

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title tw="text-b1">{title}</NavigationHeader.Title>
      </NavigationHeader>
      <ChatRoomDetailsAccordion />
      <div tw="flex-1 min-h-0 overflow-scroll px-5 py-6 border-t border-gray-300" ref={listRef}>
        {isLoading ? (
          <Loading tw="text-center mt-10" />
        ) : (
          <div>
            <ChatRoomAgentSummary
              agentName={agentName}
              officeName={officeName}
              agentDescription={agentDescription}
              agentProfileImagePath={agentProfileImagePath}
            />
            <div tw="flex flex-col gap-2 pt-8">
              {chatMessages.map((chat, index) => (
                <ChatMessageWrapper
                  key={chat.id}
                  chat={chat}
                  prevChat={chatMessages[index - 1]}
                  nextChat={chatMessages[index + 1]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div tw="px-5 pt-4 pb-10">
        <ChatRoomTextField disabled={textFieldDisabled} inputRef={inputRef} onSendMessage={onSendMessage} />
      </div>
    </div>
  );
}
