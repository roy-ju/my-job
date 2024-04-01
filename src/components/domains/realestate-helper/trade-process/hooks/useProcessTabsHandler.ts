import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

export default function useProcessTabsHandler() {
  const { query } = useRouter();

  const [tab, setTab] = useState(1);

  const handleChangeTab = useCallback((e: NegocioMouseEvent<HTMLButtonElement>) => {
    const value = Number(e.currentTarget.value);

    setTab(value);
  }, []);

  useEffect(() => {
    if (!query?.processType) return;

    if (query?.processType === '1') {
      setTab(1);
    } else if (query?.processType === '2') {
      setTab(2);
    }
  }, [query]);

  return {
    tab,
    handleChangeTab,
  };
}
