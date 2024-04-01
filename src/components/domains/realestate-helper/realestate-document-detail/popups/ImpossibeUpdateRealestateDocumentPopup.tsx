import { Popup, OverlayPresenter } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function ImpossibeUpdateRealestateDocumentPopup({ handleConfirm }: CommonPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.Title>등기부 업데이트 불가</Popup.Title>
          <Popup.Body>
            현재 등기부 무료 조회 가능 횟수가 없어 등기부 업데이트가 불가해요. 월요일에 다시 시도해주세요!
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
