import { useCallback, useState } from 'react';

type Popups = 'notSuggestAfterVerify' | 'suggestAfterVerify' | '';

export default function usePoupHandler() {
  const [popups, setPopups] = useState<Popups>('');

  const openPopup = useCallback((value: Popups) => {
    setPopups(value);
  }, []);

  const closePopup = useCallback(() => {
    setPopups('');
  }, []);

  return { popups, openPopup, closePopup };
}
