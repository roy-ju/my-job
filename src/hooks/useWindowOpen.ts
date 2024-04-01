import { useCallback } from 'react';

export default function useWindowOpen() {
  const openWindowWithLink = useCallback((v: string, option = '_blank') => window?.open(v, option), []);

  return { openWindowWithLink };
}
