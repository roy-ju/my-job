import { useState, useCallback } from 'react';

export default function useFilters() {
  const [buyOrRent, setBuyOrRent] = useState(0);

  const [sortBy, setSortBy] = useState('업데이트 순');

  const handleChangeBuyOrRent = useCallback((newValue: number) => {
    setBuyOrRent(newValue);
  }, []);

  const handleChangeSortBy = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  return { buyOrRent, sortBy, handleChangeBuyOrRent, handleChangeSortBy };
}
