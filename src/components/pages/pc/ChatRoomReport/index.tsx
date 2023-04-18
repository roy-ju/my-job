import { Panel } from '@/components/atoms';
import { ChatRoomReport as ChatRoomReportTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useCallback, useState } from 'react';
import createReportChatRoom from '@/apis/chat/createReportChatRoom';
import Routes from '@/router/routes';
import useChatRoom from '../ChatRoom/useChatRoom';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function ChatRoomReport({ depth, panelWidth }: Props) {
  const router = useRouter(depth);
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
    router.pop();
  };

  const handleClickBackButton = () => {
    const chatRoomID = router.query.chatRoomID as string;
    router.replace(`${Routes.ChatRoom}`, {
      searchParams: { chatRoomID },
    });
  };

  return (
    <Panel width={panelWidth}>
      <ChatRoomReportTemplate
        listingTitle={listingTitle ?? ''}
        officeName={agentOfficeName ?? ''}
        additionalListingCount={additionalListingCount ?? 0}
        reportContent={reportContent}
        onChangeReportContent={handleChangeReportContent}
        onClickReportButton={handleClickReportButton}
        onClickBackButton={handleClickBackButton}
      />
    </Panel>
  );
}
