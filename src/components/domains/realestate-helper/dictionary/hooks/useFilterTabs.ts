import { useCallback, useState } from 'react';

import { DictElementListItem } from '../type';

export default function useFilterTabs({ elementsList }: { elementsList: DictElementListItem[] }) {
  const [tab, setTab] = useState('ㄱ');

  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = useCallback(
    (e: NegocioMouseEvent<HTMLButtonElement>, idx: number) => {
      const value = e.currentTarget.value;

      setTab(value);
      setTabIndex(idx);

      const targetElement = elementsList.find((item) => item.name === value)?.element;

      const scrollContainer = document.getElementById('negocio-dictionary-scrollable-container');

      if (scrollContainer && targetElement) {
        scrollContainer.scrollBy({
          top: (targetElement.getBoundingClientRect()?.top ?? 0) - 72 - 56,
          behavior: 'smooth',
        });
      }
    },
    [elementsList],
  );

  return {
    tab,
    tabIndex,
    handleChangeTab,
  };
}
