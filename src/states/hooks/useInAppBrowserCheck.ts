import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import useIsNativeApp from '@/hooks/useIsNativeApp';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import inAppInfoAtom from '../atom/inAppInfo';

export default function useInAppBrowserCheck() {
  const isNativeApp = useIsNativeApp();

  const { platform } = useCheckPlatform();

  const setInAppInfo = useSetRecoilState(inAppInfoAtom);

  useEffect(() => {
    if (isNativeApp) return;

    if (platform === 'pc') return;

    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.match(/Line|instagram|FB_IAB|FB4A|FBAN|FBIOS|FBSS\/[^1]/i)) {
      if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
        // Ios devices
        setInAppInfo((prev) => ({ ...prev, isInAppBrowser: true }));
      } else {
        // Android devices
        setInAppInfo((prev) => ({ ...prev, isInAppBrowser: true }));
      }
    }
  }, [isNativeApp, platform, setInAppInfo]);
}
