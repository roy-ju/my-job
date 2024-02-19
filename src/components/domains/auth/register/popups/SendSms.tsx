import { OverlayPresenter, Popup } from '@/components/molecules';

type SendSmsProps = {
  remainCount: number;
  handleConfirm: () => void;
};

export default function SendSms({ remainCount, handleConfirm }: SendSmsProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-6 gap-2">
          <Popup.SmallTitle tw="text-center">인증번호가 발송되었습니다.</Popup.SmallTitle>
          <Popup.Body>발송 가능한 횟수가 {remainCount}회 남았습니다.</Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
