import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

import useViewportHeight from '@/hooks/useViewportHeight';

import useEventListener from '@/hooks/useEventListener';

import { SpecialTermsBottomElementId } from '../constants/element_id';

import { TermsElementListItem } from '../types';

const headerHeight = 56 + 8 + 48 + 64;

export default function useCategoryTabs({
  elementsList,
  containerRef,
}: {
  elementsList: TermsElementListItem[];
  containerRef: RefObject<HTMLDivElement>;
}) {
  const [tab, setTab] = useState('기본');

  const [tabIndex, setTabIndex] = useState(0);

  const { height } = useViewportHeight();

  const [visibleState, setVisibleState] = useState<{ [key: string]: boolean }>({});

  const [scrollTop, setScrollTop] = useState<number>(0);

  const observer = useRef<IntersectionObserver | null>(null);

  const handleChangeTabCallback = useCallback(() => {
    setTab('기본');
    setTabIndex(0);

    const targetElement = elementsList.find((item) => item.name === '기본')?.element;

    if (containerRef && targetElement) {
      targetElement.scrollIntoView();
    }
  }, [containerRef, elementsList]);

  const handleChangeTab = useCallback(
    (e: NegocioMouseEvent<HTMLButtonElement>, idx: number) => {
      const { value } = e.currentTarget;

      setTab(value);
      setTabIndex(idx);

      const targetElement = elementsList.find((item) => item.name === value)?.element;

      if (containerRef?.current && targetElement) {
        const targetElementRect = targetElement.getBoundingClientRect();

        const scrollPosition = targetElementRect.top + containerRef.current.scrollTop - 56 - 8 - 48 - 50;

        containerRef.current.scrollTo({
          top: scrollPosition,
        });
      }
    },
    [elementsList, containerRef],
  );

  useEffect(() => {
    const bottomMargin = height - headerHeight - 100;

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleState((prevVisibleState) => ({
            ...prevVisibleState,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },

      { rootMargin: `-${headerHeight}px 0px -${bottomMargin}px 0px`, threshold: 0.1 },
    );

    elementsList.forEach((element) => {
      observer.current!.observe(element.element);
    });

    const bottomRefObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === SpecialTermsBottomElementId && entry.isIntersecting) {
            const lastIndex = elementsList.length - 1;

            setTab(elementsList[lastIndex]?.name);
            setTabIndex(lastIndex);
          }
        });
      },
      { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0.1 },
    );

    const bottomElement = document.getElementById(SpecialTermsBottomElementId);

    if (bottomElement) {
      bottomRefObserver.observe(bottomElement);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }

      if (bottomElement) {
        bottomRefObserver.disconnect();
      }
    };
  }, [elementsList, height]);

  useEventListener(containerRef, 'scroll', () => {
    setScrollTop((containerRef?.current?.scrollTop ?? 0) + (containerRef?.current?.clientHeight ?? 0));
  });

  useEffect(() => {
    const visibleElements = elementsList.filter((element) => visibleState[element.element.id]);

    if (visibleElements.length === 0) return;

    const highestPriorityElement = visibleElements.reduce(
      (prev, current) => (prev.priority < current.priority ? prev : current),
      visibleElements[0],
    );

    if ((containerRef?.current?.scrollHeight ?? 0) - scrollTop > 10) {
      setTab(highestPriorityElement.name);
      setTabIndex(elementsList.indexOf(highestPriorityElement));
    }
  }, [containerRef, elementsList, scrollTop, visibleState]);

  return {
    tab,
    tabIndex,
    handleChangeTab,
    handleChangeTabCallback,
  };
}
