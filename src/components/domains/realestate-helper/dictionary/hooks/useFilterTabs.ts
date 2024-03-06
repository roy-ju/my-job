import { useCallback, useState } from 'react';

export default function useFilterTabs() {
  const [tab, setTab] = useState('ㄱ');

  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = useCallback((e: NegocioMouseEvent<HTMLButtonElement>, idx: number) => {
    const value = e.currentTarget.value;

    setTab(value);
    setTabIndex(idx);
  }, []);

  return {
    tab,
    tabIndex,
    handleChangeTab,
  };
}
