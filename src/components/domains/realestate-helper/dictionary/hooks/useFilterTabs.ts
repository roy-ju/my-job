import { useCallback, useEffect, useRef, useState } from 'react';

import useViewportHeight from '@/hooks/useViewportHeight';

import { DictElementListItem } from '../type';

const headerHeight = 128;

const titleHeight = 56;

export default function useFilterTabs({ elementsList }: { elementsList: DictElementListItem[] }) {
  const [tab, setTab] = useState('ㄱ');

  const [tabIndex, setTabIndex] = useState(0);

  const { height } = useViewportHeight();

  const [visibleState, setVisibleState] = useState<{ [key: string]: boolean }>({});

  const observer = useRef<IntersectionObserver | null>(null);

  const handleChangeTab = useCallback(
    (e: NegocioMouseEvent<HTMLButtonElement>, idx: number) => {
      const { value } = e.currentTarget;

      setTab(value);
      setTabIndex(idx);

      const scrollContainer = document.getElementById('negocio-dictionary-scrollable-container');

      const targetElement = elementsList.find((item) => item.name === value)?.element;

      if (scrollContainer && targetElement) {
        targetElement.scrollIntoView();
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
          if (entry.target.id === 'negocio-dictionary-bottom' && entry.isIntersecting) {
            const lastIndex = elementsList.length - 1;

            setTab(elementsList[lastIndex]?.name);
            setTabIndex(lastIndex);
          }
        });
      },
      { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 },
    );

    const bottomElement = document.getElementById('negocio-dictionary-bottom');

    if (bottomElement) {
      bottomRefObserver.observe(bottomElement);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [elementsList, height]);

  useEffect(() => {
    const visibleElements = elementsList.filter((element) => visibleState[element.element.id]);

    if (visibleElements.length === 0) return;

    const highestPriorityElement = visibleElements.reduce(
      (prev, current) => (prev.priority < current.priority ? prev : current),
      visibleElements[0],
    );

    setTab(highestPriorityElement.name);

    setTabIndex(elementsList.indexOf(highestPriorityElement));
  }, [elementsList, visibleState]);

  return {
    tab,
    tabIndex,
    handleChangeTab,
  };
}
