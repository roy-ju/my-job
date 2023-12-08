import { Popup } from '@/components/molecules';

function ChatRoomPopup() {
  return null;
}

interface OneProps {
  onClickClose?: () => void;
  onLeaveChatRoom?: () => void;
  isLoading?: boolean;
}

function CloseCase1({ isLoading, onClickClose, onLeaveChatRoom }: OneProps) {
  return (
    <Popup>
      <Popup.ContentGroup>
        <Popup.SubTitle tw="text-center">채팅방을 나가시겠습니까?</Popup.SubTitle>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.CancelButton isLoading={isLoading} onClick={onClickClose}>
          닫기
        </Popup.CancelButton>
        <Popup.ActionButton isLoading={isLoading} onClick={onLeaveChatRoom}>
          나가기
        </Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

export default Object.assign(ChatRoomPopup, {
  CloseCase1,
});
