import { Panel } from '@/components/atoms';
import { ChatRoom } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo } from 'react';
import Routes from '@/router/routes';
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
    additionalListingCount,
  } = useChatRoom(Number(router.query.chatRoomID));

  // 신고하기 버튼 함수

  // 채팅방 나가기 함수
  const handleClickReportButton = () => {
    const chatRoomID = router.query.chatRoomID as string;
    router.replace(`${Routes.ChatRoomReport}`, {
      searchParams: { chatRoomID },
    });
  };

  return (
    <Panel width={panelWidth}>
      <ChatRoom
        title={listingTitle ?? ''}
        agentName={agentName ?? ''}
        officeName={agentOfficeName ?? ''}
        agentDescription={agentDescription ?? ''}
        agentProfileImagePath={agentProfileImagePath ?? ''}
        additionalListingCount={additionalListingCount ?? 0}
        isLoading={isLoading}
        chatMessages={chatMessages}
        textFieldDisabled={isTextFieldDisabled}
        onSendMessage={handleSendMessage}
        onClickReportButton={handleClickReportButton}
      />
    </Panel>
  );
});
