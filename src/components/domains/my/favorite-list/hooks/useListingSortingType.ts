import { useCallback, useState } from 'react';

export default function useListingSortingType() {
  const [listingSortingType, setListingSortingType] = useState('등록일순');

  const convertListingSortingType = useCallback(() => {
    switch (listingSortingType) {
      case '등록일순':
        return 1;
      case '조회순':
        return 2;
      case '참여자순':
        return 3;
      default:
        return 1;
    }
  }, [listingSortingType]);

  const handleChangeListingSortingType = useCallback((newValue: string) => {
    setListingSortingType(newValue);
  }, []);

  return { listingSortingType, convertListingSortingType, handleChangeListingSortingType };
}
