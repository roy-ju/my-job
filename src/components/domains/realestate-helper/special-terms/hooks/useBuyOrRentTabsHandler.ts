/* eslint-disable @typescript-eslint/no-unused-vars */
import { RefObject, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { SpecialTermsContainerElementId } from '../constants/element_id';

export default function useBuyOrRentTabsHandler({ containerRef }: { containerRef: RefObject<HTMLDivElement> }) {
  const { query } = useRouter();

  const [tab, setTab] = useState(1);

  const handleChangeTab = useCallback(
    (e: NegocioMouseEvent<HTMLButtonElement>) => {
      const value = Number(e.currentTarget.value);

      setTab(value);

      const scrollContainer2 = document.getElementById(SpecialTermsContainerElementId);

      if (containerRef) {
        setTimeout(() => {
          containerRef?.current?.scrollTo(0, 0);
        }, 100);
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
