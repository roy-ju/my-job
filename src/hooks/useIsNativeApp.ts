import { useMemo } from 'react';

import Keys from '@/constants/storage_keys';

export default function useIsNativeApp() {
  return useMemo(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return Boolean(localStorage.getItem(Keys.DEVICE_ID)) || navigator.userAgent.includes('(NegocioUserApp)');
  }, []);
}
