import { useCallback } from 'react';

export default function useRemoveSessionKey() {
  const removeSessionKey = useCallback((key: string) => {
    if (typeof window !== 'undefined' && window.sessionStorage.getItem(key)) {
      window.sessionStorage.removeItem(key);
    }
  }, []);
  return {
    removeSessionKey,
  };
}
