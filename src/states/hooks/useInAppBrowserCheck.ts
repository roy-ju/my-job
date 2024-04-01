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
    if (typeof window === 'undefined') return;

    if (platform === 'pc') return;

    if (isNativeApp) return;

    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
      if (userAgent.match(/Line|kakaotalk|instagram|FB_IAB|FB4A|FBAN|FBIOS|FBSS\/[^1]/i)) {
        setInAppInfo((prev) => ({ ...prev, isInAppBrowser: true }));
      }
    } else if (userAgent.match(/Line||instagram|FB_IAB|FB4A|FBAN|FBIOS|FBSS\/[^1]/i)) {
      setInAppInfo((prev) => ({ ...prev, isInAppBrowser: true }));
    }
  }, [isNativeApp, platform, setInAppInfo]);
}
