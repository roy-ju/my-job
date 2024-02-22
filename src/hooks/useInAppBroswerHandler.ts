import { useCallback } from 'react';

import { useRecoilState } from 'recoil';

import inAppInfoAtom from '@/states/atom/inAppInfo';

import Paths from '@/constants/paths';

import isIOS from '@/utils/isIos';

export default function useInAppBroswerHandler() {
  const [inAppInfo, setInAppInfo] = useRecoilState(inAppInfoAtom);

  const handleOpenAppInstallPopup = useCallback(() => {
    setInAppInfo((prev) => ({ ...prev, popupOpen: true }));
  }, [setInAppInfo]);

  const handleCloseAppInstallPopup = useCallback(() => {
    setInAppInfo((prev) => ({ ...prev, popupOpen: false }));
  }, [setInAppInfo]);

  const handleClickAppStore = useCallback(() => {
    window.open(Paths.APP_STORE, '_blank');
  }, []);

  const handleClickGooglePlay = useCallback(() => {
    window.open(Paths.GOOGLE_PLAY_STORE, '_blank');
  }, []);

  const handleClickInstall = useCallback(() => {
    if (isIOS()) {
      handleClickAppStore();
    } else {
      handleClickGooglePlay();
    }
  }, [handleClickAppStore, handleClickGooglePlay]);

  return { inAppInfo, handleOpenAppInstallPopup, handleCloseAppInstallPopup, handleClickInstall };
}
