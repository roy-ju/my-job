import { Popup, OverlayPresenter } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function PreviouslyHistoriesPopup({ handleConfirm }: CommonPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.SmallTitle tw="text-center">이전 조회 이력</Popup.SmallTitle>
          <Popup.Body>
            <div tw="flex flex-col items-center">
              최대 10개까지 조회됩니다.
              <br />
              <br />
              - 2024년 01월 30일 조회
              <br />
              - 2023년 12월 30일 조회
              <br />- 2023년 11월 10일 조회
            </div>
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
