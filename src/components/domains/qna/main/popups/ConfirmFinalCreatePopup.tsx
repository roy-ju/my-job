import { OverlayPresenter, Popup } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function ConfirmFinalCreatePopup({ handleCancel, handleConfirm }: CommonPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup>
          <Popup.Title>
            작성하신 내용은 수정할 수 없습니다.
            <br />위 내용으로 문의하시겠습니까?
          </Popup.Title>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleCancel}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
