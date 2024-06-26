import { OverlayPresenter, Popup } from '@/components/molecules';

type AfterVerfiyProps = {
  handleCancel: () => void;
  handleConfirm: () => void;
};

export default function AfterVerfiy({ handleCancel, handleConfirm }: AfterVerfiyProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.Title>본인 인증이 필요해요!</Popup.Title>
          <Popup.Body>
            방금 이용하시려는 서비스는 본인 인증이 필요합니다.
            <br />
            본인 인증 없이 홈으로 이동하시겠어요?
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
