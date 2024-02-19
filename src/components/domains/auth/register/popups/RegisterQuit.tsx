import { OverlayPresenter, Popup } from '@/components/molecules';

type RegisterQuitProps = {
  handleConfirm: () => void;
  handleCancel: () => void;
};

export default function RegisterQuit({ handleConfirm, handleCancel }: RegisterQuitProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-6 gap-2">
          <Popup.Title>회원가입 종료</Popup.Title>
          <Popup.Body>
            아직 회원가입이 완료되지 않았어요.
            <br />
            지금 회원가입을 종료할까요?
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleCancel}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={handleConfirm}>종료하기</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
