import { Panel } from '@/components/atoms';
import { ChatRoomReport as ChatRoomReportTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useCallback, useState } from 'react';
import createReportChatRoom from '@/apis/chat/createReportChatRoom';
import Routes from '@/router/routes';
import { OverlayPresenter, Popup } from '@/components/molecules';
import useChatRoom from '../ChatRoom/useChatRoom';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function ChatRoomReport({ depth, panelWidth }: Props) {
  const router = useRouter(depth);
  const { listingTitle, agentOfficeName, additionalListingCount } = useChatRoom(Number(router.query.chatRoomID));
  const [reportContent, setReportContent] = useState('');
  const [popup, setPopup] = useState(false);

  const handleChangeReportContent = useCallback((value: string) => {
    setReportContent(value);
  }, []);

  const handleClickReportButton = () => {
    setPopup(true);
  };

  const onRemoveChatRoom = () => {
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
      {popup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>정말 신고하시겠습니까?</Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setPopup(false)}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={onRemoveChatRoom}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </Panel>
  );
}
