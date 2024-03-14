import { Popup, OverlayPresenter } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function VerifyAddressExceedMaxCountPopup({ handleConfirm }: CommonPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.Title>주소 조회 불가</Popup.Title>
          <Popup.Body>주소 입력 가능 횟수를 초과하셨습니다. 익일 0:00시에 다시 시도해주세요!</Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
