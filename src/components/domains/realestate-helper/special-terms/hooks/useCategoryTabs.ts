import { useCallback, useEffect, useRef, useState } from 'react';

import useViewportHeight from '@/hooks/useViewportHeight';

import { SpecialTermsContainerElementId, SpecialTermsBottomElementId } from '../constants/element_id';

import { TermsElementListItem } from '../types';

const headerHeight = 56 + 8 + 48 + 64;

export default function useCategoryTabs({ elementsList }: { elementsList: TermsElementListItem[] }) {
  const [tab, setTab] = useState('기본');

  const [tabIndex, setTabIndex] = useState(0);

  const { height } = useViewportHeight();

  const [visibleState, setVisibleState] = useState<{ [key: string]: boolean }>({});

  const [scrollTop, setScrollTop] = useState<number>(0);

  const observer = useRef<IntersectionObserver | null>(null);

  const handleChangeTabCallback = useCallback(() => {
    setTab('기본');
    setTabIndex(0);

    const scrollContainer = document.getElementById(SpecialTermsContainerElementId);

    const targetElement = elementsList.find((item) => item.name === '기본')?.element;

    if (scrollContainer && targetElement) {
      targetElement.scrollIntoView();
    }
  }, [elementsList]);

  const handleChangeTab = useCallback(
    (e: NegocioMouseEvent<HTMLButtonElement>, idx: number) => {
      const { value } = e.currentTarget;

      setTab(value);
      setTabIndex(idx);

      const scrollContainer = document.getElementById(SpecialTermsContainerElementId);

      const targetElement = elementsList.find((item) => item.name === value)?.element;

      if (scrollContainer && targetElement) {
        const targetElementRect = targetElement.getBoundingClientRect();

        const scrollPosition = targetElementRect.top + scrollContainer.scrollTop - 56 - 8 - 48 - 50;

        scrollContainer.scrollTo({
          top: scrollPosition,
        });
      }
    },
    [elementsList],
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scrollContainer = document?.getElementById(SpecialTermsContainerElementId);

      const handleScroll = () => {
        setScrollTop((scrollContainer?.scrollTop ?? 0) + (scrollContainer?.clientHeight ?? 0));
      };

      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);

        return () => {
          scrollContainer.removeEventListener('scroll', handleScroll);
        };
      }
    }
  }, [elementsList, scrollTop]);

  useEffect(() => {
    const visibleElements = elementsList.filter((element) => visibleState[element.element.id]);

    if (visibleElements.length === 0) return;

    const highestPriorityElement = visibleElements.reduce(
      (prev, current) => (prev.priority < current.priority ? prev : current),
      visibleElements[0],
    );

    const scrollContainer = document?.getElementById(SpecialTermsContainerElementId);

    if ((scrollContainer?.scrollHeight ?? 0) - scrollTop > 10) {
      setTab(highestPriorityElement.name);
      setTabIndex(elementsList.indexOf(highestPriorityElement));
    }
  }, [elementsList, scrollTop, visibleState]);

  return {
    tab,
    tabIndex,
    handleChangeTab,
    handleChangeTabCallback,
  };
}
