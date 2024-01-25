import { Popup } from '@/components/molecules';

export interface UpdateNicknamePopupsProps {
  onClickUpdate?: () => void;
  onClickCancel?: () => void;
}

export default function UpdateNicknamePopup({ onClickUpdate, onClickCancel }: UpdateNicknamePopupsProps) {
  return (
    <Popup>
      <Popup.ContentGroup>
        <Popup.Title>닉네임을 변경하시겠습니까?</Popup.Title>
        <Popup.Body>7일 후에 다시 변경할 수 있습니다.</Popup.Body>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.CancelButton onClick={onClickCancel}>취소</Popup.CancelButton>
        <Popup.ActionButton onClick={onClickUpdate}>변경하기</Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}
