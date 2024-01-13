import { useCallback, useState } from 'react';

export default function useTab() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTabIndex = useCallback((value: number) => {
    setTabIndex(value);
  }, []);

  return { tabIndex, handleChangeTabIndex };
}
