/* eslint-disable @typescript-eslint/no-unused-vars */
import { Panel } from '@/components/atoms';
import { ChatRoomReport as ChatRoomReportTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useCallback, useState } from 'react';
import createReportChatRoom from '@/apis/chat/createReportChatRoom';
import Routes from '@/router/routes';
import { toast } from 'react-toastify';
import { ChatRoomType } from '@/constants/enums';
import useChatRoom from '../ChatRoom/useChatRoom';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function ChatRoomReport({ depth, panelWidth }: Props) {
  const router = useRouter(depth);
  const { title, otherName, chatRoomType } = useChatRoom(Number(router.query.chatRoomID));
  const [reportContent, setReportContent] = useState('');

  const handleChangeReportContent = useCallback((value: string) => {
    setReportContent(value);
  }, []);

  const handleClickReportButton = () => {
    createReportChatRoom({
      chat_room_id: Number(router.query.chatRoomID),
      message: reportContent,
    });

    setTimeout(() => {
      toast.success('신고되었습니다.', { toastId: 'reportSuccess' });
      setTimeout(() => {
        router.pop();
      }, 50);
    }, 50);

    router.pop();
  };

  const handleClickBackButton = () => {
    const chatRoomID = router.query.chatRoomID as string;
    router.replace(`${Routes.ChatRoom}`, {
      persistParams: true,
      searchParams: { chatRoomID },
    });
  };

  return (
    <Panel width={panelWidth}>
      <ChatRoomReportTemplate
        listingTitle={title ?? ''}
        targetName={
          chatRoomType === ChatRoomType.BuyerSellerSuggestRecommendation ? `${otherName}` : `${otherName} 공인중개사`
        }
        reportContent={reportContent}
        onChangeReportContent={handleChangeReportContent}
        onClickReportButton={handleClickReportButton}
        onClickBackButton={handleClickBackButton}
      />
    </Panel>
  );
}
