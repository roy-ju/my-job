import Keys from '@/constants/storage_keys';
import { useMemo } from 'react';

export default function useIsNativeApp() {
  return useMemo(() => {
    if (typeof window === 'undefined') return false;
    return Boolean(localStorage.getItem(Keys.DEVICE_ID)) || navigator.userAgent.includes('(NegocioUserApp)');
  }, []);
}
