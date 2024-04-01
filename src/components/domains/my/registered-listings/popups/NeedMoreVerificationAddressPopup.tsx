import { OverlayPresenter, Popup } from '@/components/molecules';

type NeedMoreVerificationAddressPopupProps = {
  handleConfirm: () => void;
  handleCancel: () => void;
};

export default function NeedMoreVerificationAddressPopup({
  handleConfirm,
  handleCancel,
}: NeedMoreVerificationAddressPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="[text-align: center]">
          <Popup.SubTitle>
            추가로 매물등록이 가능한 우리집 정보가 없습니다.
            <br />
            우리집을 추가 인증하시겠습니까?
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
