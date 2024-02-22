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
          <Popup.SmallTitle>앱 다운로드하러가기</Popup.SmallTitle>
          <Popup.Body>앱에서 더많은 서비스를 이용하실 수 있습니다.</Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleClickCancel}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={handleClickConfirm}>설치하러 가기</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
