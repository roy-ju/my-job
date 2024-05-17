import { OverlayPresenter, Popup } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

interface SuggestNotInterestedPopupProps extends CommonPopupProps {
  isLoading: boolean;
}

export default function SuggestNotInterestedPopup({
  isLoading,
  handleCancel,
  handleConfirm,
}: SuggestNotInterestedPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-10">
          <Popup.Title>
            관심없음으로 표시한 매물은
            <br />
            추천받은 목록에서 삭제됩니다.
          </Popup.Title>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleCancel}>취소</Popup.CancelButton>
          <Popup.ActionButton isLoading={isLoading} onClick={handleConfirm}>
            확인
          </Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
