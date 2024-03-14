import { Popup, OverlayPresenter } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function DeleteRealestateDocumentPopup({ handleCancel, handleConfirm }: CommonPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.Title>등기부를 삭제하시겠어요?</Popup.Title>
          <Popup.Body>
            삭제 후 해당 등기부를 다시 보고싶다면 신규조회를 통해서 재조회해야 합니다. 재조회 시 등기부 무료 조회수가
            1회 차감됩니다.
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleCancel}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
