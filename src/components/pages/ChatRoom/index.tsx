import { ClosablePanel } from '@/components/molecules';
import { ChatRoom } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback } from 'react';
import useChatRoom from './useChatRoom';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const {
    listingTitle,
    agentName,
    agentDescription,
    agentOfficeName,
    chatMessages,
    isLoading,
    isTextFieldDisabled,
    handleSendMessage,
  } = useChatRoom(Number(router.query.chatRoomID));

  const handleClickClose = useCallback(() => {
    router.pop();
  }, [router]);

  return (
    <ClosablePanel width={panelWidth} closable={depth === 2} onClickClose={handleClickClose}>
      <ChatRoom
        title={listingTitle ?? ''}
        agentName={agentName ?? ''}
        officeName={agentOfficeName ?? ''}
        agentDescription={agentDescription ?? ''}
        isLoading={isLoading}
        chatMessages={chatMessages}
        textFieldDisabled={isTextFieldDisabled}
        onSendMessage={handleSendMessage}
      />
    </ClosablePanel>
  );
});
