/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-return-assign */
import { useRef, useState, useCallback } from 'react';

import useDanjiInteraction from '@/states/hooks/useDanjiInteraction';

import useScroll from '@/hooks/useScroll';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { DanjiDetailResponse } from '@/services/danji/types';

export default function usePcDanjiHandler({ danji }: { danji: DanjiDetailResponse }) {
  const interactStore = useDanjiInteraction({ danjiData: danji });

  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const listingsSectionRef = useRef<HTMLDivElement | null>(null);
  const infoSectionRef = useRef<HTMLDivElement | null>(null);
  const realPriceSectionRef = useRef<HTMLDivElement | null>(null);
  const facilitiesSectionRef = useRef<HTMLDivElement | null>(null);
  const newsSectionRef = useRef<HTMLDivElement | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [loadingRealprice, setLoadingRealprice] = useState(true);
  const [showRealPriceTab, setShowRealPriceTab] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  const [visibleState, setVisibleState] = useState<Record<string, boolean>>({
    listingsSection: true,
    realPriceSection: false,
    infoSection: false,
    facilitiesSection: false,
    newsSection: false,
  });

  const [bottomReached, setBottomReached] = useState(false);

  useScroll(scrollContainer, ({ scrollY }) => {
    setIsHeaderActive(scrollY > 0);
  });

  const handleClickTab = useCallback((e: NegocioMouseEvent<HTMLButtonElement>) => {
    const index = Number(e.currentTarget.value);

    if (index === 0) {
      scrollContainer.current?.scrollBy({
        top: (listingsSectionRef?.current?.getBoundingClientRect()?.top ?? 0) - 103,
        behavior: 'smooth',
      });
    }

    if (index === 1) {
      scrollContainer.current?.scrollBy({
        top: (realPriceSectionRef?.current?.getBoundingClientRect()?.top ?? 0) - 103,
        behavior: 'smooth',
      });
    }

    if (index === 2) {
      scrollContainer.current?.scrollBy({
        top: (infoSectionRef?.current?.getBoundingClientRect()?.top ?? 0) - 103,
        behavior: 'smooth',
      });
    }

    if (index === 3) {
      scrollContainer.current?.scrollBy({
        top: (facilitiesSectionRef?.current?.getBoundingClientRect()?.top ?? 0) - 103,
        behavior: 'smooth',
      });
    }

    if (index === 4) {
      scrollContainer.current?.scrollBy({
        top: (newsSectionRef?.current?.getBoundingClientRect()?.top ?? 0) - 103,
        behavior: 'smooth',
      });
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleState((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { rootMargin: '-103px 0px -103px 0px', threshold: 0.1 },
    );

    if (listingsSectionRef?.current) {
      observer.observe(listingsSectionRef.current);
    }

    if (realPriceSectionRef?.current) {
      observer.observe(realPriceSectionRef.current);
    }

    if (infoSectionRef?.current) {
      observer.observe(infoSectionRef.current);
    }

    if (facilitiesSectionRef?.current) {
      observer.observe(facilitiesSectionRef.current);
    }

    if (newsSectionRef?.current) {
      observer.observe(newsSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [listingsSectionRef, realPriceSectionRef, infoSectionRef, facilitiesSectionRef, newsSectionRef]);

  useIsomorphicLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          const targetID = item.target.id;
          const idPrefix = 'negocio-danjidetail-';

          const { isIntersecting } = item;

          if (targetID === `${idPrefix}bottom`) {
            setBottomReached(isIntersecting);
          }
        });
      },
      { rootMargin: '0px 0px 0px 0px', threshold: 0.1 },
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loadingRealprice]);

  useIsomorphicLayoutEffect(() => {
    let i = 0;

    if (visibleState.listingsSection === true) {
      i = 0;
      setTabIndex(i);
    } else if (visibleState.realPriceSection === true) {
      i = 1;
      setTabIndex(i);
    } else if (visibleState.infoSection === true) {
      i = 2;
      setTabIndex(i);
    } else if (visibleState.facilitiesSection === true) {
      i = 3;
      setTabIndex(i);
    } else if (visibleState.newsSection === true) {
      i = 4;
      setTabIndex(i);
    }
  }, [visibleState]);

  useIsomorphicLayoutEffect(
    () => () => {
      interactStore.makeDataReset();
    },
    [],
  );

  useIsomorphicLayoutEffect(() => {
    let i = 0;

    if (bottomReached) {
      i = 4;
      setTabIndex(i);
      return;
    }

    if (visibleState.listingsSection === true) {
      i = 0;
      setTabIndex(i);
    } else if (visibleState.realPriceSection === true) {
      i = 1;
      setTabIndex(i);
    } else if (visibleState.infoSection === true) {
      i = 2;
      setTabIndex(i);
    } else if (visibleState.facilitiesSection === true) {
      i = 3;
      setTabIndex(i);
    } else if (visibleState.newsSection === true) {
      i = 4;
      setTabIndex(i);
    }
  }, [bottomReached, showRealPriceTab, visibleState]);

  return {
    scrollContainer,

    listingsSectionRef,
    infoSectionRef,
    realPriceSectionRef,
    facilitiesSectionRef,
    newsSectionRef,
    bottomRef,

    isHeaderActive,

    tabIndex,
    handleClickTab,

    showRealPriceTab,
    setShowRealPriceTab,

    loadingRealprice,
    setLoadingRealprice,

    bottomReached,
  };
}
