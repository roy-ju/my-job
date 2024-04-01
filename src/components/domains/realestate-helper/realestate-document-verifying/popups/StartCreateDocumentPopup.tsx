import { Popup, OverlayPresenter } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function StartCreateDocumentPopup({ handleConfirm }: CommonPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.Title>등기부를 조회합니다.</Popup.Title>
          <Popup.Body>
            주소 확인이 완료되어 등기부 조회를 시작합니다.
            <br />
            조회가 완료되면 알려드릴게요. 조금만 기다려주세요!
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
