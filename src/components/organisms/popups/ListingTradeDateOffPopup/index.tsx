import { OverlayPresenter, Popup } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function ListingTradeDateOffPopup({ handleConfirm }: CommonPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup>
          <Popup.Title tw="[text-align: center]">
            거래가 종료되어
            <br />
            매물 상세 정보를 확인할 수 없습니다.
          </Popup.Title>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
