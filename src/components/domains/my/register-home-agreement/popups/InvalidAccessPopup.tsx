import { OverlayPresenter, Popup } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function InvalidAccessPopup({ handleConfirm }: CommonPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-6">
          <Popup.SubTitle tw="text-center">유효하지 않은 접근입니다.</Popup.SubTitle>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>네고시오 홈으로 돌아가기</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
