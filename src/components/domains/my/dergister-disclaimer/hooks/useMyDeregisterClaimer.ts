import { useState, useCallback } from 'react';

export default function useMyDeregisterClaimer() {
  const [status, setStatus] = useState<'none' | 'confirm' | 'success'>('none');

  const handleClickCancel = useCallback(() => {
    setStatus('none');
  }, []);

  return { status, setStatus, handleClickCancel };
}
