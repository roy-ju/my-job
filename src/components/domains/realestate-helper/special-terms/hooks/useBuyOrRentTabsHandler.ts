import { RefObject, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

export default function useBuyOrRentTabsHandler({ containerRef }: { containerRef: RefObject<HTMLDivElement> }) {
  const { query } = useRouter();

  const [tab, setTab] = useState(1);

  const handleChangeTab = useCallback(
    (e: NegocioMouseEvent<HTMLButtonElement>) => {
      const value = Number(e.currentTarget.value);

      setTab(value);

      if (containerRef?.current) {
        containerRef.current.style.overflowY = 'hidden';

        setTimeout(() => {
          if (containerRef?.current) {
            containerRef.current.style.overflowY = 'auto';
          }
        }, 100);

        setTimeout(() => {
          if (containerRef) {
            containerRef?.current?.scrollTo(0, 0);
          }
        }, 200);
      }
    },
    [containerRef],
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
