import { OverlayPresenter, Popup } from '@/components/molecules';

type VerificationAddressPopupProps = {
  handleConfirm: () => void;
  handleCancel: () => void;
};

export default function VerificationAddressPopup({ handleConfirm, handleCancel }: VerificationAddressPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="[text-align: center]">
          <Popup.SubTitle>
            매물등록을 위해서는 집주인 인증이 필요합니다.
            <br />
            우리집을 인증하시겠습니까?
          </Popup.SubTitle>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleCancel}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={handleConfirm}>인증하기</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
