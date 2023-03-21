import { Panel } from '@/components/atoms';
import { ChatRoom } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo } from 'react';
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
    agentProfileImagePath,
    isLoading,
    isTextFieldDisabled,
    handleSendMessage,
  } = useChatRoom(Number(router.query.chatRoomID));

  return (
    <Panel width={panelWidth}>
      <ChatRoom
        title={listingTitle ?? ''}
        agentName={agentName ?? ''}
        officeName={agentOfficeName ?? ''}
        agentDescription={agentDescription ?? ''}
        agentProfileImagePath={agentProfileImagePath ?? ''}
        isLoading={isLoading}
        chatMessages={chatMessages}
        textFieldDisabled={isTextFieldDisabled}
        onSendMessage={handleSendMessage}
      />
    </Panel>
  );
});
