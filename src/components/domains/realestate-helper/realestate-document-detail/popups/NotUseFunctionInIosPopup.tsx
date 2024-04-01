import { Popup, OverlayPresenter } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function NotUseFunctionInIosPopup({ handleConfirm }: CommonPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.Title>서비스 준비중입니다.</Popup.Title>
          <Popup.Body>
            IOS와의 호환문제로, 현재 등기부 다운로드 서비스가 정상 작동하지 않습니다. 최대한 빠르게 해결하도록
            하겠습니다.
            <br />
            이미 확인하신 등기부는 위 호환문제 해결 후 확인 가능합니다.
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
