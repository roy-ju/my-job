import { useCallback, useEffect, useState } from 'react';

import Paths from '@/constants/paths';

import isIOS from '@/utils/isIos';

import useCheckPlatform from './useCheckPlatform';

import useIsNativeApp from './useIsNativeApp';

export default function useCheckInAppBrowser() {
  const isNativeApp = useIsNativeApp();

  const { platform } = useCheckPlatform();

  const [isInAppBrowser, setIsInAppBrowser] = useState<boolean>(false);

  const [openAppInstallPopup, setOpenAppInstallPopup] = useState(false);

  useEffect(() => {
    if (isNativeApp) return;

    if (platform === 'pc') return;

    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.match(/Line|instagram|FB_IAB|FB4A|FBAN|FBIOS|FBSS\/[^1]/i)) {
      if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
        // Ios devices
        setIsInAppBrowser(true);
      } else {
        // Android devices
        setIsInAppBrowser(true);
      }
    }
  }, [isNativeApp, platform]);

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

  const handleOpenAppInstallPopup = () => {
    setOpenAppInstallPopup(true);
  };

  const handleCloseAppInstallPopup = () => {
    setOpenAppInstallPopup(false);
  };

  return {
    isInAppBrowser,
    openAppInstallPopup,
    handleClickInstall,
    handleOpenAppInstallPopup,
    handleCloseAppInstallPopup,
  };
}
