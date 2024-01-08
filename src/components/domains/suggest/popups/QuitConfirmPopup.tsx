import { OverlayPresenter, Popup } from '@/components/molecules';

type QuitConfirmPopupProps = {
  onClickClose: () => void;
  onClickConfirm: () => void;
};

export default function QuitConfirmPopup({ onClickClose, onClickConfirm }: QuitConfirmPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup>
          <Popup.SmallTitle>집구하기를 종료하시겠습니까?</Popup.SmallTitle>
          <Popup.Body>집구하기가 종료되며 입력하신 내용은 저장되지 않습니다.</Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={onClickClose}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={onClickConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
