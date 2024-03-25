import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { SpecialTermsContainerElementId } from '../constants/element_id';

export default function useBuyOrRentTabsHandler({ handleChangeTabCallback }: { handleChangeTabCallback: () => void }) {
  const { query } = useRouter();

  const [tab, setTab] = useState(1);

  const handleChangeTab = useCallback(
    (e: NegocioMouseEvent<HTMLButtonElement>) => {
      const value = Number(e.currentTarget.value);

      setTab(value);

      const scrollContainer = document.getElementById('special-terms-sticky-tabs');

      const scrollContainer2 = document.getElementById(SpecialTermsContainerElementId);

      if (scrollContainer) {
        scrollContainer.style.position = 'relative';

        setTimeout(() => {
          scrollContainer2?.scrollTo(0, 0);
        });

        setTimeout(() => {
          scrollContainer.style.position = 'sticky';
        }, 1000);
      }

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
