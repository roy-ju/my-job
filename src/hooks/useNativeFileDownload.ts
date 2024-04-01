import { useCallback } from 'react';

import useIsNativeApp from './useIsNativeApp';

export default function useNativeFileDownload() {
  const isNativeApp = useIsNativeApp();

  const downloadFile = useCallback(
    (v: string) => {
      if (!isNativeApp) return;

      const message = { url: v };

      const userAgent = window?.navigator?.userAgent || window?.navigator?.vendor;

      if (/android/i.test(userAgent)) {
        if (window?.Android) {
          window?.Android?.downloadFile?.(JSON.stringify(message));
        }
        return;
      }

      if (/iPad|iPhone|iPod/.test(userAgent)) {
        if (window?.webkit && window?.webkit?.messageHandlers) {
          window?.webkit?.messageHandlers?.downloadFile?.postMessage?.(JSON.stringify(message));
        }
      }
    },
    [isNativeApp],
  );

  return { downloadFile };
}
