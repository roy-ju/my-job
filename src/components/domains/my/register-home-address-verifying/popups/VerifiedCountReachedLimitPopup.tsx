import { OverlayPresenter, Popup } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function VerifiedCountReachedLimitPopup({ handleConfirm }: CommonPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup>
          <Popup.SmallTitle tw="text-center">
            주소 정보 확인은
            <br />
            하루 최대 5회까지 할 수 있습니다.
            <br />
            내일 다시 시도해주세요.
          </Popup.SmallTitle>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
