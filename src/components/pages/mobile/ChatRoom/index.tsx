import { MobileContainer } from '@/components/atoms';
import { ChatRoom } from '@/components/templates';
import { memo, useState } from 'react';
// import Routes from '@/router/routes';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { ChatUserType } from '@/constants/enums';
import closeChatRoom from '@/apis/chat/closeChatRoom';
import useAPI_GetChatListingList from '@/apis/chat/getChatListingList';
import { mutate } from 'swr';
import { useRouter } from 'next/router';
import Routes from '@/router/routes';
import useChatRoom from './useChatRoom';

export default memo(() => {
  const router = useRouter();
  const [popupOpen, setPopupOpen] = useState(false);
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
    chatUserType,
  } = useChatRoom(Number(router.query.chatRoomID));
  const { sellerList, buyerContractList, buyerActiveList } = useAPI_GetChatListingList(Number(router.query.chatRoomID));

  const handleClickReportButton = () => {
    const chatRoomID = router.query.chatRoomID as string;

    router.push(
      { pathname: `/${Routes.EntryMobile}/${Routes.ChatRoomReport}`, query: { chatRoomID } },
      `/${Routes.EntryMobile}/${Routes.ChatRoomReport}?chatRoomID=${chatRoomID}`,
    );
  };

  const handleClickLeaveButton = () => {
    setPopupOpen(true);
  };

  const handleCloseChatRoom = async () => {
    const chatRoomID = Number(router.query.chatRoomID);
    await closeChatRoom(chatRoomID);
    await mutate('/chat/room/list');
  };

  const renderPopupBodyContents = () => {
    if (chatUserType === ChatUserType.Buyer) {
      return '채팅을 나가시면 이 중개사님과의 협의중인 모든 매물에 제안이 취소되며 협의 재개를 위해서는 다시 제안이 필요합니다. 채팅방을 나가시겠습니까?';
    }
    return '등록된 매물의 담당 중개사님과의 채팅종료는 매물등록 취소나 거래성사되어야만 가능합니다. ';
  };

  const renderPopupButton = () => {
    if (chatUserType === ChatUserType.Buyer) {
      return (
        <>
          <Popup.CancelButton>돌아가기</Popup.CancelButton>
          <Popup.ActionButton onClick={handleCloseChatRoom}>채팅방 나가기</Popup.ActionButton>
        </>
      );
    }
    return <Popup.ActionButton onClick={() => setPopupOpen(false)}>확인</Popup.ActionButton>;
  };

  return (
    <MobileContainer>
      <ChatRoom
        sellerList={sellerList}
        buyerContractList={buyerContractList}
        buyerActiveList={buyerActiveList}
        title={listingTitle ?? ''}
        agentName={agentName ?? ''}
        officeName={agentOfficeName ?? ''}
        agentDescription={agentDescription ?? ''}
        agentProfileImagePath={agentProfileImagePath ?? ''}
        additionalListingCount={additionalListingCount ?? 0}
        isLoading={isLoading}
        chatUserType={chatUserType ?? 0}
        chatMessages={chatMessages}
        textFieldDisabled={isTextFieldDisabled}
        onSendMessage={handleSendMessage}
        onClickReportButton={handleClickReportButton}
        onClickLeaveButton={handleClickLeaveButton}
        onClickBack={() => router.back()}
      />
      {popupOpen && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>채팅방 나가기</Popup.Title>
              <Popup.Body>{renderPopupBodyContents()}</Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>{renderPopupButton()}</Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
});
