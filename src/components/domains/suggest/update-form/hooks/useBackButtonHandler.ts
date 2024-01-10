import { useCallback } from 'react';

export default function useBackButtonHandler() {
  const handleClickBack = useCallback(() => {}, []);

  return { handleClickBack };
}
