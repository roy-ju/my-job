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
            취소하시면 회원가입이 종료됩니다.
            <br />
            회원가입을 종료하시겠어요?
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
