import { useCallback, useRef, useState } from 'react';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import useScroll from '@/hooks/useScroll';

export default function useMobileDanjiHandler() {
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const listingsSectionRef = useRef<HTMLDivElement | null>(null);
  const infoSectionRef = useRef<HTMLDivElement | null>(null);
  const realPriceSectionRef = useRef<HTMLDivElement | null>(null);
  const facilitiesSectionRef = useRef<HTMLDivElement | null>(null);
  const newsSectionRef = useRef<HTMLDivElement | null>(null);

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
      { rootMargin: '-104px 0px -104px 0px', threshold: 0.1 },
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

  return {
    scrollContainer,
    listingsSectionRef,
    infoSectionRef,
    realPriceSectionRef,
    facilitiesSectionRef,
    newsSectionRef,

    isHeaderActive,

    tabIndex,
    handleClickTab,

    showRealPriceTab,
    setShowRealPriceTab,

    loadingRealprice,
    setLoadingRealprice,
  };
}
