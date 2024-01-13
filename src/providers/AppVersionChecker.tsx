import { useCallback, useEffect, useState } from 'react';

import { Popup } from '@/components/molecules';

import usePageVisibility from '@/hooks/usePageVisibility';

import { checkPlatformInt } from '@/utils/checkPlatformInt';

import Keys from '@/constants/storage_keys';

import getUserAppVersion from '@/apis/user/userAppVersion';

const Events = {
  SessionStorageChange: 'negocio_native_event_session_storage_change',
};

const GOOGLE_PLAY_STORE =
  'https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=kr.co.negocio.production&ddl=1&pcampaignid=web_ddl_1';

const APP_STORE = 'https://itunes.apple.com/app/id/6444820605';

export default function AppVersionChecker() {
  const [appVersion, setAppVersion] = useState('');
  const [isStale, setIsStale] = useState(false);
  const isVisible = usePageVisibility();

  const openStore = useCallback(() => {
    const platformInt = checkPlatformInt();
    if (platformInt === 1) {
      // Android
      window.location.href = GOOGLE_PLAY_STORE;
    } else if (platformInt === 2) {
      // iOS
      window.location.href = APP_STORE;
    }
  }, []);

  useEffect(() => {
    const onChangeSessionStorage = () => {
      // toast.success(`${localStorage.getItem(Keys.APP_VERSION)}`);
      setAppVersion(localStorage.getItem(Keys.APP_VERSION) ?? '');
    };

    onChangeSessionStorage();
    window.addEventListener(Events.SessionStorageChange, onChangeSessionStorage);
    return () => {
      window.removeEventListener(Events.SessionStorageChange, onChangeSessionStorage);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const platformInt = checkPlatformInt();

    if (platformInt && appVersion) {
      getUserAppVersion(appVersion, platformInt).then((data) => {
        if (data?.stale === true) {
          setIsStale(true);
        } else {
          setIsStale(false);
        }
      });
    }
  }, [appVersion, isVisible]);

  if (!isStale) return null;

  return (
    <div tw="flex items-center justify-center fixed left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.5)] z-[10000]">
      <Popup>
        <Popup.ContentGroup>
          <Popup.Title>최신 버전 업데이트</Popup.Title>
          <Popup.Body>최신버전 앱으로 업데이트하고 새로운 네고시오를 만나보세요.</Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={openStore}>지금 업데이트</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </div>
  );
}
