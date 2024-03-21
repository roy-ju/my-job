import { useCallback, useEffect, useRef, useState } from 'react';

import useViewportHeight from '@/hooks/useViewportHeight';

import { DictElementListItem } from '../type';

import { DictionaryBottomElementId, DictionaryContainerElementId } from '../constants/element_id';

const headerHeight = 128;

const titleHeight = 56;

export default function useCategoryTabs({ elementsList }: { elementsList: DictElementListItem[] }) {
  const [tab, setTab] = useState('ㄱ');

  const [tabIndex, setTabIndex] = useState(0);

  const { height } = useViewportHeight();

  const [visibleState, setVisibleState] = useState<{ [key: string]: boolean }>({});

  const [scrollTop, setScrollTop] = useState<number>(0);

  const observer = useRef<IntersectionObserver | null>(null);

  const handleChangeTab = useCallback(
    (e: NegocioMouseEvent<HTMLButtonElement>, idx: number) => {
      const { value } = e.currentTarget;

      setTab(value);
      setTabIndex(idx);

      const scrollContainer = document.getElementById(DictionaryContainerElementId);

      const targetElement = elementsList.find((item) => item.name === value)?.element;

      if (scrollContainer && targetElement) {
        if (value === 'ㅎ') {
          scrollContainer?.scrollTo(0, scrollContainer.scrollHeight + 100);
        } else {
          targetElement.scrollIntoView();
        }
      }
    },
    [elementsList],
  );

  useEffect(() => {
    const bottomMargin = height - headerHeight - titleHeight;

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleState((prevVisibleState) => ({
            ...prevVisibleState,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },

      { rootMargin: `-${headerHeight}px 0px -${bottomMargin}px 0px`, threshold: 0 },
    );

    elementsList.forEach((element) => {
      observer.current!.observe(element.element);
    });

    const bottomRefObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === DictionaryBottomElementId && entry.isIntersecting) {
            const lastIndex = elementsList.length - 1;

            setTab(elementsList[lastIndex]?.name);
            setTabIndex(lastIndex);
          }
        });
      },
      { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0.1 },
    );

    const bottomElement = document.getElementById(DictionaryBottomElementId);

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
      const scrollContainer = document?.getElementById(DictionaryContainerElementId);

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

    const scrollContainer = document?.getElementById(DictionaryContainerElementId);

    if ((scrollContainer?.scrollHeight ?? 0) - scrollTop > 10) {
      setTab(highestPriorityElement.name);
      setTabIndex(elementsList.indexOf(highestPriorityElement));
    }
  }, [elementsList, scrollTop, visibleState]);

  return {
    tab,
    tabIndex,
    handleChangeTab,
  };
}
