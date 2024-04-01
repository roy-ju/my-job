import { useCallback, useState } from 'react';

export default function useCategoryTabs() {
  const [tab, setTab] = useState('CHEC_001');

  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = useCallback((e: NegocioMouseEvent<HTMLButtonElement>, idx: number) => {
    const { value } = e.currentTarget;

    setTab(value);
    setTabIndex(idx);
  }, []);

  return {
    tab,
    tabIndex,
    handleChangeTab,
  };
}
