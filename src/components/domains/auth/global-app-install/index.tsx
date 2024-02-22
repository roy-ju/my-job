import { OverlayPresenter, Popup } from '@/components/molecules';

export default function GlobalAppInstall({
  handleClickCancel,
  handleClickConfirm,
}: {
  handleClickCancel: () => void;
  handleClickConfirm: () => void;
}) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup>
          <Popup.Title>앱을 다운로드 하시겠어요?</Popup.Title>
          <Popup.Body>해당 서비스는 앱을 다운로드하여 이용해주세요.</Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleClickCancel}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={handleClickConfirm}>설치하러 가기</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
