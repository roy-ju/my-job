import { useCallback, useRef, useState, memo } from 'react';

import { useScroll } from '@/hooks/utils';

import DanjiPhotos from './danjiPhotos';

import DanjiTabs from './danjiTabs';

import { TabIndex } from '../types';

import DanjiSummary from './danjiSummary';

import DanjiActiveListingsOrSuggests from './danjiActiveListingsOrSuggests';

import DanjiBasicInfo from './danjiBasicInfo';

type ContentsContainerProps = {
  handleHeaderActive: (value: boolean) => void;
};

function Contents({ handleHeaderActive }: ContentsContainerProps) {
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const [tabIndex, setTabIndex] = useState<TabIndex>(0);

  useScroll(scrollContainer, ({ scrollY }) => {
    const result = scrollY > 0;
    handleHeaderActive(result);
  });

  const handleTabIndex = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;

    const tab = Number(value);

    setTabIndex(tab as TabIndex);
  }, []);

  return (
    <div tw="flex-1 min-h-0 overflow-y-auto" ref={scrollContainer}>
      <DanjiPhotos />
      <DanjiTabs tabIndex={tabIndex} handleTabIndex={handleTabIndex} />
      <div tw="pt-7" id="listingsSection">
        <DanjiSummary />
        <DanjiActiveListingsOrSuggests tabIndex={tabIndex} />
        <DanjiBasicInfo />
      </div>
    </div>
  );
}

export default memo(Contents);
