import { useCallback, useState } from 'react';

export default function useDropdownFilter() {
  const [dropdownValue, setDropdownValue] = useState('최신순');

  const handleChangeDropdown = useCallback((value: string) => {
    setDropdownValue(value);
  }, []);

  return { dropdownValue, handleChangeDropdown };
}
