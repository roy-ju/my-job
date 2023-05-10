import { MobileContainer } from '@/components/atoms';
import { ChatRoomReport as ChatRoomReportTemplate } from '@/components/templates';
import { useCallback, useState } from 'react';
import createReportChatRoom from '@/apis/chat/createReportChatRoom';
import { useRouter } from 'next/router';
import useChatRoom from '../ChatRoom/useChatRoom';

export default function ChatRoomReport() {
  const router = useRouter();
  const { listingTitle, agentOfficeName, additionalListingCount } = useChatRoom(Number(router.query.chatRoomID));
  const [reportContent, setReportContent] = useState('');

  const handleChangeReportContent = useCallback((value: string) => {
    setReportContent(value);
  }, []);

  const handleClickReportButton = () => {
    createReportChatRoom({
      chat_room_id: Number(router.query.chatRoomID),
      message: reportContent,
    });
    router.back();
  };

  const handleClickBackButton = () => {
    router.back();
  };

  return (
    <MobileContainer>
      <ChatRoomReportTemplate
        listingTitle={listingTitle ?? ''}
        officeName={agentOfficeName ?? ''}
        additionalListingCount={additionalListingCount ?? 0}
        reportContent={reportContent}
        onChangeReportContent={handleChangeReportContent}
        onClickReportButton={handleClickReportButton}
        onClickBackButton={handleClickBackButton}
      />
    </MobileContainer>
  );
}
