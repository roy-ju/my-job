import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

export default function useBuyOrRentTabsHandler({ handleChangeTabCallback }: { handleChangeTabCallback: () => void }) {
  const { query } = useRouter();

  const [tab, setTab] = useState(1);

  const handleChangeTab = useCallback(
    (e: NegocioMouseEvent<HTMLButtonElement>) => {
      const value = Number(e.currentTarget.value);

      setTab(value);

      handleChangeTabCallback();
    },
    [handleChangeTabCallback],
  );

  useEffect(() => {
    if (!query?.specialTermsType) return;

    if (query?.specialTermsType === '1') {
      setTab(1);
    } else if (query?.specialTermsType === '2') {
      setTab(2);
    }
  }, [query]);

  return {
    tab,
    handleChangeTab,
  };
}
