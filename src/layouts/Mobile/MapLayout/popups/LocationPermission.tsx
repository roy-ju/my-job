import { OverlayPresenter, Popup } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function LocationPermission({ handleCancel }: CommonPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-12">
          <Popup.Title>위치 접근 권한을 허용해 주세요.</Popup.Title>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleCancel}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
