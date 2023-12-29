import { OverlayPresenter, Popup } from '@/components/molecules';

type NeedMoreAddVerificationAddressProps = {
  handleVerficationAddress: () => void;
  handleClosePopup: () => void;
};

export default function NeedMoreAddVerificationAddress({
  handleVerficationAddress,
  handleClosePopup,
}: NeedMoreAddVerificationAddressProps) {
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
          <Popup.CancelButton onClick={handleClosePopup}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={handleVerficationAddress}>인증하기</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
