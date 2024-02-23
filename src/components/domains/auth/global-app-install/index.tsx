import { OverlayPresenter, Popup } from '@/components/molecules';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import useInAppBrowserCheck from '@/states/hooks/useInAppBrowserCheck';

export default function GlobalAppInstall() {
  useInAppBrowserCheck();

  useInAppBrowserCheck();

  const { inAppInfo, handleClickInstall, handleCloseAppInstallPopup } = useInAppBroswerHandler();

  if (!inAppInfo.popupOpen) {
    return null;
  }

  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup>
          <Popup.Title>앱을 다운로드 하시겠어요?</Popup.Title>
          <Popup.Body>해당 서비스는 앱을 다운로드하여 이용해주세요.</Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleCloseAppInstallPopup}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={handleClickInstall}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
