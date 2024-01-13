import { MobileContainer } from '@/components/atoms';

import { ChatRoomReport as ChatRoomReportTemplate } from '@/components/templates';

import { useCallback, useState } from 'react';

import createReportChatRoom from '@/apis/chat/createReportChatRoom';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useChatRoom from '../ChatRoom/useChatRoom';

export default function ChatRoomReport() {
  const router = useRouter();
  const { otherName, deregistered } = useChatRoom(Number(router.query.chatRoomID));
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
        router.back();
      }, 50);
    }, 50);
  };

  const handleClickBackButton = () => {
    router.back();
  };

  return (
    <MobileContainer>
      <ChatRoomReportTemplate
        targetName={deregistered ? '탈퇴한 회원' : `${otherName}`}
        reportContent={reportContent}
        onChangeReportContent={handleChangeReportContent}
        onClickReportButton={handleClickReportButton}
        onClickBackButton={handleClickBackButton}
      />
    </MobileContainer>
  );
}
