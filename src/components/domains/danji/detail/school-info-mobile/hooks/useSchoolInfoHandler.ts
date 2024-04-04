import { useState, useCallback } from 'react';

export default function useSchoolInfoHandler({ preselectedSchoolType }: { preselectedSchoolType: number }) {
  const [selectedSchoolType, setSelectedSchoolType] = useState(preselectedSchoolType);

  const [isClickMore, setIsClickMore] = useState(false);

  const handleChangeSelectedSchoolType = useCallback((val: number) => {
    setSelectedSchoolType(val);
    setIsClickMore(false);
  }, []);

  const handleUpdateMoreButtonState = useCallback(() => {
    if (!isClickMore) {
      setIsClickMore(true);
    } else {
      setIsClickMore(false);
    }
  }, [isClickMore]);

  return {
    selectedSchoolType,
    isClickMore,

    handleChangeSelectedSchoolType,
    handleUpdateMoreButtonState,
  };
}
