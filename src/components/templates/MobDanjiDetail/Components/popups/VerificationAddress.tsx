import { OverlayPresenter, Popup } from '@/components/molecules';

type VerificationAddressProps = {
  handleVerficationAddress: () => void;
  handleClosePopup: () => void;
};

export default function VerificationAddress({ handleVerficationAddress, handleClosePopup }: VerificationAddressProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="[text-align: center]">
          <Popup.SubTitle>
            이 단지의 집주인만 매물등록이 가능합니다.
            <br />
            우리집을 인증하시겠습니까?
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
