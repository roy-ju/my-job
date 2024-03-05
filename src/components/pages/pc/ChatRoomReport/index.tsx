import { useCallback, useState } from 'react';

import { useRouter } from '@/hooks/utils';

import { Panel } from '@/components/atoms';

import { ChatRoomReport as ChatRoomReportTemplate } from '@/components/templates';

import createReportChatRoom from '@/apis/chat/createReportChatRoom';

import Routes from '@/router/routes';

import { toast } from 'react-toastify';

import useFetchChatRoomDetail from '@/services/chat/useFetchChatRoomDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function ChatRoomReport({ depth, panelWidth }: Props) {
  const router = useRouter(depth);

  const { data } = useFetchChatRoomDetail(Number(router.query.chatRoomID));

  const otherName = data?.other_name;

  const deregistered = data?.deregistered;

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
        targetName={deregistered ? '탈퇴한 회원' : `${otherName}`}
        reportContent={reportContent}
        onChangeReportContent={handleChangeReportContent}
        onClickReportButton={handleClickReportButton}
        onClickBackButton={handleClickBackButton}
      />
    </Panel>
  );
}
