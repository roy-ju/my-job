import { useCallback, useState } from 'react';

export default function usePopupHandler() {
  const [popup, setPopup] = useState<'delete' | 'update' | 'impossible' | 'previous' | ''>('');

  const handleClosePopup = useCallback(() => {
    setPopup('');
  }, [setPopup]);

  const handleOpenPopup = useCallback((v: 'delete' | 'update' | 'impossible' | 'previous' | '') => {
    setPopup(v);
  }, []);

  return { popup, handleClosePopup, handleOpenPopup };
}
