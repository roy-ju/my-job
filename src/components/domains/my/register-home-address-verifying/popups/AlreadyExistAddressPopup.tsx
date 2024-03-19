import { OverlayPresenter, Popup } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function AlreadyExistAddressPopup({ handleConfirm }: CommonPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup>
          <Popup.SmallTitle tw="text-center">
            동일한 주소지로
            <br />
            우리집 등록이 되어있습니다.
          </Popup.SmallTitle>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
