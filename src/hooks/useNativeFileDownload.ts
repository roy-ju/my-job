import { useCallback } from 'react';

import useIsNativeApp from './useIsNativeApp';

export default function useNativeFileDownload() {
  const isNativeApp = useIsNativeApp();

  const downloadFile = useCallback(
    (v: string) => {
      if (!isNativeApp) return;

      const message = { url: v };

      window?.webkit?.messageHandlers?.downloadFile?.postMessage?.(JSON.stringify(message));
    },
    [isNativeApp],
  );

  return { downloadFile };
}
