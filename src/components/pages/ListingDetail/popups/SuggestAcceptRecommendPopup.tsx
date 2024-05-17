import { OverlayPresenter, Popup } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

interface SuggestAcceptRecommendPoupProps extends CommonPopupProps {
  isLoading: boolean;
}

export default function SuggestAcceptRecommendPopup({
  isLoading,
  handleCancel,
  handleConfirm,
}: SuggestAcceptRecommendPoupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-10">
          <Popup.Title>
            중개사님과의 채팅방이 개설됩니다.
            <br />
            채팅방을 나가시면 네고 협의가 중단되니 유의해 주세요.
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
