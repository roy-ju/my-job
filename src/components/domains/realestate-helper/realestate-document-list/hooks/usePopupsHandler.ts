import { useState, useCallback } from 'react';

export default function usePopupsHandler() {
  const [popup, setPopup] = useState<'creating' | 'remaining' | ''>('');

  const handleClosePopup = useCallback(() => {
    setPopup('');
  }, []);

  const handleOpenPopup = useCallback((v: 'creating' | 'remaining' | '') => {
    setPopup(v);
  }, []);

  return { popup, handleClosePopup, handleOpenPopup };
}
