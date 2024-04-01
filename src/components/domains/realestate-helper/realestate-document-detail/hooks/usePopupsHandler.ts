import { useCallback, useState } from 'react';

export default function usePopupsHandler() {
  const [popup, setPopup] = useState<'delete' | 'update' | 'impossible' | 'previous' | 'notUserFunctionInIos' | ''>('');

  const handleClosePopup = useCallback(() => {
    setPopup('');
  }, [setPopup]);

  const handleOpenPopup = useCallback(
    (v: 'delete' | 'update' | 'impossible' | 'previous' | 'notUserFunctionInIos' | '') => {
      setPopup(v);
    },
    [],
  );

  return { popup, handleClosePopup, handleOpenPopup };
}
