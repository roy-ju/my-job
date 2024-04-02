import { Popup, OverlayPresenter } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function VerifyingDeungibuPopup({ handleConfirm }: CommonPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.Title>등기부 조회 요청 중입니다.</Popup.Title>
          <Popup.Body tw="whitespace-pre-line">
            {`이미 등기부 조회를 요청 중입니다.\n등기부 조회가 완료되면 '조회한 등기부 목록'에서 등기부를 확인할 수 있어요!`}
          </Popup.Body>
        </Popup.ContentGroup>

        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
