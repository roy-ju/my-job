import { OverlayPresenter, Popup } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

interface Props extends CommonPopupProps {
  remainingCount: number;
}

export default function RealestateDocumentRemainingCountPopup({ remainingCount, handleConfirm }: Props) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.Title>등기부 조회 가능 횟수 : {remainingCount}회</Popup.Title>
          <Popup.Body>
            {remainingCount === 0 && `등기부 조회는 주 3회만 무료로 제공합니다.\n월요일에 다시 시도해주세요!`}
            {remainingCount > 0 && `등기부 조회는 주 3회만 무료로 제공합니다. `}
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
