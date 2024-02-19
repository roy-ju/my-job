import { OverlayPresenter, Popup } from '@/components/molecules';

type MaxSmsAttemptsReachedProps = {
  handleConfirm: () => void;
};

export default function MaxSmsAttemptsReached({ handleConfirm }: MaxSmsAttemptsReachedProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-6 gap-2">
          <Popup.SmallTitle tw="text-center">인증 횟수 초과</Popup.SmallTitle>
          <Popup.Body>
            인증번호는 최대 5회까지만 요청 가능하며, 인증 요청 횟수 초과 시 인증번호는 더 이상 발송되지 않습니다.
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
