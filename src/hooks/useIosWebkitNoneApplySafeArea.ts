import { useEffect } from 'react';

export default function useIosWebkitNoneApplySafeArea() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.webkit?.messageHandlers?.noneApplySafeArea?.postMessage?.('');
    }
  }, []);
}
