import { OverlayPresenter, Popup } from '@/components/molecules';

type SuggestAfterVerifyProps = {
  handleCancel: () => void;
  handleConfirm: () => void;
};

export default function SuggestAfterVerify({ handleCancel, handleConfirm }: SuggestAfterVerifyProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.Title>내용이 저장되지 않았습니다.</Popup.Title>
          <Popup.Body>
            지금 홈으로 이동하시면 작성하신 집구해요 내용은 저장이 되지 않습니다. 홈으로 이동하시겠어요?
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleCancel}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={handleConfirm}>홈으로</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
