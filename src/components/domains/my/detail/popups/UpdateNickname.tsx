import { Popup } from '@/components/molecules';

export interface UpdateNicknamePopupsProps {
  onClickUpdate?: () => void;
  onClickCancel?: () => void;
}

export default function UpdateNicknamePopup({ onClickUpdate, onClickCancel }: UpdateNicknamePopupsProps) {
  return (
    <Popup>
      <Popup.ContentGroup>
        <Popup.Title>닉네임을 수정하시겠어요?</Popup.Title>
        <Popup.Body>수정 후에는 7일이 지나야 재수정이 가능합니다.</Popup.Body>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.CancelButton onClick={onClickCancel}>취소</Popup.CancelButton>
        <Popup.ActionButton onClick={onClickUpdate}>확인</Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}
