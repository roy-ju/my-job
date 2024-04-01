import { OverlayPresenter, Popup } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function SendCountReachedPopup({ handleConfirm }: CommonPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-6">
          <Popup.SubTitle tw="text-center">일 발송 횟수 제한</Popup.SubTitle>
          <Popup.Body>
            하루 최대 5건의 문자 발송이 가능합니다.
            <br />
            내일 다시 시도해주세요.
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
